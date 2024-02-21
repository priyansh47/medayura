const catchAsync=require("../utils/catchAsync.js")
const userModel=require("../model/userModel.js")
const orderModel=require('../model/Order.js')
const appError=require('../utils/appError.js')
const stripe=require('stripe')(process.env.stripe_key)
module.exports.addOrder=catchAsync(async (req,res,next)=>{
  const user=await userModel.findById(req.userAuthId)
  console.log(user)

  const {orderItems}=req.body
  const order = await orderModel.create({ orderItems, user: user._id });
  req.order_id=order._id.toString()
  next()
})
module.exports.placeOrder=catchAsync(async(req,res,next)=>{
// const paymentIntent = await stripe.paymentIntents.create({
//     amount: 100, // subunits of currency
//     currency: "INR",
//     description: "for amazon-clone project",
//     shipping: {
//       name: "Random singh",
//       address: {
//         line1: "510 Townsend St",
//         postal_code: "98140",
//         city: "Kanpur",
//         state: "UP",
//         country: "INR",
//       },
//     },
// });
// __________________________________________________________________________________________________________________________
  // const session =await stripe.checkout.sessions.create({
  //   line_items:[
  //     {price_data:{
  //       currency:"INR",
  //       product_data:{
  //         name:"Hats",
  //         description:"this is a wondeful hat"
  //       } ,
  //       unit_amount:100*100
  //     },
  //     quantity:2
  //   }
  // ]
  // ,mode:"payment",
  // success_url:`http://success`,
  // cancel_url:`http://canceled`
  // })
  // -------------------------------------------------------------------------------
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: req.line_items,
    metadata:{

    
    product_items:JSON.stringify(req.product_items),
    order_id:req.order_id


}
    ,
    mode: "payment",
    success_url: "https://example.com/success",
    cancel_url: "https://example.com/cancel",
    shipping_address_collection: {
      allowed_countries: ["US", "CA"],
    },
  });
  // -------------------------------------------------------------------------------
  res.status(303).json({
    status:"redirection",
    url:session.url
  })
})
module.exports.destructureOrder=catchAsync(async(req,res,next)=>{
  const orderObj=req.body
  const line_items=[]
  const product_items=[]
  orderObj.orderItems.forEach((orderItem=>{
    const {_id:product_id,name,price:unit_amount,qty:quantity}=orderItem
    product_items.push({product_id,quantity})
    line_items.push({
     
      quantity,
      price_data:{
        currency:"INR",product_data:{
          name
        },
        unit_amount:unit_amount*100,
      }
    })
  }))
  req.line_items=line_items
  req.product_items=product_items
  next()
})
module.exports.getAllOrders=catchAsync(async(req,res,next)=>{
  const orders = await Order.find().populate('user',)
  res.status(200).json({status:"success",
  length:orders.length,
  data:{
    orders
  }
})
})
module.exports.getOrder=catchAsync(async(req,res,next)=>{
  const order =await orderModel.findById(req.params.id).populate("user")
    res.status(200).json({status:"success",
  length:orders.length,
  data:{
    orders
  }
})})
module.exports.updateOrder=catchAsync(async(req,res,next)=>{

  const order=await orderModel.findByIdAndUpdate(req.params.id,req.body,{new:true}).populate("user")
  es.status(201).json({
    status: "success",
    length: orders.length,
    data: {
      orders,
    },
  });
}
)