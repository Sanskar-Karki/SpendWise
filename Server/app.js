const express = require("express");
const userRoute = require("./routes/userRoutes");
const expenseRoute = require("./routes/expenseRoutes");
const incomeRoute = require("./routes/incomeRoutes")

const app = express();
const db = require("./models/index");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/user-expense", expenseRoute);
app.use("/api/v1/user-income", incomeRoute);

module.exports = app;
