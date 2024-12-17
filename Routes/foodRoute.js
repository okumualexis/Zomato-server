const router = require('express').Router()
const Food = require('../model/foodSchema')
const cloudinary = require('../cloudinary/cloudinary')
const { authenticate } = require('../Auth/userAuthentication')

router.post('/foods',async(req,res)=>{
 const { name, price, image, restaurant} = req.body;
 if(!name || !price || !image || !restaurant){
  return res.status(400).json('All fields must be provided')
 }

 try {
  const result = await cloudinary.uploader.upload(image,
    {
      upload_preset:'zomato_task',
      transformation:[
        {
          quality:'auto',
          fetch_format:'auto'
        },
        {
          crop:'fill',
          gravity:'auto'
        }
      ]
    })
    
    const url = result.secure_url
  
    const newDish = new Food({
      name,
      price,
      restaurant,
      image:url
    })

    await newDish.save()

    return res.status(201).json('new dish is added successfully')
 } catch (error) {
  if(err.name === 'ValidationError'){
   return res.status(400).json('Invalid data provided')
  }
  return res.status(500).json("Internal server error")
 }

})

router.get('/foods',authenticate,async(req,res)=>{

  try {
    const foods = await Food.find()

    return res.status(200).json(foods)
    
  } catch (error) {
    console.log(error)
    return res.status(500).json("Internal server error")
  }
})

module.exports = router;