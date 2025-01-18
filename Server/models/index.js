const sequelize = require("../connection/dbConnection");
const User = require("./userModel");
const Expense = require("./expenseModel");
const Income = require("./incomeModel");
const db = {};

// Add models to the db object
db.User = User;
db.Expense = Expense;
db.Income = Income;

// Define associations here
User.hasMany(Income, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Expense, { foreignKey: 'userId', onDelete: 'CASCADE' });
Income.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
Expense.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to database successfully");
  })
  .catch((err) => {
    console.log("Unable to connect to database", err);
  });

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database is synced successfully");
  })
  .catch((err) => {
    console.log("Unable to sync database", err);
  });

db.sequelize = sequelize;
module.exports = db;
