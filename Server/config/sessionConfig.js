require("dotenv").config();

export const sessionConfig = {
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: false,
  cookie: { secure: true },
};
