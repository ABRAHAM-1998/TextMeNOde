const express = require('express');
const chat = express.Router();
const db = require('../database/dbmongo')
const { ObjectId } = require("mongodb");


chat.lastseen = (req, res) => {
    console.log(req.body)
    db.getDB().collection('lastseen').findOne({ uid: req.body.uid }, (err, result) => {
        if (err)
            throw err;
        else if (result == null || result == '') {
            db.getDB().collection('lastseen').insertOne(req.body, (err, result) => {
                if (err) throw err
                else {

                }
            })


        } else {
            db.getDB().collection('lastseen').updateOne({ uid: req.body.uid },
                { $set: { lastseen: req.body.lastseen, touid: req.body.touid } }, (err, result) => {
                    if (err) throw err
                    else {
                        db.getDB().collection('lastseen').findOne({ uid: req.body.touid }, (err, result) => {
                            if (err) {
                                throw err;
                                console.log(result)
                            }
                            else if (result == null || result == '') {
                                res.json({ status: true, message: "dissabled" })

                            }else
                            res.json({ status: true, message: result.lastseen })
                        })
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