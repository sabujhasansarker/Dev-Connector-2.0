const { check, validator } = require("express-validator");

exports.createProfileValidation = [
  check("status", "Status is requird").exists(),
  check("skills", "Skills is requird").exists(),
  check("website").optional().isURL().withMessage("Invalid Url"),
];

// educaion validaton
exports.educationValidator = [
  check("school", "School is requird").exists(),
  check("degree", "Degree is requird").exists(),
  check("from", "From is required").exists(),
  check("fieldofstudy", "Field of study is required").exists(),
];

// experience validaton
exports.experienceValidator = [
  check("title", "title is requird").exists(),
  check("company", "company is requird").exists(),
  check("from", "From is required").exists(),
];
