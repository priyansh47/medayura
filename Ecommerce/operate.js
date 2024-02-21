const server = require("./server.js");
const mongoose = require("mongoose");
const fs = require("fs");
const product=require('./model/Product.js')
const usero = mongoose.model("user1",new mongoose.Schema({},{strict:false}))
const data = fs.readFileSync("./product.json", "utf-8");
const exporting = async () => {
  let arr = JSON.parse(data);
  const d= await product.create(arr);
  console.log(d)
};
const getAllData = async () => {
  console.log(await product.find());
};
const deleteAll = async () => {
  console.log(await product.deleteMany({}));
};
async function operate() {
  const variable = process.argv;
  console.log(variable);
  if (variable[2] == "--export") {
   await exporting();
    console.log("done exporting");
  }
  if (variable[2] == "--delete") {
    await deleteAll();
    console.log("done deleting");
  }
  if (variable[2] == "--get") {
    await getAllData();
    console.log("done getting all data");
  }
  console.log("done performing");
  await importing()
  process.exit(0);
}
process.on("uncaughtException", (err) => {
  console.log(
    "\x1b[35m%s\x1b[0m",
    "--------------------------------------------Error------------------------------------"
  );

  console.error(`Error:${err}`);
  console.log("//error//");
  process.exit(0);
});
operate();
async function importing(){
const variable = process.argv;
if(variable[2]=="--import")
{const products=await product.find()

  const data=fs.writeFileSync('./product.json',JSON.stringify(products),'utf-8')
  console.log("done writing")
}
}
