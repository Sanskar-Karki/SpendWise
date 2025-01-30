const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/userModel.js");

const verifyJWT = async (req, res, next) => {
  const jwtToken = req.cookies["auth"]; // Fixed typo in cookies
  const sessionToken = req.cookies["connect.sid"];
  const token = sessionToken || jwtToken;

  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: "No token provided. Access denied."
    });
  }

  try {
    if (sessionToken) {
      if (!req.user) {
        return res.status(401).json({
          status: 'error',
          message: "No user session found. Please login again."
        });
      }
      req.userId = req.user.id;
      return next();
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_TOKEN_SECRET);

    // Add token expiration check
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      return res.status(401).json({
        status: 'error',
        message: "Token has expired. Please login again."
      });
    }

    const user = await User.findOne({ where: { id: decoded.id } });

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: "User not found"
      });
    }

    req.userId = decoded.id; // Fixed: Using decoded.id instead of req.user.id
    return next();
  } catch (error) {
    // Implement better error logging
    console.error(`Authentication error: ${error.message}`);
    return res.status(401).json({
      status: 'error',
      message: "Invalid or expired token"
    });
  }
}

module.exports = { verifyJWT };