const express = require("express")
const moment = require("moment")
const Circulation = require("../models/circulations");
const Books = require("../models/books")

async function overDues(req,res){
    try {
        if(!req.body.member_id){
            return res.status(400).json({
                success:false,
                message:"member id required"
            })
        }
        let circulations = await Circulation.find({MemberID : req.body.member_id , IsReturned:false}).catch((e)=>{
            console.log(e);
            throw e;
        })
        let totalFine = 0
        if(circulations.length){
            circulations.map((ciculation)=>{
                console.log(moment())
                console.log(ciculation.Date)
                let days = moment("2023-05-31").diff(ciculation.Date,'days');
                if(days>7){
                    totalFine+=(days-7)*50;   
                }
            })
        }else{
            return res.status(404).json({
                message:"No data found",
                success:false
            })
        }
        return res.status(200).json({
            message:"Total fine",
            success:true,
            data:{
                TotalFine : totalFine
            }
        })
        
    } catch (error) {
        
    }
}

exports.overDues = overDues