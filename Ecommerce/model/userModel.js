const mongoose = require("mongoose");
const encryptPassword = require("../utils/encryptPassword.js");
const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
  },
  postal_code: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  orders: [
    {
      type: mongoose.Types.ObjectId,
      ref: "order",
    },
  ],
  wishlist: [{ type: mongoose.Schema.ObjectId, ref: "wishlist" }],
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: () => new Date().toISOString(),
    mutable: false,
  },
  address: addressSchema,
});

userSchema.pre("save", encryptPassword);
const user = mongoose.model("users", userSchema);
module.exports = user;
