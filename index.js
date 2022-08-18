
const register = require('./Screens/Register');
const login = require('./Screens/Login')
const dash = require('./Screens/Dash');
const forgotpassword = require('./Screens/Forgotpasssword');
const temppass = require('./Screens/Temppass');



const express=require('express');
const app=express();
const cors=require('cors');
const mongodb=require('mongodb');
const mongoClient=mongodb.MongoClient;
const dotenv=require('dotenv').config();
const URL=process.env.DB;
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');
const SECRET=process.env.SECRET;
app.use(express.json());
app.use(cors({
    orgin:'*'
}));




app.post('/register', register)
app.get('/register', register)

app.post('/login', login)

app.post('/dash',  dash)
app.get('/dash',  dash)

app.post('/forgotpassword', forgotpassword)

app.post('/temp-pass', temppass)

app.listen(process.env.PORT || 5000)

//.....authenticate.....//

// const authenticate=function(req,res,next){
//     if(req.headers.authorization){
//      let verify=jwt.verify(req.headers.authorization,SECRET);
//      if(verify){
//         //  console.log(verify);
//         //  console.log(req.body);
//          req.userid=verify._id;
//          next()
//      }else{
//          res.status(401).json({message:"unauthorized"});
//      }
    
//     }else{
//      res.status(401).json({message:"invalid token"});
//     }
 
 
//  }
//.....register.....//

// app.post("/register", async function (req, res) {
//     try {
//         const connection = await mongoClient.connect(URL);
//         const db = connection.db("password-reset");
//         const salt = await bcryptjs.genSalt(10);
//         const hash = await bcryptjs.hash(req.body.password, salt);
//         req.body.password = hash;
//         await db.collection("users").insertOne(req.body);
//         await connection.close();
//         res.json({
//             message: "user registered added successfully"
//         })
//     } catch (error) {
//         console.log(error);
//     }
// })

// app.get("/register", async function (req, res) {
//     try {
//         const connection = await mongoClient.connect(URL);
//         const db = connection.db("passsword-reset");
//         const result = await db.collection("users").find().toArray();
//         await connection.close();
//         res.json(result);
//     } catch (error) {
//         console.log(error);
//     }
// })

//.....login.....//

// app.post("/login", async function (req, res) {
//     try {
//         const connection = await mongoClient.connect(URL);
//         const db = connection.db("password-reset");
//         const temp = await db.collection("users").findOne({ username: req.body.username })
//         if (temp) {
//             const match = await bcryptjs.compare(req.body.password, temp.password);
//             if (match) {
//                 const token = jwt.sign({ _id: temp._id }, SECRET,{expiresIn:"90min"});
//                 // console.log(token)
//                 res.json({ message: "successfully logged in",id:temp._id, token ,temp})
//             } else {
//                 res.json({ message: "incorrect password" })
//             }
//         } else { res.json({ message: "user not found,Kindly register before logging in" }) }
//         await connection.close();

//     } catch (error) {
//         console.log(error);
//     }
// })

//.....dashboard.....//

// app.get("/dash",authenticate, async function (req, res) {
//     try {
//         const connection = await mongoClient.connect(URL);
//         const db = connection.db("password-reset");
//         const result = await db.collection("dash").find({userid:mongodb.ObjectId(req.userid)}).toArray();
//         await connection.close();
        
//         res.json(result);
//     } catch (error) {
//         console.log(error);
//     }
// })
// app.post("/dash",authenticate, async function (req, res) {
//     try {
//         const connection = await mongoClient.connect(URL);
//         const db = connection.db("password-reset");
//         req.body.userid=mongodb.ObjectId(req.userid);
//         await db.collection("dash").insertOne(req.body);
//         await connection.close();
//         res.json({
//             message: "student added successfully"
//         })
//     } catch (error) {
//         console.log(error);
//     }
// })

// app.listen(process.env.PORT || 5000)
