const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../model/User");

// Register user

exports.registerUserController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // if not errors
  let { firstName, lastName, email, password } = req.body;
  try {
    let username =
      (firstName + "_" + lastName).toLowerCase() +
      Math.floor(Math.random() * 10000);

    // if username exits
    const user = await User.findOne({ username });
    if (user === username) {
      username =
        (firstName + "_" + lastName).toLowerCase() +
        Math.floor(Math.random() * 10000);
    }

    // hash password
    password = bcrypt.hashSync(password, 10);

    const newUser = new User({
      name: firstName + " " + lastName,
      username,
      email,
      password,
    });

    // save data
    await newUser.save();

    // Json Web token
    jwt.sign(
      { user: { id: newUser.id, username: newUser.username } },
      config.get("jwtwebtoken"),
      {
        expiresIn: "1h",
      },
      (err, usertoken) => {
        if (!err) {
          res.status(201).json({ usertoken });
        }
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};
exports.loginUserController = (req, res) => {
  res.send("user ");
};
