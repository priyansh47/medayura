const brand = require("../model/Brand.js");
const catchAsync = require("../utils/catchAsync.js");
module.exports.addBrand = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  let brandC = await brand.create({ name, user: req.userAuthId });
  res.status(201).json({
    status: "success",
    length: 1,
    data: {
      brandC,
    },
  });
});
module.exports.getAllBrand = catchAsync(async (req, res, next) => {
  const data = await brand.find();
  res.status(200).json({
    status: "success",
    length: data.length,
    data: {
      categories: brandC,
    },
  });
});

module.exports.getBrand = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const data = await brand.findById(id);
  res.status(200).json({
    status: "success",
    length: data.length,
    data: {
      Brand: data,
    },
  });
});
module.exports.deleteBrand = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const data = await brand.findByIdAndDelete(id);
  res.status(200).json({
    status: "success",
    length: data.length,
    data: {
      Brand: data,
    },
  });
});

module.exports.updateBrand = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const { name, products } = req.body;
  const brandC = await brand.findByIdAndUpdate(
    id,
    { name, products },
    { new: true }
  );
  res.status(201).json({
    status: "success",
    length:1,
    data:{
      brand:bandC
    }
})});
