const express = require("express");
const productController = require("../controllers/productController.js");
const profileController = require("../controllers/profileController.js");
const errorController = require("../controllers/errorController.js");
const fileHandlerController=require('../controllers/fileHandlerConroller.js')
const fileUpload=require('../fileUpload/fileUpload.js')
const router = express.Router();
router
  .route("/")
  .post(
    profileController.isLogged,
    profileController.isAdmin,
    productController.addProduct,
    fileHandlerController.addImageToProduct
  )
  .get(profileController.isLogged, productController.getAllproduct);
router
  .route("/:id")
  .post(
    fileUpload.array("file"),
    (req, res, next) => {
      req.product_id = req.params.id;
      next();
    },
    fileHandlerController.addImageToProduct
  )
  .get(profileController.isLogged, productController.getProduct)
  .put(
    profileController.isLogged,
    profileController.isAdmin,
    productController.updateProduct
  );
router.use(errorController.productRouteError);
module.exports = router;
