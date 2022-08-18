



const express=require('express');
const app=express();
const mongodb=require('mongodb');
const mongoClient=mongodb.MongoClient;
const dotenv=require('dotenv').config();
const URL=process.env.DB;
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');
const SECRET=process.env.SECRET;





app.post("/login", async function (req, res) {
    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db("password-reset");
        const temp = await db.collection("users").findOne({ username: req.body.username })
        if (temp) {
            const match = await bcryptjs.compare(req.body.password, temp.password);
            if (match) {
                const token = jwt.sign({ _id: temp._id }, SECRET);
                // console.log(token)
                res.json({ message: "successfully logged in",id:temp._id, token ,temp})
            } else {
                res.json({ message: "incorrect password" })
            }
        } else { res.json({ message: "user not found,Kindly register before logging in" }) }
        await connection.close();

    } catch (error) {
        console.log(error);
    }
})

module.exports=app