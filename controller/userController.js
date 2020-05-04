const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const gravatar = require("gravatar");

const User = require("../model/User");
const Profile = require("../model/Profile");
const { serverError, validationErrors } = require("../utils/errors");

// Register user

exports.registerUserController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return validationErrors(res, errors);
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
      firstName,
      lastName,
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

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    await User.findByIdAndDelete(req.user.id);
    await Profile.findOneAndRemove({ user: req.user.id });
    res.status(200).json({ msg: "Delete User" });
  } catch (err) {
    serverError(res, err);
  }
};

// edit user
exports.updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return validationErrors(res, errors);
  }

  let {
    firstName,
    lastName,
    email,
    password,
    oldPassword,
    username,
  } = req.body;
  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // if old password match
    const matchPassword = bcrypt.compareSync(oldPassword, user.password);
    if (!matchPassword) {
      return res
        .status(400)
        .json({ errors: { msg: "Current Password dose not match" } });
    } else {
      if (email !== user.email) {
        let eUser = await User.findOne({ email });
        if (eUser) {
          return res
            .status(400)
            .json({ errors: { msg: "Email already used" } });
        }
      }
      if (username && username !== user.username) {
        let usernameUser = await User.findOne({ username });
        if (usernameUser) {
          return res.status(400).json({ errors: { msg: "user already used" } });
        }
      }

      firstName = firstName ? firstName : user.firstName;
      lastName = lastName ? lastName : user.lastName;
      email = email ? email : user.email;
      username = username ? username : user.username;
      password = password
        ? await bcrypt.hashSync(password, 10)
        : bcrypt.hashSync(oldPassword, 10);
      await User.findByIdAndUpdate(
        req.user.id,
        {
          $set: { firstName, lastName, email, username, password },
        },
        { new: true }
      );
      res.json({ user });
    }
  } catch (err) {
    serverError(res, err);
  }
};
