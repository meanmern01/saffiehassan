const mongoose = require("mongoose");
const PaymentSchema = mongoose.Schema({
    User:String,
    email:String,
    
  product:{
    amount: Number,
    quantity: Number 
  }
});

module.exports = mongoose.model("Payment", PaymentSchema);
