const express = require('express')

const app = express();
const connect = require('./configs/db');
const {userDetails} = require("./src/middlewares/getUser.middleware");

var cors = require('cors');
app.use(express.json())
app.use(cors());

const userController = require("./src/Routes/user.router");
const transactionController = require("./src/Routes/transaction.router");


app.use('/users', userController);
app.use('/', userDetails, transactionController);

app.listen(8080, ()=>{
    connect();
    console.log('You listening on 8080...');
});