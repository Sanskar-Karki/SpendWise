const { Router } = require("express");
const { verifyJWT } = require("../middlewares/auth.middleware");
const {
  addExpense,
  updateExpense,
  deleteExpense,
  getAllExpenses,
} = require("../controllers/expenseController");

const router = Router();

router.route("/add").post(verifyJWT, addExpense);
router.route("/update/:id").put(verifyJWT, updateExpense);
router.route("/delete/:id").delete(verifyJWT, deleteExpense);
router.route("/getall").get(verifyJWT, getAllExpenses);

module.exports = router;
