
module.exports.userRouteError=function(err,req,res,next){
console.log(err)
const status=err.statusCode||500
const message=err.message||"internal error"
res.status(status).json({
  status:err.status,
  message,
  stackTrace:process.env.NODE_ENV=="development"?err.stack:"error caught in production mode"
})
}
module.exports.productRouteError=function(err,req,res,next){
  
  res.status(500).json(err)

}