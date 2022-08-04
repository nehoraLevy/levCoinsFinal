const express = require("express");

const bcrypt= require("bcrypt");
const jwt =require("jsonwebtoken");


 
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const Routes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/connect");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


 
 
// This section will help you get a list of all the records.
Routes.route("/user").get(async function (req, res) {
 let db_connect = dbo.getDb("Users");
 await db_connect.collection("users")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});

// This section will help you get a single user by name
Routes.route("/user/:name").get(async function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { name: String( req.params.name )};
  await db_connect
      .collection("users")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
 });
 
// This section will help you create a new user
Routes.route("/user/add").post(async function (req, response) {
  let db_connect = dbo.getDb();
  /*
  const takenUserName= db_connect.collection("users").findOne({name: req.body.username})
  if(takenUserName)
  {
    response.json({message:"already exists"});
    console.log(takenUserName);
  }
  else{*/
    const counterUsers= await db_connect.collection("users").countDocuments();
    const password= await bcrypt.hash(req.body.password, 10);
    let myobj = {
      userNumber: counterUsers+1,
      name: req.body.username,
      password:password,
      email: req.body.email,
      mobile: req.body.mobile,
      AmountInDollars:Number(req.body.InitialAmount),
      status:"wait to confirm",
      date: Date(Date.now()).toString(),
      AmountInLevCoins:Number(req.body.InitialAmount*(1-(counterUsers)/100.0)),
    };
    
    db_connect.collection("users").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });

  /*}*/

});

Routes.route("/user/login").post(function (req, res) {
  let db_connect = dbo.getDb();
  const userLoggging=req.body;

  db_connect.collection("users").findOne({name: userLoggging.username}).then(dbUser=>{
    if(!dbUser)
    {
      return res.status(400).json({message:"Invalid username"});
    }
    bcrypt.compare(userLoggging.password, dbUser.password)
    .then(isCorrect =>{
      if(isCorrect)
      {
        const payload={
          id:dbUser._id,
          username:dbUser.username,
        }
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          {expiresIn:86400},
          (err, token)=>{
            if(err) return res.json({message:err});
            //if(dbUser.status=="accepted") {
              return res.status(200).json({
                message: "Success",
                token:"Bearer"+token
              })
            //}
          }
        )
      }
      else{
        return res.status(400).json({message:"Not Correct"});
      }
    })
  })
});


 
// update by name
Routes.route("/update/:name").post(function (req, response) {
 let db_connect = dbo.getDb(); 
 let myquery = { name: req.params.name }; 
 let newvalues = {   
   $set: {
    userNumber:req.body.userNumber,    
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    mobile: req.body.mobile,
    AmountInDollars:Number(req.body.AmountInDollars),
    status:req.body.status,
    date:req.body.date,
    AmountInLevCoins:Number(req.body.AmountInLevCoins), 
   }, 
  }
  db_connect
  .collection("users")
  .updateOne(myquery, newvalues, function (err, res) {
    if (err) throw err;
    console.log("1 document updated");
    response.json(res);
  });
});
 
// This section will help you delete a record
Routes.route("/:name").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { name: req.params.name };
 db_connect.collection("users").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 user deleted");
   response.json(obj);
 });
});
 
module.exports = Routes;