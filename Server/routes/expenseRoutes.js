const { Router } = require("express");
const {
  addExpense,
  updateExpense,
  deleteExpense,
  getAllExpenses,
} = require("../controllers/expenseController");

const router = Router();


router.post("/", addExpense);
router.put("/update/:id", updateExpense);
router.delete("/delete/:id", deleteExpense);
router.get("/", getAllExpenses);

module.exports = router;
