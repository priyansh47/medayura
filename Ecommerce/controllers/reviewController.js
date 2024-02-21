const catchAsync = require("../utils/catchAsync.js");
const products = require("../model/Product.js");
const reviewModel = require("../model/Review.js");
const appError = require("../utils/appError.js");
const { findByIdAndDelete } = require("../model/Categories.js");
module.exports.addReview = catchAsync(async (req, res, next) => {
  const product_id = req.params.id;
  const review = await reviewOfUser(req.userAuthId,req.params.id);
  if (review)
    return next(
      new appError("review exist u want to be rather modify the review", 401)
    );

  const { message,rating } = req.body;
  console.log("executing")
  const reviewObj = await reviewModel.create({
    message,
    rating,
    user: req.userAuthId,
    product: req.params.id,
  });

  const product=await products.findById(req.params.id)
  product.reviews.push(reviewObj._id)

  await products.findByIdAndUpdate(product_id,product,{new:true})
  res.status(201).json({
    status: "success",
    length: 1,
    data: {
      review: reviewObj,
    },
  });
});

module.exports.updateReview = catchAsync(async (req, res, next) => {
  const review = await reviewOfUser(req.params.id, req, userAuthId);
  if (!review) {
    return next(new appError("No access to update this review"), 401);
  }
  const { message } = req.body;
  const reviewObj = await reviewModel.findByIdAndUpdate(
    review._id,
    req.body,
    { new: true }
  );
  res.status(201).json({
    status: "success",
    length: 1,
    data: { review: reviewObj },
  });
});

module.exports.getUserReview = async function (req, res, next) {
  req.userReviews = await reviewsModel.find({ user: req.params.id });
  next();
};

module.exports.getAllReview = catchAsync(async function (req, res, next) {
  const reviews = await reviewModel.find({});
  res.status(200).json({
    status: "success",
    length: reviews.length,
    data: {
      reviews,
    },
  });
});
module.exports.deleteReview = catchAsync(async (req, res, next) => {
  const review = await reviewModel.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "deleted",
    length: 1,
    data: {
      review,
    },
  });
});
module.exports.getReview = catchAsync(async (req, res, next) => {
  const review = await reviewModel.findById(req.params.id);
  res.status(200).json({
    status: "fetched",
    length: 1,
    data: {
      review,
    },
  });
});
async function reviewOfUser(userAuthId, prod_id) {
  let reviews=  products.findById(prod_id)
  reviews=reviews.populate("reviews")
  reviews=await reviews
  reviews= reviews.reviews.find((review) => review.user == userAuthId);
  return reviews
}
