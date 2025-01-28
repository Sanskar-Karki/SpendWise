const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/userModel.js");

const verifyJWT = async (req, res, next) => {
  const jwtToken = req.cookiies["auth"];

  const sessionToken = req.cookies["connect.sid"];

  const token = sessionToken || jwtToken;

  if (!token) {
    return res.status(401).json({ message: "No token provided. Access denied." });
  }

  try {
    if (sessionToken) {
      if (!req.user) {
        return res.status(401).json({ message: "No user session found. Please login again." });
      }
      req.userId = req.user.id;
      return next();
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_TOKEN_SECRET)
    const user = await User.findOne({ where: { id: decoded.id } });

    if (!user) {
      return res.status(401).json({ message: "User not found" })
    }
    req.userId = req.user.id;
    return next();
  } catch (error) {
    console.error("Error while validating token: ", token);
    return res.status(500).json({ message: "Error while token validation." })
  }
}

module.exports = { verifyJWT };