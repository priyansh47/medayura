const { rmSync } = require("fs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const userModel=require("../model/userModel.js")
const appError = require("../utils/appError");
module.exports.isLogged = async function (req, res, next) {
  let auth_key = req.headers.authentication;
  if (!auth_key) return next(new appError("no authorization found ", 401));

  const isValid = await promisify(
    jwt.verify
  )(auth_key,process.env.secret_key).catch(next)
  if (isValid) {
    
req.userAuthId=isValid._id;
req.admin=isValid.isAdmin||false

    
    return next();}
  return next(new appError("invalid authorization found ", 403));
};
module.exports.isAdmin=function(req,res,next){
  if(!req.admin)
  throw next(new appError("only admin is allowed to perform this operation ", 403));
  next()
}