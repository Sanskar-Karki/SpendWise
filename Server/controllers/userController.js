const User = require("../models/userModel");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (username && email && password) {
    try {
      const newUser = await User.create({ username, email, password });
      console.log(newUser);
    } catch (error) {
      res.status(500).json({ message: "Error while registering user." });
    }
  } else {
    res.status(400).json({ message: "Provide all the required information" });
  }
}

// FIXME: Here write down the encryption logic or password hashing logic
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    try {
      const isRegisteredUser = await User.findAll({
        where: {
          email: email,
          password: password
        }
      });
      if (isRegisteredUser.length == 0) {
        res.send("User not registered with this email")
      }
      res.send("user login successfully");
    } catch (error) {
      res.send("Incorrect user email or password");
    }
  } else {
    res.send("Provide all the required information");
  }
}

const logoutUser = async (req, res) => {
  console.log("just remove token from the cookie or session id from the server");
  // TODO: Write the logic inorder to remove the token id and session id
}


module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};