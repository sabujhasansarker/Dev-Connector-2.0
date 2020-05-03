const router = require("express").Router();

const {
  loginUserController,
  registerUserController,
} = require("../controller/userController");

//? @ Path   :   /user/register
//* @ decs   :   Register user
//! @ access :   Public

router.post("/register", registerUserController);

//? @ Path   :   /user/login
//* @ decs   :   Login user
//! @ access :   Public

router.post("/login", loginUserController);

module.exports = router;
