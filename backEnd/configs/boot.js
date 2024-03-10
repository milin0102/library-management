const express = require("express");
const {connectToDB} = require("./db")
const figlet = require("figlet");
require('dotenv').config()
const cors = require("cors");
const app = express();
const routes = require("../routes/index")

async function init(){
    app.use(cors());
    app.use(express.json())
    app.use("/api",routes)
    
    connectToDB(process.env.MONGO_USERNAME , process.env.MONGO_PASSWORD).then((res)=>{
        start()
    }).catch((e)=>{
        console.log(e);
        throw e;
    })
    
}

async function start(){
    const port = process.env.PORT || 3000;
    app.listen(port ,(err)=>{
        if(err) console.log(err);
        console.log("Server is listening to:"+ port)
    })

    figlet.text("MERN Backend",function (err, data) {
        if (err) {
          console.log("Something went wrong...");
          console.dir(err);
          return;
        }
        console.log(data);
      })
}

exports.init = init