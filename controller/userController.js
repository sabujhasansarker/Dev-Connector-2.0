const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const gravatar = require("gravatar");

const User = require("../model/User");
const { serverError, expValidation } = require("../utils/errors");

// Register user

exports.registerUserController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return expValidation(res, errors);
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

    // add gravetar image
    const profilePic = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

    // create profile
    const newUser = new User({
      name: firstName + " " + lastName,
      username,
      profilePic,
      email,
      password,
    });

    // save data
    await newUser.save();

    // Json Web token
    jwt.sign(
      { user: { id: newUser.id, username: newUser.username } },
      config.get("jsonwebtoken"),
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
    serverError(res, err);
  }
};
exports.loginUserController = (req, res) => {
  res.send("user ");
};

// Login user

exports.loginUserController = async (req, res) => {
  const { email, username, password } = req.body;

  // find user with username and email
  const userFindByEmail = await User.findOne({ email });
  const userFindByUsername = await User.findOne({ username });
  const user = userFindByUsername || userFindByEmail;
  try {
    // Chack user
    if (!user) {
      return res.status(400).json({ errors: { msg: "Sorry, user not found" } });
    }

    // Match password
    const matchPassword = bcrypt.compareSync(password, user.password);
    if (!matchPassword) {
      return res
        .status(400)
        .json({ errors: { msg: "Sorry, password dose not match" } });
    }

    // sign in token
    jwt.sign(
      { user: { id: user.id, username: user.username } },
      config.get("jsonwebtoken"),
      { expiresIn: "1h" },
      (err, usertoken) => {
        if (!err) {
          res.json({ usertoken });
        }
      }
    );
  } catch (err) {
    serverError(res, err);
  }
};
