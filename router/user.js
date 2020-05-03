const router = require("express").Router();

const {
  loginUserController,
  registerUserController,
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

module.exports = router;
