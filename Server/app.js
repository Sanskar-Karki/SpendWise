const express = require("express");
const session = require("express-session");
const sessionConfig = require("./config/sessionConfig.js");
const userRoute = require("./routes/userRoutes");
const expenseRoute = require("./routes/expenseRoutes");
const incomeRoute = require("./routes/incomeRoutes");

const app = express();
require("./models/index");

app.use(session(sessionConfig));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v1/user", userRoute);
app.use("/v1/user-expense", expenseRoute);
app.use("/v1/user-income", incomeRoute);

module.exports = app;
