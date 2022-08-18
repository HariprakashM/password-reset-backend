
const express=require('express');
const app=express();
const mongodb=require('mongodb');
const mongoClient=mongodb.MongoClient;
const bcryptjs=require('bcryptjs');
const dotenv=require('dotenv').config();
const URL=process.env.DB;
var nodemailer = require("nodemailer");
var randomstring = require("randomstring");


app.post("/temp-pass", async function (req, res) {
    let Email = req.body.email;
    let String = req.body.randomstring;
    try {
      const connection = await mongoClient.connect(URL);
      const db = connection.db("password-reset");
      const salt = await bcryptjs.genSalt(10);
      const hash = await bcryptjs.hash(req.body.password, salt);
      req.body.password = hash;
      const user = await db
        .collection("users")
        .findOne({ email: req.body.email });
      if (user) {
        if (user.randomstring === req.body.randomstring) {
          await db
            .collection("users")
            .updateOne(
              { randomstring: String },
              { $set: { password: req.body.password } }
            );
          res.json({
            message: "Password reset done",
          });
        } else {
          res.json({
            message: "Random String is incorrect",
          });
        }
      } else {
        res.json({
          message: "Incorrect Email Id ",
        });
      }
      await db
        .collection("users")
        .updateOne({ randomstring: String }, { $unset: { randomstring: "" } });
    } catch (error) {
      console.log(error);
    }
  });

  module.exports=app