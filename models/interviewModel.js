const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    company:{
        type:String,
        required:true,
    },
    date : {
        type : String,
        required : true
    },
    studentResult : [
       {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'resultModel'
       }
    ]
});

const interviewModel = mongoose.model('interviewModel',interviewSchema);
module.exports = interviewModel;