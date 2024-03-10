const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//database connection:
mongoose
  .connect("mongodb://localhost:27017/mongoTutorial")
  .then(() => {
    console.log("database connection is successful!");
  })
  .catch((err) => {
    console.log(err);
  });

//schema for products:
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is manadatory"],
  },
  price: {
    type: Number,
    required: [true, "Price is manadatory"],
    min: 1,
  },
});

// Middleware to extract data from request:
app.use(express.json());

// Middleware  for each end-point
//app.use(middleware);

// app.get(path , functionality)

app.get("/products", (req, res) => {
  console.log("Get request coming");
  res.send({ message: "Get request success" });
});

// Insert the data:
app.post("/products", (req, res) => {
  console.log(req.body);
  res.send({ message: "This is product route" });
});

// No need of this given middleware function:
// using middleware: app.use(express.json());

// express.json(req, res, next);
// {
//   let product = "";
//   req.on("data", (chunk) => {
//     product += chunk;
//   });
//   req.on("end", () => {
//     req.body = JSON.parse(product);
//     next();
//   });
// }

// Delete the data:
app.delete("/products/:id", (req, res) => {
  console.log(req.params.id);
  res.send({ message: "This is product deleted" });
});

//Update the data:
app.put("/products/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  res.send({ message: "Put successful!" });
});

// Get the data:
app.get("/users/:id", (req, res) => {
  console.log(req.params.id);
  res.send({ message: "users details " });
});

app.get("/about", (req, res) => {
  console.log("About us");
  res.send({ message: "About us" });
});

// Middlewares in node js:
app.get("/testing/:id", middleware, (req, res) => {
  console.log("main endpoint");
  res.send({ message: "Testing details " });
});

// Middleware function:
function middleware(req, res, next) {
  if (req.params.id < 10) {
    res.send({ message: "You are blocked" });
  } else {
    next();
  }
}

// start the server:
app.listen(8000, () => {
  console.log("server is running on port 8000");
});
