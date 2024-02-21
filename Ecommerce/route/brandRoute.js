const express = require("express");
const router = express.Router();
const brandController = require("../controllers/brandController.js");
const profileController = require("../controllers/profileController.js");
router
  .route("/")
  .post(
    profileController.isLogged,
    profileController.isAdmin,
    brandController.addBrand
  )
  .get(
    profileController.isLogged,

    brandController.getAllBrand
  );
router
  .route("/:id")
  .put(
    profileController.isLogged,
    profileController.isAdmin,
    brandController.updateBrand
  )
  .get(
    profileController.isLogged,

    brandController.getBrand
  )
  .delete(
    profileController.isLogged,
    profileController.isAdmin,
    brandController.deleteBrand
  );
module.exports = router;
