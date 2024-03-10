const mongoose = require("mongoose");

//Enahancement : envent type should be enum
const CirculationSchema  = mongoose.Schema({
    EventType :{
        type:String,
        required:true
    },
    BookID:{
        type:Number,
        required:true
    },
    MemberID:{
        type:Number,
        required:true
    },
    Date:{
        type:Date, 
        required:true
    },
    IsReturned:{
        type:Boolean
    }
})

const Circulation = mongoose.model("circulations",CirculationSchema);

module.exports = Circulation