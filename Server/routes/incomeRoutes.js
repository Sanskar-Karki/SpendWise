const express = require('express');
const router = express.Router();
const {
  addIncomeDetails,
  getAllIncomeDetails,
  updateIncomeDetail,
  deleteIncomeDetail,
} = require("../controllers/incomeController");

router.post("/", addIncomeDetails);
router.get("/", getAllIncomeDetails);
router.put("/:id", updateIncomeDetail);
router.delete("/:id", deleteIncomeDetail);

module.exports = router;
