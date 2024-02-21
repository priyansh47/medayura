const bcrypt=require("bcrypt")
module.exports= async function encryptPassword(next){
  console.log(this.password)
  this.password=await bcrypt.hash(this.password,12)
  next()
}