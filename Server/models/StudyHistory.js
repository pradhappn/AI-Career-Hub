const mongoose = require("mongoose");

const studyHistorySchema =
new mongoose.Schema({

userId:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

fileName:String,

summary:String,

mcqs:Array,

flashcards:Array,

createdAt:{
type:Date,
default:Date.now
}

});

module.exports =
mongoose.model(
"StudyHistory",
studyHistorySchema
);