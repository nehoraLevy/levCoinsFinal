const express = require("express");
const bodyParser=require("body-parser");
const mongoose = require('mongoose');


const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

const jwt= require("jsonwebtoken");
const bcrypt= require("bcrypt");
//const User =require("./models/userModel");

app.use(cors());
app.use(express.json());

app.use(require("./routes/user"));


const urlencodedParser=bodyParser.urlencoded({extends:false});
app.use(bodyParser.json(), urlencodedParser);

// get driver connection
const dbo = require("./db/connect");

 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});
