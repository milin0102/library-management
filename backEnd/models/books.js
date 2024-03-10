const mongoose = require("mongoose");

const BookSchema  = mongoose.Schema({
    BookID :{
        type:Number,
        required:true
    },
    BookName:{
        type:String,
        required:true
    },
    NumberOfCopies:{
        type:Number, 
        required:true
    }
})

const Books = mongoose.model("books",BookSchema);

module.exports = Books