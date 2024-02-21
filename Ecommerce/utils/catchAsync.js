module.exports=(func)=>{
  return((req,res,next)=>func(req,res,next).then().catch(next))
}