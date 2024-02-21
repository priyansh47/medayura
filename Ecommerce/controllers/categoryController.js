const categories=require("../model/Categories.js")
const catchAsync=require("../utils/catchAsync.js")
module.exports.addCategory=catchAsync(async(req,res,next)=>{
  const {name}=req.body
  let category =await categories.create({name,user:req.userAuthId});
  res.status(201).json({
    status:"success",
    length:1,
    data:{
      category
    }
  })
})
module.exports.getAllcategories=catchAsync(async (req,res,next)=>{
  const data=await categories.find()
  res.status(200).json({
    status:'success',
    length:data.length,
    data:{
      categories:data
    }
  })
})

module.exports.getCategory=catchAsync(async(req,res,next)=>{
  const id=req.params.id;
  const data=await categories.findById(id)
  res.status(200).json({
    status: "success",
    length: data.length,
    data: {
      categories: data,
    },
  });
})
module.exports.deleteCategory=catchAsync(async(req,res,next)=>{
   const id = req.params.id;
   const data = await categories.findByIdAndDelete(id);
   res.status(200).json({
     status: "success",
     length: data.length,
     data: {
       categories: data,
     },
   });
})

module.exports.updateCategory=catchAsync(async(req,res,next)=>{
  const id = req.params.id;
  const {name,image,products} = req.body;
  const category = await categories.findByIdAndUpdate(id,{name,image,products},{new:true});
})