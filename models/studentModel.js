const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    college : {
        type : String,
        required:true
    },
    status : {
        type : String,
        enum : ['placed','not placed'],
    },
    course :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'courseScoreModel' 
    },
    interviewResult : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'resultModel'
        }
    ],
    batch :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'courseModel' 
    }
});

const studentModel = mongoose.model('studentModel',studentSchema);
module.exports = studentModel;