const mongoose = require('mongoose');
require('dotenv').config();
module.exports = async ()=>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/money-tracking-app")
        
    } catch (error) {
        console.log("err :", error);
    }
}