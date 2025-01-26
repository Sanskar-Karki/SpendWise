const passport = require("passport");

const googleAuthRedirect = passport.authenticate("google", {
  scope: ["profile", "email"],
  prompt: "select_account",
});

const googleAuthCallback = passport.authenticate(
  "google",
  {
    failureRedirect: "/login",
  },
  (req, res) => {
    res.redirect("/dashboard");
  }
);

module.exports = {
  googleAuthRedirect,
  googleAuthCallback,
};
