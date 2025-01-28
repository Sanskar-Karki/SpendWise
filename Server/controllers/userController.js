const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/userModel");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (username && email && password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ username, email, password: hashedPassword });
      console.log(newUser);
    } catch (error) {
      res.status(500).json({ message: "Error while registering user." });
    }
  } else {
    res.status(400).json({ message: "Provide all the required information" });
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    try {
      const isRegisteredUser = await User.findOne({
        where: {
          email: email,
        }
      });
      if (!isRegisteredUser) {
        return res.status(401).json({ message: "Invalid email or password." })
      }
      const token = jwt.sign({ id: isRegisteredUser.id }, process.env.JWT_TOKEN_SECRET, {
        expiresIn: JWT_TOKEN_EXPIRY
      });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: "Error loggin in", error })
    }
  } else {
    res.send("Provide all the required information");
  }
}

const logoutUser = async (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.clearCookie("auth", {
      path: "/",
    })

    req.session = null;

    res.clearCokkie("connect.sid", {
      path: '/',
    });

    res.redirect("/auth/user/login");
  })
}


module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};