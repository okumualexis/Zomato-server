const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema(
  {
    name:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    restaurant:{type:String,required:true},
  },
  {timestamps:true}
)

const Food = mongoose.model('food', foodSchema)
module.exports = Food