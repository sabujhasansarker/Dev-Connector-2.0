const { validationResult } = require("express-validator");

const { validationErrors, serverError } = require("../utils/errors");
const Profile = require("../model/Profile");

// get cuttent user profile

exports.getCurrentProfile = async (req, res) => {
  const profile = await Profile.findOne({ user: req.user.id }).populate(
    "user",
    ["name", "username", "email", "profilePic"]
  );
  try {
    if (!profile) {
      res.status(400).json({ errors: { msg: "Profile dose not found" } });
    }
    res.json(profile);
  } catch (err) {
    serverError(res, err);
  }
};

// post create profile
exports.createProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return validationErrors(res, errors);
  }
  //   errors dose not exits

  let {
    skills,
    bio,
    status,
    address,
    company,
    website,
    githubusername,
  } = req.body;

  skills = skills.split(",").map((skill) => skill.trim());

  let profileFields = {};

  profileFields.user = req.user.id;

  try {
  } catch (err) {
    serverError(res, err);
  }
};
