const app = require("express");
const {
  googleAuthRedirect,
  googleAuthCallback,
} = require("../controllers/googleAuthController.js");

const router = express.Router();

router.get("/", googleAuthRedirect);

router.get("/callback", googleAuthCallback);

module.exports = router;
