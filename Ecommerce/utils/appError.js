class appError extends Error{
  constructor(message,statusCode){
    super(message)
    this.statusCode=statusCode||500
    this.status="fail"
    this.isOperational=true
    Error.captureStackTrace(this,this.constructor)
  }
}
module.exports=appError