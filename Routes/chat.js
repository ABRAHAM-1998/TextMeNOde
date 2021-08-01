const express = require('express');
const chat = express.Router();
const db = require('../database/dbmongo')
const { ObjectId } = require("mongodb");


chat.createChat = (req, res) => {
    db.getDB().collection('Chat').insertOne( req.body, (err, result) => {
        if (err) throw err
        else {
            res.json({ status: true, message: "deleted" })
            console.log(result.ops)
        }
    })
}
//===================================================================

//=====================================================================
module.exports = chat