const jwt = require('jsonwebtoken')
const env = require('dotenv').config()

const generateToken = (userId) =>{
  const payload ={
    userId: userId
  }

  const token = jwt.sign(payload, process.env.SECRET_KEY,{
    expiresIn:'1h'
  });

  return token
}

const authenticate = (req,res,next) =>{
  const token = req.headers.authorization?.split(" ")[1]

  if(!token){
    return res.status(401).json('Acces denied. No token provided')
  }

  try {

    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decoded
    
    next()
  } catch (error) {
    console.log(error.message)
    return res.status(401).json('Inavalid or expired token')
  }
}

module.exports = { generateToken, authenticate }