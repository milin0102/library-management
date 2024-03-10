const mongoose = require("mongoose");

const MmeberSchema  = mongoose.Schema({
    MemberID :{
        type:Number,
        required:true
    },
    MemberName:{
        type:String,
        required:true
    }
})

const Members = mongoose.model("members",MmeberSchema);

module.exports = Members