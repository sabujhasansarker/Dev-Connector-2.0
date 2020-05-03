const router = require("express").Router();

const auth = require("../middleware/auth");

const {
  createProfile,
  getCurrentProfile,
} = require("../controller/profileController");

const { createProfileValidation } = require("../validation/profileValidation");

//? @ Path   :   /profile/me
//* @ decs   :   get current user
//! @ access :   Privat
router.get("/me", auth, getCurrentProfile);

//? @ Path   :   /profile/create-profile
//* @ decs   :   post create profile
//! @ access :   Privat
router.post("/create-profile", auth, createProfileValidation, createProfile);

module.exports = router;
