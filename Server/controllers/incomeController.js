const Income = require("../models/incomeModel");

// Create a new income entry
const addIncomeDetails = async (req, res) => {
  try {
    const { remark, amount, date } = rea.body;
    const newIncomeDetail = await Income.create({ remark, amount, date });
    res.status(201).json(newIncomeDetail);
  } catch (error) {
    res.status(500).json({ message: "Error creating income", error });
  }
};

// Get all income entries
const getAllIncomeDetails = async (req, res) => {
  try {
    const incomes = await Income.findAll;
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching incomes ", error })
  }
};

// Update an income entry
const updateIncomeDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const { remark, amount, date } = req.body;
    const [update] = await Income.update({ remark, amount, date }, { where: { id } });

    if (updated) {
      const updatedIncome = await Income.findOne({ where: { id } });
      res.status(200).json(updatedIncome);
    } else {
      res.status(404).json({ message: "Income not found" })
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating income" });
  }
};

// delete an income entry
const deleteIncomeDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Income.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Income not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting income", error });
  }
}

module.exports = {
  addIncomeDetails,
  getAllIncomeDetails,
  updateIncomeDetail,
  deleteIncomeDetail
}