const router = require("express").Router();

const auth = require("../middleware/auth");

const {
  createProfile,
  getCurrentProfile,
  deleteProfile,
  addeducation,
} = require("../controller/profileController");

const {
  createProfileValidation,
  educationValidator,
} = require("../validation/profileValidation");

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

module.exports = router;
