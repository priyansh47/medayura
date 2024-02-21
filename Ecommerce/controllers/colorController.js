const color = require("../model/color.js");
const catchAsync = require("../utils/catchAsync.js");
module.exports.addColor = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  let colorC = await color.create({ name, user: req.userAuthId });
  res.status(201).json({
    status: "success",
    length: 1,
    data: {
      colorC,
    },
  });
});
module.exports.getAllColor = catchAsync(async (req, res, next) => {
  const data = await brand.find();
  res.status(200).json({
    status: "success",
    length: data.length,
    data: {
      categories: colorC,
    },
  });
});

module.exports.getColor = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const data = await brand.findById(id);
  res.status(200).json({
    status: "success",
    length: data.length,
    data: {
      color: data,
    },
  });
});
module.exports.deleteColor = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const data = await color.findByIdAndDelete(id);
  res.status(200).json({
    status: "success",
    length: data.length,
    data: {
      Color: data,
    },
  });
});

module.exports.updateColor = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const { name, products } = req.body;
  const colorC = await brand.findByIdAndUpdate(
    id,
    { name, products },
    { new: true }
  );
  res.status(201).json({
    status: "success",
    length: 1,
    data: {
      color: colorC,
    },
  });
});
