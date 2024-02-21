//connect to mongodb server using mongoose
const mongoose = require("mongoose");
const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/get", getdata);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// Add the following code to serve static files (e.g. HTML, CSS, JS) from the 'public' directory

const dataUser = fs.readFileSync("./data/tours-simple.json", "utf-8");

app.use(express.static("public"));
mongoose
  .connect(
    "mongodb+srv://yamamotoyuki007:momo9080@cluster0.lb9yzhz.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((cn) => {
    console.log(`connecte to the host ${cn.connection.host}`);
  });
const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
   
      // validate: [validator.isAlpha, 'Tour name must only contain characters']
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration']
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size']
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult'
      }
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
   
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price']
    }
},{
toJSON:{
  virtuals:true
}
});
const userModel = mongoose.model("user1", schema);



async function getdata(req, res, next) {
  const data = await userModel.find({});
  res.send(data);
}
schema.virtual('durationIin hours').get(function(){
  return this.duration*60
})