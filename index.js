const express = require('express')

const app = express();
const connect = require('./configs/db');

var cors = require('cors');
app.use(express.json())
app.use(cors());

const userController = require("./src/Routes/user.router");

app.use('/users', userController);

app.listen(8080, ()=>{
    connect();
    console.log('You listening on 8080...');
});