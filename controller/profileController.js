const { validationResult } = require("express-validator");
const gravatar = require("gravatar");
const config = require("config");
const request = require("request");

const { validationErrors, serverError } = require("../utils/errors");
const Profile = require("../model/Profile");
const User = require("../model/User");

// * PROFILE

// get cuttent user profile

exports.getCurrentProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["username", "firstName", "lastName", "email"]);
    if (!profile) {
      return res
        .status(400)
        .json({ errors: { msg: "Profile dose not found" } });
    }
    res.json(profile);
  } catch (err) {
    serverError(res, err);
  }
};

// get all profile
exports.getAllProfiles = async (req, res) => {
  try {
    const profile = await Profile.find();
    res.json(profile);
  } catch (err) {
    serverError(err);
  }
};

// get Single Profile By Username

exports.getSingleProfileByUsername = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      username: req.params.username,
    }).populate("user", ["firstName", "lastName", "email"]);

    if (!profile) {
      return res
        .status(400)
        .json({ errors: { msg: "Profile dose not found" } });
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
    company,
    birthday,
    website,
    githubusername,
    profilePic,
    address,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
  } = req.body;

  // Set profile filefileds
  const profileFileds = {};
  profileFileds.user = req.user.id;

  if (status) profileFileds.status = status;
  if (bio) profileFileds.bio = bio;
  // if (website) profileFileds.website = website;
  if (company) profileFileds.company = company;
  if (birthday) profileFileds.birthday = birthday;
  if (githubusername) profileFileds.githubusername = githubusername;
  if (address) profileFileds.address = address;

  skills = skills.split(",").map((skill) => skill.trim());
  if (skills) profileFileds.skills = skills;

  // Build social object
  profileFileds.social = {};
  if (youtube) profileFileds.social.youtube = youtube;
  if (facebook) profileFileds.social.facebook = facebook;
  if (twitter) profileFileds.social.twitter = twitter;
  if (linkedin) profileFileds.social.linkedin = linkedin;
  if (instagram) profileFileds.social.instagram = instagram;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    profileFileds.website = website === "" ? null : website;

    profileFileds.username = user.username;

    // Profile update
    let profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      profileFileds.profilePic = profilePic
        ? profilePic
        : gravatar.url(user.email, { s: "200", r: "pg", d: "mm" });

      // Create Profile
      profile = new Profile(profileFileds);
      await profile.save();
      profile = await Profile.findOne({
        user: req.user.id,
      }).populate("user", ["firstName", "lastName", "email"]);

      await User.findByIdAndUpdate(
        req.user.id,
        { $set: { profile: profile._id } },
        { new: true }
      );
      return res.status(200).json(profile);
    }

    profileFileds.profilePic = profilePic ? profilePic : profile.profilePic;

    // Update Profile
    await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFileds },
      { new: true }
    );
    profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["firstName", "lastName", "email"]);

    res.status(200).json(profile);

    // update user

    await User.findByIdAndUpdate(
      req.user.id,
      { $set: { profilePic: profileFileds.profilePic, profile: profile._id } },
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

// * EDUCATION

// Add education
exports.addeducation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return validationErrors(res, errors);
  }
  const {
    school,
    degree,
    from,
    to,
    current,
    location,
    description,
    fieldofstudy,
  } = req.body;

  const newEdu = {
    school,
    degree,
    fieldofstudy,
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
    res.status(200).json(profile);
  } catch (err) {
    serverError(res, err);
  }
};

// Edit Education

exports.editEducation = async (req, res) => {
  const {
    school,
    degree,
    from,
    to,
    current,
    location,
    description,
    fieldofstudy,
  } = req.body;

  let profile = await Profile.findOne({ user: req.user.id });
  let updateEdu = profile.education.filter(
    (item) => item.id === req.params.edu_id
  );

  // Errors chack
  if (school === "")
    return res.status(400).json({ errors: { msg: "School is requird" } });
  if (degree === "")
    return res.status(400).json({ errors: { msg: "degree is requird" } });
  if (from === "")
    return res.status(400).json({ errors: { msg: "from is requird" } });
  if (current === false && to === "")
    return res.status(400).json({ errors: { msg: "to is requird" } });
  if (fieldofstudy === "")
    return res
      .status(400)
      .json({ errors: { msg: "Field of study is requird" } });

  // Set update data
  updateEdu[0].school = school ? school : updateEdu[0].school;
  updateEdu[0].degree = degree ? degree : updateEdu[0].degree;
  updateEdu[0].from = from ? from : updateEdu[0].from;
  updateEdu[0].current = current ? current : false;
  updateEdu[0].location = location ? location : updateEdu[0].location;
  updateEdu[0].description = description
    ? description
    : updateEdu[0].description;
  updateEdu[0].fieldofstudy = fieldofstudy
    ? fieldofstudy
    : updateEdu[0].fieldofstudy;
  updateEdu[0].to = updateEdu[0].current ? "" : to;

  try {
    updateEdu = profile = profile.education.map((e) =>
      e._id === updateEdu._id ? updateEdu : e
    );

    // Save upddate data
    profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: { education: updateEdu } },
      { new: true }
    );
    res.json(profile);
  } catch (err) {
    serverError(res, err);
  }
};

// Delete Education
exports.deleteEducation = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);
    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    serverError(res, err);
  }
};

// * EXPERIENCE

// Add experience
exports.addexperience = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return validationErrors(res, errors);
  }
  const { title, company, from, to, current, description } = req.body;

  const newExp = {
    title,
    company,
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
    res.status(200).json(profile);
  } catch (err) {
    serverError(res, err);
  }
};

// Delete exp

exports.deleteexperience = async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    serverError(res, err);
  }
};

// Edit editexperience

exports.editexperience = async (req, res) => {
  const { title, company, from, to, current, description } = req.body;

  let profile = await Profile.findOne({ user: req.user.id });
  let updateExp = profile.experience.filter(
    (item) => item.id === req.params.exp_id
  );
  // Errors chack
  if (title === "")
    return res.status(400).json({ errors: { msg: "title is requird" } });
  if (company === "")
    return res.status(400).json({ errors: { msg: "company is requird" } });
  if (from === "")
    return res.status(400).json({ errors: { msg: "from is requird" } });
  if (current === false && to === "")
    return res.status(400).json({ errors: { msg: "to is requird" } });

  // Set update data
  updateExp[0].title = title ? title : updateExp[0].title;
  updateExp[0].company = company ? company : updateExp[0].company;
  updateExp[0].from = from ? from : updateExp[0].from;
  updateExp[0].current = current ? current : false;
  updateExp[0].description = description
    ? description
    : updateExp[0].description;
  updateExp[0].to = updateExp[0].curren ? "" : to;

  try {
    updateExp = profile = profile.experience.map((e) =>
      e._id === updateExp._id ? updateExp : e
    );

    // Save upddate data
    profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: { experience: updateExp } },
      { new: true }
    );
    res.json(profile);
  } catch (err) {
    serverError(res, err);
  }
};

// get gitHub repos
exports.getGitHubRepos = async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };
    request(options, (error, response, body) => {
      if (error) console.log(error);
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: "No Github profile found" });
      }
      res.json(JSON.parse(body));
    });
  } catch (err) {
    serverError(res, err);
  }
};
