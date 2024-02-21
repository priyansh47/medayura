const mongoose=require('mongoose');
const categories=require('./Categories.js')
const brandModel=require('./Brand.js')
const productSchema=new mongoose.Schema({
  name:{type:String,
    unique:true,
  require:true},
  description:{
    type:String,required:true
  }
  ,
  brand:{
    type:String,
    required:true
  },
  category:{
    type:String,
    ref:"category",
    required:true
  },
  sizes:{
    type:[String],
    enum:["S","M","L","XXl"],
    required:true
  },
  colors:{
    type:[String],
    required:true
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"user"
  },
  

    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],

    price: {
      type: Number,
      required: true,
    },

    totalQty: {
      type: Number,
      required: true,
      default:0,
    },
    totalSold: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)
productSchema.virtual("qtyLeft").get(function () {
  const product = this;
  return product.totalQty - product.totalSold;
});
//Total rating
productSchema.virtual("totalReviews").get(function () {
  const product = this;
  return product?.reviews?.length;
});
//average Rating
productSchema.virtual("averageRating").get(function () {
  let ratingsTotal = 0;
  const product = this;
  product?.reviews?.forEach((review) => {
    ratingsTotal += review?.rating;
  });
  //calc average rating
  const averageRating = Number(ratingsTotal / product?.reviews?.length).toFixed(
    1
  );
  return averageRating;
});
productSchema.pre('save',async function(next){
const cat=await categories.findOne({name:this.category})
cat.products.push(this._id)
await categories.create(cat)
let brand = await brandModel.find({ name: this.brand });
brand=brand[0]
if (!brand.length) {
  brand = await brandModel.create({ name: this.brand ,user:this.user});
}
brand.products.push(this._id);
brand.user=this.user
 brand.save();
console.log("executed");
next()
})


module.exports = mongoose.model("Product", productSchema);