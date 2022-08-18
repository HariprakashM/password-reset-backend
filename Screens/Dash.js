const express=require('express');
const app=express();
const mongodb=require('mongodb');
const mongoClient=mongodb.MongoClient;
const dotenv=require('dotenv').config();
const URL=process.env.DB;

const jwt=require('jsonwebtoken');
const SECRET=process.env.SECRET;



const authenticate=function(req,res,next){
    if(req.headers.authorization){
     let verify=jwt.verify(req.headers.authorization,SECRET);
     if(verify){
        //  console.log(verify);
        //  console.log(req.body);
         req.userid=verify._id;
         next()
     }else{
         res.status(401).json({message:"unauthorized"});
     }
    
    }else{
     res.status(401).json({message:"invalid token"});
    }
 
 
 }


app.get("/dash",authenticate, async function (req, res) {
    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db("password-reset");
        const result = await db.collection("dash").find({userid:mongodb.ObjectId(req.userid)}).toArray();
        await connection.close();
        
        res.json(result);
    } catch (error) {
        console.log(error);
    }
})
app.post("/dash",authenticate, async function (req, res) {
    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db("password-reset");
        req.body.userid=mongodb.ObjectId(req.userid);
        await db.collection("dash").insertOne(req.body);
        await connection.close();
        res.json({
            message: "student added successfully"
        })
    } catch (error) {
        console.log(error);
    }
})

module.exports=app;