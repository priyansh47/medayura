const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
cloudinary.config({
  cloud_name: process.env.cloudinary_name,
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_secret_key,
});
const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["png", "jpg", "jpeg"],
  params: {
    folder: "E-commerce",
  },
});
const upload = multer({ storage });
module.exports = upload;
