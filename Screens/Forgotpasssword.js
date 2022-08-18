const express=require('express');
const app=express();
const mongodb=require('mongodb');
const mongoClient=mongodb.MongoClient;
const dotenv=require('dotenv').config();
const URL=process.env.DB;
var nodemailer = require("nodemailer");
var randomstring = require("randomstring");

app.post("/forgotpassword", async function (req, res) {
    try {
      const connection = await mongoClient.connect(URL);
      const db = connection.db("password-reset");
      const user = await db
        .collection("users")
        .findOne({ email: req.body.email });
        // console.log(user)
        let mailid = req.body.email;
        
      if (user) {
        let randomString = randomstring.generate(7);
        
        await db
          .collection("users")
          .updateOne({ email: mailid }, { $set: { randomstring: randomString } });
        await connection.close();
  
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "noreplytestmailid@gmail.com",
            // pass: process.env.pass,
            pass: process.env.pass,
            
            
          },
        });
  
        var mailOptions = {
          from: "acer20102000@gmail.com",
          to: mailid,
          subject: "Password Reset",
          text: `Your Temporary password is ${randomString}. Copy the link and paste it in Temporary password and submit`,
          html: `<h3> Your Temporary password is ${randomString}. Copy the link and paste it in <b>Temporary password</b> and submit</h3>`,
        };
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log('email sent successfully')
            }
        });
        res.json({
          message: "Email Send",
          mailid:mailid,
        });
      } else {
        res.json({
          message: "Incorrect Email Id ",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

  module.exports=app;