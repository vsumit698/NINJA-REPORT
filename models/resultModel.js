const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    student : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'studentModel'
    },
    interview : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'interviewModel'
    },
    resultStatus : {
        type : String,
        enum : ['pass', 'fail', 'on hold', 'not attempt'],
        default : 'on hold'
    }
});

const resultModel = mongoose.model('resultModel',resultSchema);
module.exports = resultModel;