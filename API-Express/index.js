const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// app.get(path , functionality)

app.get("/products", (req, res) => {
  console.log("Get request coming");
  res.send({ message: "Get request success" });
});

app.get("/users/:id", (req, res) => {
  console.log(req.params.id);
  res.send({ message: "users details " });
});

app.get("/about", (req, res) => {
  console.log("About us");
  res.send({ message: "About us" });
});

app.get("/testing/:id", middleware, (req, res) => {
  console.log("main endpoint");
  res.send({ message: "Testing details " });
});

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
