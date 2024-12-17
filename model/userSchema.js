const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    email:{type:String, required:true},
    username:{type:String, required:true},
    password:{type:String, required:true},
    role:{
      type:String,
      enum:["admin","user"],
      default:'user'
    }
  },
  {timestamps:true}
)

const User = mongoose.model('user', userSchema)
module.exports = User