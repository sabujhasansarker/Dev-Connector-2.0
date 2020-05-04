const router = require("express").Router();

const auth = require("../middleware/auth");

const {
  createProfile,
  getCurrentProfile,
  deleteProfile,
  addeducation,
  addexperience,
  getAllProfiles,
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

//? @ Path   :   /profile/experience
//* @ decs   :   add experience in profile
//! @ access :   Privat
router.put("/experience", auth, experienceValidator, addexperience);

module.exports = router;
