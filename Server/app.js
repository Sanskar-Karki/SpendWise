const express = require("express");
const passport = require("passport");
const session = require("express-session");
const sessionConfig = require("./config/sessionConfig.js");
const configurePassport = require("./config/passportConfig.js");
const userRoute = require("./routes/userRoutes");
const googleAuthRoute = require("./routes/googleAuthRoutes.js");
const expenseRoute = require("./routes/expenseRoutes");
const incomeRoute = require("./routes/incomeRoutes");

const app = express();
require("./models/index");

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

configurePassport();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v1/user", userRoute);
app.use("/auth/google", googleAuthRoute);
app.use("/v1/user-expense", expenseRoute);
app.use("/v1/user-income", incomeRoute);

module.exports = app;
