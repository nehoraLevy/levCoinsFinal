const express = require("express");

const blockchain=require("../blockchain/blockchain");

const Routes = express.Router();

const dbo = require("../db/connect");


Routes.route("/transaction/add").post(async function (req, response) {

    let db_connect = dbo.getDb();
    const counterTransactions= await db_connect.collection("transactions").countDocuments();
    let myobj = {
        transferId: 200+counterTransactions+1,
        date: Date(Date.now()).toString(),
        amount:req.body.amount,
        sender:req.body.senderName,
        reciever:req.body.recieverName,
    };
    
    //add to blockchain
    blockchain.createNewBlock({
      id: 200+counterTransactions+1,
      date: Date(Date.now()).toString(),
      amount:req.body.amount,
      sender:req.body.senderName,
      reciever:req.body.recieverName,
    });
    
    db_connect.collection("transactions").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.status(200).json(res);
    });
});

Routes.route("/transaction/:sender").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { sender: String( req.params.sender )};
    db_connect
        .collection("transactions")
        .findOne(myquery, function (err, result) {
          if (err) throw err;
          res.json(result);
        });
});

Routes.route("/transaction/:reciever").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { reciever: String( req.params.reciever )};
  db_connect
      .collection("transactions")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

Routes.route("/transaction").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
      .collection("transactions")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});
module.exports = Routes;