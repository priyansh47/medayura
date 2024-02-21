const mongoose = require("mongoose");
const randomHex = require("../utils/randomHex.js");
const products = require("../model/Product.js");
const orderSchema = new mongoose.Schema({
  user: {
    type: String,
    ref: "user",
    required: true,
  },
  orderItems: [
    {
      type: Object,
      required: true,
    },
  ],
  shippingAddress: {
    type: Object,

  },

  orderNumber: {
    type: String,
    required: true,
    default: randomHex,
  },
  paymentStatus: {
    type: String,
    required: true,
    default: "Not Paid",
  },
  paymentMethod: {
    type: String,
    default: "not specified",
  },
  status: {
    type: String,
    default: "pending",
  },
  currency: {
    type: String,
    default: "Not Specified",
  },
  deliveredAt: {
    type: Date,
  },
  placedAt: {
    type: Date,
    default: () => new Date().toISOString(),
  },
  totalPrice: {
    type: Number,
    default: 0.0,
  },
});
// orderSchema.virtuals("total price").get(function(next){
//   let totalprice=0
//   this.orderItems.forEach(async (order)=>{
//    const product=await products.findById( order.product_Id)
//    totalprice+=product.price
//   })
//   return totalprice;
// })
module.exports = mongoose.model("orders", orderSchema);
