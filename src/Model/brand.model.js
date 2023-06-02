const mongoose = require('mongoose')

const brandScehma = new mongoose.Schema({
    Name : String , 
  },
  {
    timestamps : true
  })


module.exports =  mongoose.model("brand", brandScehma);