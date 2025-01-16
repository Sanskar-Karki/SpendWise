const { Router } = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/userController");

const router = Router();

// router.route("/register").post(registerUser);
// router.route("/login").post(loginUser);
// router.route("/logout").post(logoutUser);

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

module.exports = router;
