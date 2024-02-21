const express=require('express')
const orderController=require("../controllers/orderController.js")
const profileController=require("../controllers/profileController.js")
const router=express.Router()
router.route("/").post(profileController.isLogged,orderController.addOrder,orderController.destructureOrder,orderController.placeOrder).get(orderController.getAllOrders)
router
  .route("/:id")
  .post(
    profileController.isLogged,
    profileController.isAdmin,
    orderController.updateOrder
  )
  .get(profileController.isLogged, profileController.isAdmin,orderController.getOrder);
module.exports=router