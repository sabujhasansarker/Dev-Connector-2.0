const { check, body } = require("express-validator");

const validator = require("validator");

const customvalidaton = (value) => {
  {
    if (value) {
      if (!validator.isURL(value)) {
        throw new Error("Pleace enter a valid url");
      }
    }
    return true;
  }
};

exports.createProfileValidation = [
  check("status", "Status is requird").exists(),
  check("skills", "Skills is requird").exists(),
  // url chack
  body("website").custom(customvalidaton),
  body("facebook").custom(customvalidaton),
  body("twitter").custom(customvalidaton),
  body("instagram").custom(customvalidaton),
  body("youtube").custom(customvalidaton),
  body("linkedin").custom(customvalidaton),
  // .isURL().withMessage("Invalid Url"),
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
