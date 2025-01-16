const { Router } = require("express");
const { verifyJWT } = require("../middlewares/authMiddleware");
const {
  addIncome,
  updateIncome,
  deleteIncome,
  getAllIncomes,
} = require("../controllers/incomeController");

const router = Router();

router.route("/")
  .get(verifyJWT, getAllIncomes)
  .post(verifyJWT, addIncome);

router.route("/:id")
  .put(verifyJWT, updateIncome)
  .delete(verifyJWT, deleteIncome);

module.exports = router;

