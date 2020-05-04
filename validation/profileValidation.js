const { check, validator } = require("express-validator");
// const validator = require("validator");

exports.createProfileValidation = [
  check("status", "Status is requird").exists(),
  check("skills", "Skills is requird").exists(),
  check("website").optional().isURL().withMessage("Invalid Url"),
];
