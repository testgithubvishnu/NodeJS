const mongoose = require("mongoose");

//connection to mongo server
mongoose
  .connect("mongodb://127.0.0.1:27017/apidev-demo")
  .then(() => console.log("Connection Successfull"))
  .catch((err) => console.log(err));

// schema: structure of how the data/document will look like

// Previous schema:
// const userSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
// });

// Validating schema:
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Manadatory"], // custom massage
  },
  password: {
    type: String,
    maxLength: [12, "maximum is 12"],
    minLength: [5, "minimum is 5"],
  },
  age: {
    type: Number,
    min: [10, "minimum age is 10"],
    max: 100,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "manager", "customer"], // collection of constant
    required: true,
  },
});

// model: collection of schema
// no. of collections = no. of schemas = no.of model
const userModel = mongoose.model("users", userSchema);

// Inserting data:
let user = {
  name: "Aman gupta",
  age: 42,
  password: "gupta",
  role: "admin",
};

userModel
  .create(user)
  .then((data) => {
    console.log("Data inserted");
  })
  .catch((err) => {
    console.log(err);
  });
