const express = require('express');
const chat = express.Router();
const db = require('../database/dbmongo')
const { ObjectId } = require("mongodb");


chat.lastseen = (req, res) => {
    db.getDB().collection('lastseen').insertOne( req.body, (err, result) => {
        if (err) throw err
        else {
            res.json({ status: true, message: "saved" })
            console.log(result.ops)
        }
    })
}
//===================================================================
// chat.lastseen = (req, res) => {
//     db.getDB().collection('lastseen').updateOne({ _id: ObjectId(req.body.uid) },{ $set: { LoginTime: req.body.LoginTime }}, (err, result) => {
//         if (err) throw err
//         else {
//             res.json({ status: true, message: "saved" })
//             console.log(result.ops)
//         }
//     })
//=====================================================================
module.exports = chat