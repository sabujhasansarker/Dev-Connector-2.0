const { validationResult } = require("express-validator");
const gravatar = require("gravatar");

const { validationErrors, serverError } = require("../utils/errors");
const Profile = require("../model/Profile");
const User = require("../model/User");

// get cuttent user profile

exports.getCurrentProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["username", "firstName", "lastName", "email"]);
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
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Profile pic change
    profilePic = profilePic
      ? profilePic
      : gravatar.url(user.email, { s: "200", r: "pg", d: "mm" });
    profileFileds.profilePic = profilePic;

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
    res.status(200).json({ profile });

    // update user

    await User.findByIdAndUpdate(
      req.user.id,
      { $set: { profilePic, profile: profile._id } },
      { new: true }
    );
  } catch (err) {
    serverError(res, err);
  }
};

// Delete Profile
exports.deleteProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }
    await Profile.findByIdAndDelete(profile._id);

    // update user

    // Profile pic change
    let profilePic = gravatar.url(user.email, { s: "200", r: "pg", d: "mm" });

    await User.findByIdAndUpdate(
      req.user.id,
      { $set: { profilePic, profile: null } },
      { new: true }
    );
    res.status(200).json({ msg: "Delete Profile" });
  } catch (err) {
    serverError(res, err);
  }
};

// Add education
exports.addeducation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return validationErrors(res, errors);
  }
  const { school, degree, from, to, current, location, description } = req.body;

  const newEdu = {
    school,
    degree,
    location,
    from,
    to,
    current,
    description,
  };

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }
    profile.education.unshift(newEdu);
    await profile.save();
    res.status(200).json({ profile });
  } catch (err) {
    serverError(res, err);
  }
};

// Add experience
exports.addexperience = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return validationErrors(res, errors);
  }
  const { title, compnay, from, to, current, description } = req.body;

  const newExp = {
    title,
    compnay,
    from,
    to,
    current,
    description,
  };

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }
    profile.experience.unshift(newExp);
    await profile.save();
    res.status(200).json({ profile });
  } catch (err) {
    serverError(res, err);
  }
};
