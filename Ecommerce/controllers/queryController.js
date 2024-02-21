const router=require("express").Router()
//引入模型
module.exports=function(req,res,next){
  const includeFields=['page','sort','limit','fields','name']
const {name,brand,price,category,page,sort,limit,fields}=req.query
req.reqQuery={name,brand,price,category,sort,limit,fields}
Object.keys(req.reqQuery).forEach(el=>{if(!req.reqQuery[el]){
  delete req.reqQuery[el]
}})
console.log(req.reqQuery)
  return next()

}