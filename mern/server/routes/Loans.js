const express = require("express");

const Routes = express.Router();

const dbo = require("../db/connect");


Routes.route("/loans/add").post(async function (req, response) {
    let db_connect = dbo.getDb();
    const counterLoans= await db_connect.collection("loans").countDocuments();
    let myobj = {
        loanId: 200+counterLoans+1,
        date: Date(Date.now()).toString(),
        amount:req.body.amount,
        sender:req.body.sender,
        reciever:req.body.reciever,
    };
    
    db_connect.collection("loans").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.status(200).json(res);
    });
});

Routes.route("/loans/:sender").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { sender: String( req.params.sender )};
    db_connect
        .collection("loans")
        .findOne(myquery, function (err, result) {
          if (err) throw err;
          res.json(result);
        });
});

Routes.route("/loans/:reciever").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { reciever: String( req.params.reciever )};
  db_connect
      .collection("loans")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});


module.exports = Routes;