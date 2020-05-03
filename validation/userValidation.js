const { check } = require("express-validator");

const User = require("../model/User");

exports.registerValidator = [
  // Name validation
  check("firstName", "First Name is required").exists(),
  check("lastName", "Last Name is required").exists(),

  //   E-mail Validation
  check("email", "E-mail is required")
    .exists()
    .bail()
    // ? bail() use like return
    .isEmail()
    .withMessage("Please provide a valid E-mail")
    .custom(async (email) => {
      let user = await User.findOne({ email });
      if (user) {
        return Promise.reject("E-mail already in use");
      }
    })
    .normalizeEmail()
    .trim(),

  // Password
  check("password", "Password is required")
    .exists()
    .bail()
    .isLength({ min: 5, max: 9 })
    .withMessage("Please enter a password with min 5 to max 9 characters")
    .trim(),
];
