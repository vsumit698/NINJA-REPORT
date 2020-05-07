const interviewModel = require('../models/interviewModel');
const studentModel = require('../models/studentModel');
const resultModel = require('../models/resultModel');

module.exports.addInterview = async function (req,res){
    if(req.isAuthenticated()){
        try {
            var companies = await interviewModel.find({company : req.body.company});
        
            for(let company of companies){
                if(company.date == req.body.date){
                    req.flash('error','Already registered with same date')
                    res.redirect('/user/interview-list');
                    return;
                }
            }
            // create Interview
            await interviewModel.create(req.body);
            req.flash('success','Interview Added')            
        } catch (error) {
            req.flash('error','Error in creating Interview');
            console.log("Error Found",error);
        }
        res.redirect('/user/interview-list');
        return;
    }
    res.redirect('/user/sign-in');
};

module.exports.addStudentToInterview = async function(req,res){
    if(req.isAuthenticated()){
        try {
            var studentExist = await studentModel.findOne({email : req.body.email});
                        
            var interviewArr = req.body.companyByDate.split(',');
            // check company with date exist 
            var companies = await interviewModel.find({company : interviewArr[0]});
            if(!studentExist || companies.length==0){
                req.flash('error','student/company not registered');
                res.redirect('/user/interview-list');
                return;
            }
            var dateExist = false;
            var Interview;
            for (let interview of companies) {
                if(interview.date == interviewArr[1]){
                    dateExist = true;
                    Interview = interview;
                    break;
                }
            }
            if(!dateExist) req.flash('error','Interview not registered at this date');
            else{
                // date is available to allocate
                for (let result of Interview.studentResult) {
                    let interviewResult = await resultModel.findById(result);
                    if(studentExist.id == interviewResult.student){
                        // already registered for interview
                        req.flash('error','student registered for Interview');
                        res.redirect('/user/interview-list');
                        return;
                    }
                }
                // ready to allocate
                var result = await resultModel.create({student : studentExist._id,interview : Interview._id,resultStatus : 'on hold'});
                // adding result to student
                studentExist.interviewResult.push(result);
                studentExist.save();
                // adding result to Interview
                Interview.studentResult.push(result);
                Interview.save();
                req.flash('success','student added to Interview');
            }

        } catch (error) {
            req.flash('error','Error in adding student to Interview');
            console.log("Error Found",error);
        }
        res.redirect('/user/interview-list');
        return;
    }
    res.redirect('/user/sign-in');
}

module.exports.viewInterviewsList = async function (req,res){
    if(req.isAuthenticated()){
        var interviews = await interviewModel.find({});
    
        res.render('interviewList',{title : 'Ninjas Report',interviews : interviews });
        return;
    }
    res.redirect('/user/sign-in');
};

module.exports.viewInterviewStudents = async function (req,res){
    if(req.isAuthenticated()){
        try {
            var interview = await interviewModel.findById(req.params.interviewId).populate({path:'studentResult',populate:{path:'student',select:'-interviewResult',populate:{path:'course'}}});
            // console.log(interview.studentResult[0].student);
            var interviewResult = interview.studentResult
            if(!interview){
                res.redirect('/user/interview-list');
                return;
            }
        } catch (error) {
            req.flash('error','Error in view Interview Students ');
            console.log("Error Found",error);
        }
        res.render('interviewStudentsList',{title : 'Ninjas Report',interview : interview,interviewResult : interviewResult});
        return;
    }
    res.redirect('/user/sign-in');
};

module.exports.setStatus = async function(req,res){
    if(req.isAuthenticated()){
        try {
            var result = await resultModel.findById(req.params.resultId);
            result.resultStatus = req.body.status;
            result.save();
            req.flash('success','status changed successfully');
        } catch (error) {
            req.flash('error','Error in changing Interview status ');
            console.log("Error Found",error);
        }
        res.redirect('back');
        return;
    }
    res.redirect('/user/sign-in');
}