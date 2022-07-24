const express = require("express");

const bcrypt= require("bcrypt");
const jwt =require("jsonwebtoken");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/connect");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the records.
recordRoutes.route("/user").get(function (req, res) {
 let db_connect = dbo.getDb("Users");
  db_connect.collection("users")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you get a single record by id
recordRoutes.route("/user/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId( req.params.id )};
 db_connect
     .collection("users")
     .findOne(myquery, function (err, result) {
       if (err) throw err;
       res.json(result);
     });
});
 
// This section will help you create a new user
recordRoutes.route("/user/add").post( async function (req, response) {
  let db_connect = dbo.getDb();
  /*
  const takenUserName= db_connect.collection("users").findOne({name: req.body.username})
  if(takenUserName)
  {
    response.json({message:"already exists"});
    console.log(takenUserName);
  }
  else{*/
    const password= await bcrypt.hash(req.body.password, 10);
    let myobj = {
      name: req.body.username,
      password:password,
      email: req.body.email,
      mobile: req.body.mobile,
      InitialAmount: req.body.InitialAmount,
      AmountInDollars:req.body.InitialAmount,
    };
    db_connect.collection("users").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });

});

recordRoutes.route("/user/login").post(function (req, res) {
  let db_connect = dbo.getDb();
  const userLoggging=req.body;
  db_connect.collection("users").findOne({name: userLoggging.username}).then(dbUser=>{
    if(!dbUser)
    {
      return res.json({message:"Invalid username"});
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
            return res.json({
              message: "Success",
              token:"Bearer"+token
            })
          }
        )
      }
      else{
        return res.json({message:"Not Correct"});
      }
    })
  })
});


 
// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb(); 
 let myquery = { _id: ObjectId( req.params.id )}; 
 let newvalues = {   
   $set: {     
    name: req.body.username,
    password: req.body.password,
    email: req.body.email,
    mobile: req.body.mobile,
    InitialAmount: req.body.InitialAmount,
    AmountInDollars:req.body.InitialAmount,   
   }, 
  }
});
 
// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId( req.params.id )};
 db_connect.collection("users").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 user deleted");
   response.json(obj);
 });
});
 
module.exports = recordRoutes;