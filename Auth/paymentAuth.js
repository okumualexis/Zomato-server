const axios = require('axios')
const env = require('dotenv').config()

const auth = Buffer.from(`${process.env.PAYMENT_CUSTOMER_KEY}:${process.env.PAYMENT_CUSTOMER_SECRET}`).toString('base64')


const getAccessToken = async()=>{
  try {
    const response = await axios.get(process.env.PAYMENT_GEN_TOKENURL,{
      headers:{
        Authorization:`Basic ${auth}`
      }
    })

    return response.data.access_token;
    
  } catch (error) {
    console.error("Error getting access token",error.message)
    throw error
  }
}

module.exports = { getAccessToken }



