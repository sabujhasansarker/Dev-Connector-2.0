const { validationResult } = require("express-validator");

const { validationErrors, serverError } = require("../utils/errors");
const Profile = require("../model/Profile");
const User = require("../model/User");

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

  // if errors not found

  let {
    status,
    skills,
    bio,
    compnay,
    website,
    githubusername,
    profilePic,
    address,
  } = req.body;

  // Set profile filefileds
  const profileFileds = {};
  profileFileds.user = req.user.id;

  if (status) profileFileds.status = status;
  if (bio) profileFileds.bio = bio;
  if (compnay) profileFileds.compnay = compnay;
  if (website) profileFileds.website = website;
  if (githubusername) profileFileds.githubusername = githubusername;
  if (address) profileFileds.address = address;

  skills = skills.split(",").map((skill) => skill.trim());
  if (skills) profileFileds.skills = skills;

  try {
    // update user if profilePic
    if (profilePic) {
      let user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: { profilePic } },
        { new: true }
      );
      profileFileds.profilePic = user.profilePic;
    }

    // Profile update

    let profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      // Create Profile
      profile = new Profile(profileFileds);
      profile.save();
      return res.status(200).json({ profile });
    }

    // Update Profile
    profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFileds },
      { new: true }
    );
    return res.status(200).json({ profile });
  } catch (err) {
    serverError(res, err);
  }
};
