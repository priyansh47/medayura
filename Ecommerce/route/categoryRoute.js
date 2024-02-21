const express=require("express")
const router=express.Router()
const categoryController=require("../controllers/categoryController.js")
const fileUpload = require("../fileUpload/fileUpload.js");
const profileController=require("../controllers/profileController.js")
const fileHandlerController = require("../controllers/fileHandlerConroller.js");
router
  .route("/")
  .post(
    profileController.isLogged,
    profileController.isAdmin,
    categoryController.addCategory
  )
  .get(
    profileController.isLogged,
    
    categoryController.getAllcategories
  );
  router
    .route("/:id")
    .post(
      fileUpload.array("file"),
      profileController.isLogged,
      profileController.isAdmin,
      (req, res, next) => {
        req.product_id = req.params.id;
        next();
      },
      fileHandlerController.addImageToProduct
    )
    .put(
      profileController.isLogged,
      profileController.isAdmin,
      categoryController.updateCategory
    )
    .get(
      profileController.isLogged,

      categoryController.getCategory
    )
    .delete(
      profileController.isLogged,
      profileController.isAdmin,
      categoryController.deleteCategory
    );
  module.exports=router