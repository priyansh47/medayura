const mongoose=require("mongoose")
const coupon=new mongoose.Schema({
  code:{
    type:String,
    unique:true
  }
  ,
  startingDate
})