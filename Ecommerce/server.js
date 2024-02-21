const http = require("http");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const mongoose  = require("mongoose");

mongoose.connect(process.env.database__address.replace(/\<password\>/,process.env.database__password)).then(cn=>console.log("connected to the database--",cn.connection.host));

const server = http.createServer(app);
server.listen(process.env.port, process.env.host, (err) => {
  console.log(`Server is running on port \x1b[34m${process.env.port}\x1b[0m
`);
});
process.on("uncaughtException",(err)=>{
   console.log(err)
   console.log("\x1b[31mError\x1b[0m\x1b[34m Encountered\x1b[0m");
})
process.on("unhandledRejection",(err)=>{
  console.log(err)
})
console.log("server inside")