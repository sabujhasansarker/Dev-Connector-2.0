const { check } = require("express-validator");

exports.createProfileValidation = [
  check("status", "Status is requird").exists(),
  check("skills", "Skills is requird").exists(),
];
