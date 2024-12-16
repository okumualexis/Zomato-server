const router = require('express').Router()
const Payment = require('../model/paymentSchema')
const env = require('dotenv').config()
const { format} = require('date-fns')
const axios = require('axios')
const {getAccessToken } = require('../Auth/paymentAuth')

router.post('/payments',async(req,res)=>{
  const { phone, amount } = req.body
  
    const token = await getAccessToken()
  
    const timestamp = format(new Date(),"yyyyMMddHHmmss")
    const password = Buffer.from(`${process.env.PAYMENT_SHORTCODE}${process.env.PAYMENT_PASSKEY}${timestamp}`).toString("base64")
  
    const data ={
      BusinessShortCode: process.env.PAYMENT_SHORTCODE, 
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount, 
      PartyA: phone,
      PartyB: process.env.PAYMENT_SHORTCODE,
      PhoneNumber: phone, 
      CallBackURL: process.env.PAYMENT_CALLBACKURL, 
      AccountReference: "TestPayment",
      TransactionDesc: "Payment for goods",
    }
  
    try {
      const response = await axios.post(process.env.PAYMENT_INITIATE_URL,data,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
     
      return res.status(200).json({
        success:'payment send successfully',
        data: response.data
      })

    } catch (error) {
      console.log('Error initiating stkpush',error)
      return res.status(500).json({error:'Payment failed'})
    }
})

router.post('/callback',async(req,res)=>{
  const { Body} = req.body
  const { ResultCode, ResultDesc, CallbackMetadata} = Body.stkCallback;

  const transactionDetails ={
    status: ResultCode === 0 ? "SUCCESS": "FAILED",
    resultCode: ResultCode,
    resultDesc: ResultDesc,
    callbackData: ResultCode === 0 ? CallbackMetadata.Item.reduce(
      (acc,curr)=>({...acc,[curr.name]:curr.value}),{}) : null
  }
  

  try {
    const newPayment = new Payment(transactionDetails)
    await newPayment.save()

    return res.status(200).json({
      message: ResultCode === 0 ? "Transaction saved successfully" : "Transaction failed"
    })
  } catch (error) {
    console.log("Error occured", error.message)
    return res.status(500).json("Internal server error")
  }
  
})


module.exports = router