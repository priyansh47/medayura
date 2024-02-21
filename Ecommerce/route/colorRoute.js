const express = require("express");
const router = express.Router();
const colorController = require("../controllers/colorController.js");
const profileController = require("../controllers/profileController.js");
router
  .route("/")
  .post(
    profileController.isLogged,
    profileController.isAdmin,
    colorController.addColor
  )
  .get(
    profileController.isLogged,

    colorController.getAllColor
  );
router
  .route("/:id")
  .put(
    profileController.isLogged,
    profileController.isAdmin,
    colorController.updateColor
  )
  .get(
    profileController.isLogged,

    colorController.getColor
  )
  .delete(
    profileController.isLogged,
    profileController.isAdmin,
    colorController.deleteColor
  );
module.exports = router;
