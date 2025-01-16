const Expense = require("../models/expenseModel");

// Create a new expense entry
const addExpense = async (req, res) => {
  try {
    const { remark, amount, date } = req.body;
    const newExpense = await Expense.create({ remark, amount, createdAt: date, updatedAt: date });
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: "Error creating expense", error });
  }
};

// Get all expense entries
const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching expenses", error });
  }
};

// Update an expense entry
const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { remark, amount, date } = req.body;
    const [updated] = await Expense.update({ remark, amount, updatedAt: date }, { where: { id } });
    if (updated) {
      const updatedExpense = await Expense.findOne({ where: { id } });
      res.status(200).json(updatedExpense);
    } else {
      res.status(404).json({ message: "Expense not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating expense", error });
  }
};

// Delete an expense entry
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Expense.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Expense not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting expense", error });
  }
};

module.exports = {
  addExpense,
  getAllExpenses,
  updateExpense,
  deleteExpense,
};
