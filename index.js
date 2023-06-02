const express = require('express')
const bodyParser = require("body-parser")

const app = express();
const connect = require('./configs/db');

var cors = require('cors');
app.use(cors());

// const userController = require("./src/Routes/user");
// const productController = require("./src/Routes/product");
// const brandController = require("./src/Routes/brand");
// app.use('/users', userController);
// app.use('/product', productController);
// app.use('/brand', brandController);

app.listen(8080, ()=>{
    connect();
    console.log('You listening on 8080...');
});