const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const bcry = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

app.post("/Login", (req, res) => {
  let userCred = req.body;
  userModel
    .findOne({ email: userCred.email })
    .then((user) => {
      if (user != null) {
        bcry.compare(userCred.password, user.password, (err, result) => {
          if (result === true) {
            // generate token and send it back
            jwt.sign({ email: userCred.email }, "akshata", (err, token) => {
              if (!err) {
                res.send({ toke: token });
              } else {
                res.send({
                  message:
                    "something went wrong while creating token please try again",
                });
              }
            });
          } else {
            res.send({ message: "Incorrect password" });
          }
        });
      } else {
        res.send({ message: "Wrong email No user found" });
      }
    })
    .catch((err) => {
      res.send({ message: "Some problem " });
    });
});

app.get("/getdata", verifyToken, (req, res) => {
  res.send({ message: "I am a begineer in coding" });
});

function verifyToken(req, res, next) {
  // let token = req.headers.authorization.split(" ")[1];

  console.log(req.headers);
  // jwt.verify(token, "akshata", (err, data) => {
  //   if (!err) {
  //     console.log(data);
  //     next();
  //   } else {
  //     res.status(401).send({ message: "Invalid Token please login again" });
  //   }
  // });
}

app.listen(8000, () => {
  console.log("server is up and running");
});
