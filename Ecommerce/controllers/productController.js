const catchAsync = require("../utils/catchAsync.js");
const features=require("../utils/APIFeatures.js")
const product = require("../model/Product.js");
const addProduct = catchAsync(async function (req, res, next) {
  const {
    name,
    description,
    category,
    sizes,
    colors,
    user,
    price,
    totalQty,
    brand,
  } = req.body;
 
  const data = await product.create({
    name,
    description,
    category,
    sizes,
    colors,
    user: req.userAuthId,
    price,
    totalQty,
    brand,
  });

  res.status(201).json({
    status:"ok",length:1,data:{
      data
    }
  });
  req.product_id=data._id.toString()

});

const getAllproduct = catchAsync(async function (req, res, next) {
  
 let products=(new features(product.find(),req.reqQuery)).filter().sort().selectFields().paginate()
  products = await products.query;
  res.status(200).json({
    status: "ok",
    length: products.length,
    data: { products },
  });
});
const getProduct=catchAsync(async(req,res,next)=>{
const id=req.params.id
const item=await product.findById(id)
res.status(200).json({
  status:"ok",
  data:{
    product:item
  }
})
})
module.exports = { getAllproduct, addProduct ,getProduct};
module.exports.updateProduct=catchAsync(async (req,res,next)=>{
  const item=await product.findByIdAndUpdate(req.params.id,req.body,{new:true})
  res.status(201).json({status:"ok",length:1,data:{
    data:item
  }})
})

module.exports.updateProduct = async function (products) {
  for (const prod of products) {
    try {
      const item = await product.findById(prod.product_id);
      item.totalQty -= prod.quantity;
      item.totalSold += prod.quantity;
      const result = await product.findByIdAndUpdate(
        item._id.toString(),
        {
          totalQty: item.totalQty,
          totalSold: item.totalSold,
        },
        { new: true }
      );
      console.log(result);
    } catch (error) {
      console.error(
        `Error updating product ${prod.product_id}: ${error.message}`
      );
    }
  }
};