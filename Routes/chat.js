const express = require('express');
const chat = express.Router();
const db = require('../database/dbmongo')
const { ObjectId } = require("mongodb");


chat.lastseen = (req, res) => {
    console.log(req.body)
    db.getDB().collection('lastseen').findOne({ _id: ObjectId(req.body.uid) }, (err, result) => {
        if (err)
            throw err;
        else if (result == null || result == '') {
            db.getDB().collection('lastseen').insertOne(req.body, (err, result) => {
                if (err) throw err
                else {
                    res.json({ status: true, message: 'succesfully created' })

                }
            })


        } else {
            db.getDB().collection('lastseen').updateOne({ _id: ObjectId(req.body.uid) }, { $set: { lastseen: req.body.lastseen } }, (err, result) => {
                if (err) throw err
                else {
                    res.json({ status: true, message: "saved" })
                    console.log(result)
                }
            })

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