const express=require("express")
const stripe = require('stripe')(process.env.stripe_key);
const app=express()
const queryController=require("./controllers/queryController.js")
const fileUpload=require("./fileUpload/fileUpload.js")
const userRoute=require("./route/userRoute.js")
const orderModel=require('./model/Order.js')
const orderRoute=require('./route/orderRoute.js')
const productRoute=require('./route/productRoute.js')
const brandRoute=require("./route/brandRoute.js")
const productController=require('./controllers/productController.js')
const colorRoute=require("./route/colorRoute.js")
const catchAsync=require('./utils/catchAsync.js')
const reviewRoute=require('./route/reviewRoute.js')
const categoryRoute=require('./route/categoryRoute.js')
app.use('/webhook',express.raw({ type: "application/json" }));

app.use(express.json())
app.use(queryController)
app.use((req,res,next)=>{console.log('%c' + req.url, 'color: #800080;');
 next();})
app.use("/api/v1/users",userRoute)
app.use('/api/v1/products',productRoute)
app.use('/api/v1/category',categoryRoute)
app.use('/api/v1/brands/',brandRoute)
app.use('/api/v1/colors/',colorRoute)
app.use('/api/v1/reviews/',reviewRoute)
app.use('/api/v1/orders/',orderRoute)
// stripe code here------------------------------------------------------------------------------
// server.js
//
// Use this sample code to handle webhook events in your integration.
//
// 1) Paste this code into a new file (server.js)
//
// 2) Install dependencies
//   npm install stripe
//   npm install express
//
// 3) Run the server on http://localhost:4242
//   node server.js

// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.



// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =
  "whsec_4a441d22416fdab40b9ce2e405b3d457c5960e21c8528bca823715cdc7f245e8";
app.post("/testMulter",fileUpload.array("file"),(req,res,next)=>{
  res.send(req.files)
})
app.post(
  "/webhook",
  
  async (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
      console.log("success -------------------------------done payment")
      response.status(200).send(event)
      console.log(event)
    } catch (err) {
      console.log(err)
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      // case "payment_intent.succeeded":
      case "checkout.session.completed":
        updateOrder(event.data.object)
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

// stripe code here------------------------------------------------------------------------------
module.exports=app

async function updateOrder(session){
 console.log("Payment succeeded!");
        const{payment_status,payment_method_types,metadata,amount_total,shipping_details}=session
       
        const order=await orderModel.findById(metadata.order_id)
        const updatedOrder = await orderModel.findByIdAndUpdate(
          metadata.order_id,
          {
            shippingAddress: shipping_details,
            paymentMethod: payment_method_types[0],
            paymentStatus:payment_status,
            totalPrice:amount_total,
          },
          { new: true }
        );
        console.log(updatedOrder)
        await productController.updateProduct(JSON.parse(metadata.product_items))
}