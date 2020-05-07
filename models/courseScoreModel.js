const mongoose = require('mongoose');

const courseScoreSchema = new mongoose.Schema({
    DSA_score:{
        type:Number,
        required:true,
        min : 0,
        max : 100
    },
    WebD_score:{
        type:Number,
        required:true,
        min : 0,
        max : 100
    },
    React_score:{
        type:Number,
        required:true,
        min : 0,
        max : 100
    }
});

const courseScoreModel = mongoose.model('courseScoreModel',courseScoreSchema);
module.exports = courseScoreModel;