const axios = require('axios')
const env = require('dotenv').config()

const auth = Buffer.from(`${process.env.PAYMENT_CUSTOMER_KEY}:${process.env.PAYMENT_CUSTOMER_SECRET}`).toString('base64')
const tokenUrl ="https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"

const getAccessToken = async()=>{
  try {
    const response = await axios.get(tokenUrl,{
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



