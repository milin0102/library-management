const express = require("express")
const moment = require("moment")
const Circulation = require("../models/circulations");
const Books = require("../models/books");

async function getBooks(req,res){
    try {
        let books = await Books.find({}).catch((e)=>{
            console.log(e);
            throw e;
        })
        return res.status(200).json({
            message:"Books found",
            success:true,
            data:books
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.getBooks = getBooks