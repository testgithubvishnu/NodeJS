const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Middleware to extract data from request:
app.use(express.json());

// Middleware  for each end-point
//app.use(middleware);

// app.get(path , functionality)

app.get("/products", (req, res) => {
  console.log("Get request coming");
  res.send({ message: "Get request success" });
});
app.post("/products", (req, res) => {
  console.log(req.body);
  res.send({ message: "This is product route" });
});

// No need of this given middleware function:
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
