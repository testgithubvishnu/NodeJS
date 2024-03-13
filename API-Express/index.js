const express = require("express");
const app = express();
const mongoose = require("mongoose");
//const bodyParser = require("body-parser");

// Middleware to extract data from request:
app.use(express.json());

// Middleware  for each end-point
//app.use(middleware);

// app.get(path , functionality)

//database connection:
mongoose
  .connect("mongodb://127.0.0.1:27017/mongoTutorial")
  .then(() => {
    console.log("database connection is successful!");
  })
  .catch((err) => {
    console.log(err);
  });

// Coding related to user:
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is manadatory"],
    },
    email: {
      type: String,
      required: [true, "Email is manadatory"],
    },

    password: {
      type: String,
      required: [true, "Password is manadatory"],
    },
  },
  { timestamps: true }
);

//Model creation:
const userModel = mongoose.model("users", userSchema);

// endpoint to create new user:
app.post("/users", (req, res) => {
  console.log(req.body);
  let user = req.body;
  userModel
    .create(user)
    .then((document) => {
      res.send({ data: document, message: "User created successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: "Some Problem occured" });
    });
});
//==================================

// Coding related to products:
//schema for products:
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is manadatory"],
    },
    price: {
      type: Number,
      required: [true, "Price is manadatory"],
      min: [1],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is manadatory"],
    },
    category: {
      type: String,
      enum: ["electronics", "fashion", "grocery"],
    },
  },
  { timestamps: true }
);

//Model creation:
const productModel = mongoose.model("products", productSchema);

// PERFORMING CRUD OPERATIONS USING EXPRESS AND MOONGOSE:
// To get all products:
app.get("/products", (req, res) => {
  productModel
    .find()
    .then((products) => {
      res.send(products);
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: "Some Problem occured" });
    });
});

// To get single product:
// Get the data:
app.get("/products/:id", (req, res) => {
  productModel
    .findOne({ _id: req.params.id })
    .then((product) => {
      res.send(product);
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: "Some Problem occured" });
    });
});

//end-point to create new product:
// Insert the data:
app.post("/products", (req, res) => {
  console.log(req.body);
  let product = req.body;
  productModel
    .create(product)
    .then((document) => {
      res.send({ data: document, message: "Product created successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: "Some Problem occured" });
    });
});

// Delete the data:
app.delete("/products/:id", (req, res) => {
  productModel
    .deleteOne({ _id: req.params.id })
    .then((info) => {
      res.send({ message: "product deleted successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: "Some Problem occured" });
    });
});

//Update the data:
app.put("/products/:id", (req, res) => {
  let product = req.body;
  productModel
    .updateOne({ _id: req.params.id }, product)
    .then((info) => {
      res.send({ message: "product updated successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: "Some Problem occured" });
    });
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

// Old Method:
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

// New Method:
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
