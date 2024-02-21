const userModel=require('../model/userModel.js')
module.exports=async function(user){
 
  console.log("hhhhhhhhhhhhhhhhhhhhhhhhh",user.email)
  const userFromDatabase= await userModel.find({email:user.email}).select("+password")
  
  return userFromDatabase.length?userFromDatabase[0]:undefined
  
}