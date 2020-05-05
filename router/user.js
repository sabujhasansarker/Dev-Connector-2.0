const router = require("express").Router();

const auth = require("../middleware/auth");
const {
  loginUserController,
  registerUserController,
  deleteUser,
  updateUser,
  getCurrentUser,
} = require("../controller/userController");
const {
  registerValidator,
  userUpdateValidator,
} = require("../validation/userValidation");

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

//? @ Path   :   /user/update
//* @ decs   :  Update User
//! @ access :   Privet
router.put("/update", auth, userUpdateValidator, updateUser);

//? @ Path   :   /user
//* @ decs   :  Update User
//! @ access :   Privet
router.get("/", auth, getCurrentUser);

module.exports = router;
