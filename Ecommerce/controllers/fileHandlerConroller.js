const catchAsync=require("../utils/catchAsync.js")
const productModel=require("../model/Product.js")
module.exports.addImageToProduct=catchAsync(async(req,res,next)=>{
   const file=req.files[0]
   const path= file.path
   const data=await productModel.findByIdAndUpdate(req.product_id,{img:path},{new:true})
   res.status(201).json({status:"attached image",
  data:{
    product:data
  }})
})
