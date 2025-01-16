const express = require('express');
const router = express.Router();
const {
  addIncome,
  getAllIncomes,
  updateIncome,
  deleteIncome,
} = require("../controllers/incomeController");


router.get("/", getAllIncomes);
router.post("/", addIncome);
router.delete("/delete/:id", deleteIncome);
router.put("/update/:id", updateIncome)

module.exports = router;

