const mongoose = require('mongoose')

const productScehma = new mongoose.Schema({
    Name : String , 
    price : Number, 
    category : String,
    rating : Number,
    desc : String
  },
  {
    timestamps : true
  })


module.exports =  mongoose.model("product", productScehma);