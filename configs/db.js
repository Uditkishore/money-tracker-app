const mongoose = require('mongoose');
require('dotenv').config();
module.exports = async ()=>{
    try {
    mongoose.connect(`mongodb+srv://udit:${process.env.PASSWORD}@cluster0.v61ph.mongodb.net/db?retryWrites=true&w=majority`)
        
    } catch (error) {
        console.log("err :", error);
    }
}