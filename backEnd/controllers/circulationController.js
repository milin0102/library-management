const express = require("express")
const moment = require("moment")
const Circulation = require("../models/circulations");
const Books = require("../models/books")

async function bookCirculation(req,res){
    try {
        if(req.body.eventtype == "checkout"){
            let checkOutResp = await checkOutBook(req.body)
            return res.status(checkOutResp.httpStatusCode).json(checkOutResp);

        }else if(req.body.eventtype == "return"){
            let returnResp = await returnBook(req.body)
            return res.status(returnResp.httpStatusCode).json(returnResp);

        }
    } catch (error) {
      console.log(error);
      throw error;  
    }
}

async function checkOutBook(data){
try {
    console.log(data);
    if(!data.book_id || !data.member_id){
        return {
            httpStatusCode:422,
            success:true,
            message:"Invalid Params , bookId or memberId is required"
        }
    }

    let reqbook = await Books.find({BookID:data.book_id}).catch((e)=>{
        console.log(e);
        throw e;
    });
    console.log(reqbook);
    if(!reqbook.length){
        return {
            httpStatusCode:404,
            success:true,
            message:"No such book present"
        }
    }else{
        let booksCount = reqbook[0].NumberOfCopies;
        if(!booksCount){
            return {
                httpStatusCode:400,
                success:true,
                message:"Book is not available currently"
            }
        }
        
        //already a same book checkout by same member
        let circulationResp = await Circulation.find({BookID :data.book_id , MemberID : data.member_id}).catch((e)=>{
            console.log(e);
            throw e;
        })
        //This is used to keep that , it is a new request
        //there is always a pair 
        if(circulationResp.length%2!=0){
            return {
                httpStatusCode:500,
                success:false,
                message:"You already issued this book"
            }
        }
        //create a entry for this circulation
        let circulationBody = {
            MemberID : data.member_id,
            BookID : data.book_id,
            EventType:"checkout",
            Date: data.date || moment(),
            IsReturned:false
        }

        let insertRec = await Circulation.create(circulationBody).catch((e)=>{
            console.log(e);
            throw e;
        })
        console.log(insertRec);
        if(insertRec){
            await Books.updateOne({BookID : data.book_id},{NumberOfCopies:booksCount-1}).catch((e)=>{
                console.log(e);
                throw e;
            })

            return {
                httpStatusCode:200,
                success:true,
                message:"Book issued"
            }
        }else{
            return {
                httpStatusCode:500,
                success:false,
                message:"Book not issued"
            }
        }
    }
} catch (error) {
    console.log(error);
    throw error;
}
}

async function returnBook(data){
    try {
        console.log(data);
        if(!data.book_id || !data.member_id){
            return {
                httpStatusCode:422,
                success:true,
                message:"Invalid Params , bookId or memberId is required"
            }
        }
    
        let reqbook = await Books.find({BookID:data.book_id}).catch((e)=>{
            console.log(e);
            throw e;
        });
        console.log(reqbook);
        if(!reqbook.length){
            return {
                httpStatusCode:404,
                success:true,
                message:"No such book present"
            }
        }else{
            //Already a cirulation of checkout for this member id and book id is present or not
            
            let issuedBooks = await Circulation.find({MemberID:data.member_id , BookID : data.book_id , IsReturned : false}).catch((e)=>{
                console.log(e);
                throw e;
            })
            console.log(issuedBooks)
            if(!issuedBooks.length){
                return {
                    httpStatusCode:200,
                    success:false,
                    message:"No issued book found"
                }
            }
            
            let booksCount = reqbook[0].NumberOfCopies;
            //create a entry for this circulation
            let circulationBody = {
                MemberID : data.member_id,
                BookID : data.book_id,
                EventType:"return",
                Date: moment().format("DD/MM/YYYY")
            }
    
            let insertRec = await Circulation.create(circulationBody).catch((e)=>{
                console.log(e);
                throw e;
            })
            console.log(insertRec);
            if(insertRec){
                await Books.updateOne({BookID : data.book_id},{NumberOfCopies:booksCount+1}).catch((e)=>{
                    console.log(e);
                    throw e;
                })

                await Circulation.updateOne({MemberID:data.member_id , BookID : data.book_id , IsReturned : false}, {
                    IsReturned : true
                }).catch((e)=>{
                    console.log(e);
                    throw e;
                })
    
                return {
                    httpStatusCode:200,
                    success:true,
                    message:"Book Returned"
                }
            }else{
                return {
                    httpStatusCode:500,
                    success:false,
                    message:"Book not return"
                }
            }
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
    }

exports.bookCirculation = bookCirculation;