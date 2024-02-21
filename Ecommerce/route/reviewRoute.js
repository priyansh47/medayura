const reviewController=require("../controllers/reviewController.js")
const profileController=require('../controllers/profileController.js')
const express=require("express")
const router=express.Router()
router
  .route("/:id")
  .post(profileController.isLogged, reviewController.addReview)
  .put(profileController.isLogged, reviewController.updateReview)
  .delete(
    profileController.isLogged,
    profileController.isAdmin,
    reviewController.deleteReview
  )
  .get(
    profileController.isLogged,
    profileController.isAdmin,
    reviewController.getReview
  );
router.route('/').get(profileController.isLogged,profileController.isAdmin,reviewController.getAllReview)
// router.use((err,req,res,next)=>{
//   err.statusCode=err.statusCode||500
//   res.status(err.statusCode).json(err)
// })
module.exports=router