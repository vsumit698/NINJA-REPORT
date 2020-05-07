const studentModel = require('../models/studentModel');

const path = require('path');

module.exports.home = async function(req,res){
    res.render('home',{title:"Ninjas Report"});
}
module.exports.downloadCSV = async function(req,res){
    if(req.isAuthenticated()){


        const createCsvWriter = require('csv-writer').createArrayCsvWriter;
        const dir = path.join(__dirname,'..','downloads');

        const filePath = path.join(dir,'file.csv') ;
        
        const csvWriter = createCsvWriter({
            header: ['ID','NAME','EMAIL','COLLEGE','STATUS','DSA SCORE','WEB-D SCORE','REACT SCORE','INTERVIEW DATE','INTERVIEW COMPANY','INTERVIEW RESULT'],
            path: filePath
        });
        
        const records = await createRecord();

        await csvWriter.writeRecords(records)       // returns a promise
        .then(() => {
            console.log('...Done');
        });
       // After creating file , preparing file to download
       res.download(filePath);
       return;
    }
    res.redirect('/user/sign-in');
}

var createRecord = async () => {
    var outputArray = [];
    var id = 1;
    const studentList = await studentModel.find({}).populate('course').populate({path:'interviewResult',populate:{path:'interview',select : 'company date'}});
    for (let index = 0; index < studentList.length; index++) {
        let outerArr = [];
        let student = studentList[index];
        outerArr[0] = 0;
        outerArr[1] = student.name;
        outerArr[2] = student.email;
        outerArr[3] = student.college;
        outerArr[4] = student.status;
        outerArr[5] = student.course.DSA_score;
        outerArr[6] = student.course.WebD_score;
        outerArr[7] = student.course.React_score;
        if(student.interviewResult.length==0){
            let interArr = [];
            for(let value of outerArr){
                interArr.push(value);
            }
            for(let i=0;3>i;i++){
                interArr.push('none');
            }
            interArr[0] = id++;
            outputArray.push(interArr);
        }else{
            for(let result of student.interviewResult){
                let interArr = [];
                for(let value of outerArr){
                    interArr.push(value);
                }
                interArr.push(result.interview.date);
                interArr.push(result.interview.company);
                interArr.push(result.resultStatus);
                interArr[0] = id++;
                outputArray.push(interArr);
            }
        }
    }
    return outputArray;
}