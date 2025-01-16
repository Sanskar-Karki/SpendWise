const { verifyJWT } = require("../middlewares/authMiddleware")
const { Router } = require("express");
const {
  addExpense,
  updateExpense,
  deleteExpense,
  getAllExpenses,
} = require("../controllers/expenseController");

const router = Router();

router.route("/")
  .get(verifyJWT, getAllExpenses)
  .post(verifyJWT, addExpense);

router.route("/:id")
  .put(verifyJWT, updateExpense)
  .delete(verifyJWT, deleteExpense);

module.exports = router;
