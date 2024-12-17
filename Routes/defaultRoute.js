const router = require('express').Router()

router.get('/',(req,res)=>{
  console.log("Route is visited")
  res.status(200).json({message:'welcome to test route at porshtech Ltd'})
})

module.exports = router