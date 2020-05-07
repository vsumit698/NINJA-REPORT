const studentModel = require('../models/studentModel');
const courseScoreModel = require('../models/courseScoreModel');

module.exports.viewStudentsList = async function (req,res){
    if(req.isAuthenticated()){

        var studentList = await studentModel.find({}).populate('course').populate({path:'interviewResult',populate:{path:'interview',select : 'company date'}});
        res.render('studentList',{title : 'Ninjas Report',studentList:studentList});
        return;
    }
    res.redirect('/user/sign-in');
};

module.exports.createStudent = async function (req,res){
    if(req.isAuthenticated()){
        try {
            var emailExist = await studentModel.findOne({email : req.body.email});
            if(emailExist) {
                // email already registered 
                req.flash('error','email already registered');
                res.redirect('/user/student-list');
                return;
            }
            // create Course Score
            const courseScore = await courseScoreModel.create(req.body);
            // create Student
            req.body.course = courseScore._id;
            await studentModel.create(req.body);
            req.flash('success','Student Added Successfully');
        } catch (error) {
            req.flash('error','Error in creating Student');
            console.log("Error Found",error);
        }
        res.redirect('/user/student-list');
        return;
    }
    res.redirect('/user/sign-in');
}