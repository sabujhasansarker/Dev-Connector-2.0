const router = require("express").Router();

const auth = require("../middleware/auth");

const {
  getCurrentProfile,
  getSingleProfileByUsername,
  createProfile,
  deleteProfile,
  addeducation,
  addexperience,
  getAllProfiles,
  deleteEducation,
  editEducation,
  deleteexperience,
  editexperience,
} = require("../controller/profileController");

const {
  createProfileValidation,
  educationValidator,
  experienceValidator,
} = require("../validation/profileValidation");

//? @ Path   :   /profile
//* @ decs   :   get all user
//! @ access :   Public
router.get("/", getAllProfiles);

//? @ Path   :   /profile/:username
//* @ decs   :   find user in profile
//! @ access :   Public
router.get("/:username", getSingleProfileByUsername);

//? @ Path   :   /profile/me
//* @ decs   :   get current user
//! @ access :   Privat
router.get("/me", auth, getCurrentProfile);

//? @ Path   :   /profile/create-profile
//* @ decs   :   post create profile
//! @ access :   Privat
router.post("/create-profile", auth, createProfileValidation, createProfile);

//? @ Path   :   /profile/delete/me
//* @ decs   :   delete profile
//! @ access :   Privat
router.put("/delete/me", auth, deleteProfile);

//? @ Path   :   /profile/education
//* @ decs   :   add educaion in profile
//! @ access :   Privat
router.put("/education", auth, educationValidator, addeducation);

//? @ Path   :   /profile/education/:edu_id
//* @ decs   :   delete educaion in profile
//! @ access :   Privat
router.delete("/education/:edu_id", auth, deleteEducation);

//? @ Path   :   /profile/education/:edu_id
//* @ decs   :   delete educaion in profile
//! @ access :   Privat
router.put("/education/:edu_id", auth, editEducation);

//? @ Path   :   /profile/experience
//* @ decs   :   add experience in profile
//! @ access :   Privat
router.put("/experience", auth, experienceValidator, addexperience);

//? @ Path   :   /profile/experience/:exp_id
//* @ decs   :   delete experience in profile
//! @ access :   Privat
router.delete("/experience/:exp_id", auth, deleteexperience);

//? @ Path   :   /profile/experience/:exp_id
//* @ decs   :   delete experience in profile
//! @ access :   Privat
router.put("/experience/:exp_id", auth, editexperience);

module.exports = router;
