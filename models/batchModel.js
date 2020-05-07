const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    student : [
       {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'studentModel'
       }
    ]
},{timestamps:true});

const batchModel = mongoose.model('batchModel',batchSchema);
module.exports = batchModel;