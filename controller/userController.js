const { validationResult } = require("express-validator");

const User = require("../model/User");

exports.registerUserController = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  res.json(req.body);
};
exports.loginUserController = (req, res) => {
  res.send("user ");
};
