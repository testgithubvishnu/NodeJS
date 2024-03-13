const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const bcry = require("bcryptjs");
const JWT = require("jsonwebtoken");
// database connection:
mongoose
  .connect("mongodb://127.0.0.1:27017/authenticate")
  .then(() => {
    console.log("Connected to Mongodb server");
  })
  .catch((err) => {
    console.log(err);
  });

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
  },
  { timestamps: true }
);

// Model for user
const userModel = mongoose.model("users", userSchema);

// endpoints:

app.post("/register", (req, res) => {
  let user = req.body;
  bcry.genSalt(10, (err, salt) => {
    if (!err) {
      bcry.hash(user.password, salt, (err, hpass) => {
        if (!err) {
          user.password = hpass;
          console.log(hpass);

          userModel
            .create(user)
            .then((doc) => {
              res.send({ message: "User is created successfully" });
            })
            .catch((err) => {
              console.log(err);
              res.send({ message: "problem with creating user" });
            });
        }
      });
    }
  });
});

app.post("/Login", verifyToken, (req, res) => {
  let userCred = req.body;
  userModel
    .findOne({ email: userCred.email })
    .then((user) => {
      if (user != null) {
        bcry.compare(userCred.password, user.password, (err, result) => {
          if (result == true) {
            // generate token and send it back
            JWT.sign({ email: userCred.email }, "akshata", (err, token) => {
              if (!err) {
                res.send({ token: token });
              } else {
                res.send({
                  message:
                    "something went wrong while creating token please try again",
                });
              }
            });

            res.send({ message: "Logged in successfully" });
          } else {
            res.send({ message: "Incorrect password" });
          }
        });
      } else {
        res.send({ message: "Wrong email" });
      }
    })
    .catch((err) => {
      res.send({ message: "Some problem " });
    });
});

function verifyToken(req, res, next) {
  console.log(req.header.authorization);
}

app.listen(8000, () => {
  console.log("server is up and running");
});
