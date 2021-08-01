const express = require('express');
const bodyParser = require("body-parser");
const db = require('./database/dbmongo');

var cors = require('cors');
const chat = require('./Routes/chat');
const app = express();

app.use(bodyParser.json({ limit: '1mb' }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true, useUnifiedTopology: true }));
app.use(cors())
//'''''''''''''''''''''''''''''''''''''''''''
const Chat = require('./Routes/chat');
app.use(require('./Routes/chat'));

app.post("/Chat",chat.createChat);

//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
//PORT
const PORT = process.env.PORT || 4202;
const server = app.listen(PORT, console.log('PORT RUNNING ON ::::::4202:::::'))

//DATABASE CONNNECTION
db.connect((err) => {
    if (err) {
      console.log('unable to connect to database');
      process.exit(1);
    }
  
    else {
  
      console.log('CONNECTED TO MONGO :::27017::::');
    }
  });

module.exports = { server }