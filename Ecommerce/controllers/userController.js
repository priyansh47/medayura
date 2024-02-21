const userModel = require("../model/userModel.js");
const appError = require("../utils/appError.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const encryptPassword = require("../utils/encryptPassword.js");
const userExists = require("../utils/userExists.js");
const catchAsync = require("../utils/catchAsync.js");
const registerUserCtrl = catchAsync(async (req, res, next) => {
  const { name, fullname, email, password } = req.body;
  //if user exist
  console.log("password----------" + password);
  if (await userExists({ name, fullname, email, password })) {
    throw new appError("user exists login to server", 400);
  }

  //then create the user
  const user = await userModel.create({ name, fullname, email, password });
  res.status(201).json({
    status: "successfull",
    length: 1,
    data: {user},
  });
});
const loginUserCtrl = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!(await userExists({ email })))
  throw new appError("user with email does not exist", 400);
  
  ;
  const {password:hashedPassword,_id,isAdmin} = (await userExists({ email }));
 
  const isAuthenticated = await bcrypt.compare(password, hashedPassword);
  if (!isAuthenticated)
    throw new appError("user is not valid first register yourself", 401);

  const token = jwt.sign(
    {_id, email, isAdmin,createdAt: (() => new Date().toISOString())() },
    process.env.secret_key,
    { expiresIn: '30d' }
  );
  res.status(200).json({
    status: "done login",
    length: 1,
    data: { token },
  });
});
 module.exports.getUserCtrl=async(req,res,next)=>{
res.send("verified successfully")
}
module.exports.registerUserCtrl = registerUserCtrl;
module.exports.loginUserCtrl = loginUserCtrl;
