const express = require('express');
const env = require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require('../Routes/userRoute')
const foodRoutes = require('../Routes/foodRoute')
const paymentRoutes = require('../Routes/paymentRoute')

const app = express()
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors())

app.use('/v2', userRoutes)
app.use('/v2', foodRoutes)
app.use('/api', paymentRoutes)

const kickStartServer = async() =>{
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('Database connection is initiated')
   
    app.listen(process.env.PORT, ()=>{
      console.log(`Server is started on port ${process.env.PORT}`)
    })

  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

kickStartServer()
