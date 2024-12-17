const express = require('express');
const cors = require('cors')
const env = require('dotenv').config()
const mongoose = require('mongoose')
const userRoutes = require('../Routes/userRoute')
const foodRoutes = require('../Routes/foodRoute')
const paymentRoutes = require('../Routes/paymentRoute')

const app = express()
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors())

const connectToDb = async() =>{
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('Database connection is initiated')
  

  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

connectToDb()

app.get('/',(req,res)=>{
  res.status(200).json({message:'welcome to test route at porshtech Ltd'})
})

app.use('/api', userRoutes)
app.use('/api', foodRoutes)
app.use('/api', paymentRoutes)

module.exports = app
