const router = require('express').Router()
const User = require('../model/userSchema')
const bcrypt = require('bcrypt')
const { generateToken } = require('../Auth/userAuthentication')

router.post('/users', async(req,res)=>{
  const { firstName, lastName, email, password,confirmPassword, username } = req.body;

  if(password != confirmPassword){
    return res.status(400).json('Passwords do not match!')
  }

  try {
   const userExist = await User.findOne({username:username})
    if(userExist) return res.status(400).json('User already exists')

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword
    })

    await newUser.save()

    return res.status(201).json('Account created successfully!')
    
  } catch (error) {
    console.error(error)
    return res.status(500).json("Internal server error")
  }

})

router.post('/login', async(req,res)=>{
  const { username , password} = req.body;
 
  try {
    const registeredUser = await User.findOne({username: username})
    if(!registeredUser) return res.status(404).json('User does not exist!')
    
    const isPasswordMatching = await bcrypt.compare(password, registeredUser.password)

    if(isPasswordMatching){
      const token = generateToken(registeredUser._id,registeredUser.role)

     return res.status(200).json(token)
    }

    return res.status(400).json('Wrong or invalid password!')


  } catch (error) {
    console.error(error)
    return res.status(500).json("Internal server error") 
  }


})

router.get('/users',async(req, res)=>{
  try {
    const users = await User.find({},{password:0})
    if(!users) return res.status(404).json("Users not found")
    
      return res.status(200).json(users)
  } catch (error) {
    console.log(error)
    return res.status(500).json("Internal server error")
  }
})


module.exports = router