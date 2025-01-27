const express = require("express");
const session = require("express-session");
const sessionConfig = require("./config/sessionConfig.js");
const configurePassport = require("./config/passportConfig.js");
const userRouter = require("./routes/userRoutes");
const googleAuthRouter = require("./routes/googleAuthRoutes.js");
const expenseRouter = require("./routes/expenseRoutes");
const incomeRouter = require("./routes/incomeRoutes");

const app = express();
require("./models/index");

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

configurePassport();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v1/user", userRouter);
app.use("/auth/google", googleAuthRouter);
app.use("/v1/user-expense", expenseRouter);
app.use("/v1/user-income", incomeRouter);

module.exports = app;
