const router = require("express").Router();

const auth = require("../middleware/auth");
const {
  loginUserController,
  registerUserController,
  deleteUser,
} = require("../controller/userController");
const { registerValidator } = require("../validation/userValidation");

//? @ Path   :   /user/register
//* @ decs   :   Register user
//! @ access :   Public

router.post("/register", registerValidator, registerUserController);

//? @ Path   :   /user/login
//* @ decs   :   Login user
//! @ access :   Public

router.post("/login", loginUserController);

//? @ Path   :   /user/delete/me
//* @ decs   :   Delete User
//! @ access :   Privet
router.delete("/delete/me", auth, deleteUser);

module.exports = router;
