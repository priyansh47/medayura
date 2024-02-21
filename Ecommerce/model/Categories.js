const mongoose=require("mongoose")
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    img: {
      type: String,
      required: true,
      default: process.env.img__address,
    },
    products: {
      type: [mongoose.Types.ObjectId],
      ref: "products",
    },
  },
  { timestamps: true }
);
module.exports=mongoose.model("category",categorySchema)