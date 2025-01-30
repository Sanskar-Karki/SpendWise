const dotenv = require("dotenv");

dotenv.config();

const sessionConfig = {
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: false,
  cookie: { secure: true },
};

module.exports = sessionConfig;