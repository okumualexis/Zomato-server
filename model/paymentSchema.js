const mongoose = require('mongoose')



const paymentSchema = new mongoose.Schema(
  {
    status: { type: String, required: true }, 
    resultCode: { type: String, required: true },
    resultDesc: { type: String, required: true },
    callbackData: {
      type: Map, 
      of: mongoose.Schema.Types.Mixed, 
    },
  },
  { timestamps: true }
);



const Payment = mongoose.model('payment', paymentSchema)
module.exports = Payment