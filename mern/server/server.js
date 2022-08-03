
const express = require("express");
const bodyParser=require("body-parser");



const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

const jwt= require("jsonwebtoken");
const bcrypt= require("bcrypt");


app.use(cors());
app.use(express.json());

app.use(require("./routes/user"));

app.use(require("./routes/transactions"));

app.use(require("./routes/Loans"));

app.use(require("./sendEmail/sendEmail"));
/*
const urlencodedParser=bodyParser.urlencoded({extends:false});
app.use(bodyParser.json(), urlencodedParser);
*/
// get driver connection
const dbo = require("./db/connect");
var http = require('http').createServer(app);


const io = require("socket.io")(5001, {
  cors: {
    origin: "http://localhost:3000",
  },
  });io.on('connection', (socket) => {
  socket.on('message', (message) =>     {
      console.log(message);
      io.emit('message', `${socket.id.substr(0,2)} said ${message}` );   
  });
});



http.listen(port, async function()
 {
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);

});


