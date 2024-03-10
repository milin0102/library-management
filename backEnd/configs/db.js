const mongoose = require("mongoose");

async function connectToDB(username , password){
    await mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.fzgaw.mongodb.net/library`).then((res)=>{
        console.log("Connection Established")
    }).catch((e)=>{
        console.log(e);
        throw e;
    })
}

exports.connectToDB = connectToDB

