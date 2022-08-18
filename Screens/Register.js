

const express=require('express');
const app=express();
const mongodb=require('mongodb');
const mongoClient=mongodb.MongoClient;
const dotenv=require('dotenv').config();
const URL=process.env.DB;
const bcryptjs=require('bcryptjs');





app.post("/register", async function (req, res) {
    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db("password-reset");
        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(req.body.password, salt);
        req.body.password = hash;
        await db.collection("users").insertOne(req.body);
        await connection.close();
        res.json({
            message: "user registered added successfully"
        })
    } catch (error) {
        console.log(error);
    }
})

app.get("/register", async function (req, res) {
    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db("passsword-reset");
        const result = await db.collection("users").find().toArray();
        await connection.close();
        res.json(result);
    } catch (error) {
        console.log(error);
    }
})

module.exports=app;