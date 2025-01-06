import { useState } from "react";
import { useSelector } from "react-redux";
import { selectTop3Income } from "../../../features/income/incomeSlice";
import { selectTop3Expense } from "../../../features/expense/expenseSlice";
import { motion } from "framer-motion";
import "../styles.css"

const LatestData = () => {
  const [showIncome, setShowIncome] = useState(true); // Track which data to show
  const top3Income = useSelector(selectTop3Income);
  const top3Expense = useSelector(selectTop3Expense);

  const toggleData = () => setShowIncome((prevState) => !prevState); // Toggle between income and expense

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 glow-fade">
      <h2 className="text-2xl sm:text-3xl text-center font-semibold mb-6">
        <span className={`${showIncome ? "text-green-600" : "text-red-600"}`}>
          Latest
        </span>
        <button
          onClick={toggleData}
          className={`px-4 mx-2 py-2.5 text-white rounded-lg transition duration-300 ease-in-out ${showIncome
            ? "bg-green-600 backdrop-blur-md shadow-lg hover:bg-green-700"
            : "bg-red-600 backdrop-blur-md shadow-lg hover:bg-red-700"
            }`}
        >
          {showIncome ? "Income" : "Expense"}
        </button>
        <span className={`${showIncome ? "text-green-600" : "text-red-600"}`}>
          Data
        </span>
      </h2>
      <div className="glow-fade">
        {/* Animate the income or expense data change with modern effect */}
        {showIncome ? (
          <motion.div
            key="income"
            initial={{ opacity: 0, y: 50, scale: 0.95 }} // Start slightly smaller and below
            animate={{ opacity: 1, y: 0, scale: 1 }} // Scale up and slide to original position
            exit={{ opacity: 0, y: -50, scale: 0.95 }} // Exit by shrinking and moving up
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
          >
            {top3Income.length === 0 ? (
              <div className="flex justify-center items-center h-64 bg-gray-100 rounded-lg shadow-md mt-6">
                <p className="text-gray-600 text-lg animate-pulse">No income data available</p>
              </div>
            ) : (
              <div className="space-y-6 mt-6">
                {top3Income.map((income, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/50 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105"
                    initial={{ opacity: 0, y: 50, scale: 0.95 }} // Start slightly smaller and below
                    animate={{ opacity: 1, y: 0, scale: 1 }} // Scale up and slide to original position
                    exit={{ opacity: 0, y: -50, scale: 0.95 }} // Exit by shrinking and moving up
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1, // Stagger animation
                      ease: "easeOut",
                    }}
                  >
                    <div className="p-4 md:p-6 flex flex-col">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <h3 className="text-sm sm:text-lg font-semibold text-gray-800">
                          {String(income.remark).length > 20
                            ? String(income.remark).slice(0, 20) + " ... "
                            : income.remark}
                        </h3>
                        <p className="text-lg sm:text-xl font-medium text-green-600 mt-2 sm:mt-0">
                          रु {Number(income.amount).toLocaleString()}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 sm:mt-0">
                        <span className="font-medium">Date:</span>{" "}
                        {new Date(income.date).toLocaleString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="expense"
            initial={{ opacity: 0, y: 50, scale: 0.95 }} // Start slightly smaller and below
            animate={{ opacity: 1, y: 0, scale: 1 }} // Scale up and slide to original position
            exit={{ opacity: 0, y: -50, scale: 0.95 }} // Exit by shrinking and moving up
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
          >
            {top3Expense.length === 0 ? (
              <div className="flex justify-center items-center h-64 bg-gray-100 rounded-lg shadow-md mt-6">
                <p className="text-gray-600 text-lg animate-pulse">No expense data available</p>
              </div>
            ) : (
              <div className="space-y-6 mt-6">
                {top3Expense.map((expense, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/50 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105"
                    initial={{ opacity: 0, y: 50, scale: 0.95 }} // Start slightly smaller and below
                    animate={{ opacity: 1, y: 0, scale: 1 }} // Scale up and slide to original position
                    exit={{ opacity: 0, y: -50, scale: 0.95 }} // Exit by shrinking and moving up
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1, // Stagger animation
                      ease: "easeOut",
                    }}
                  >
                    <div className="p-4 md:p-6 flex flex-col">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <h3 className="text-sm sm:text-lg font-semibold text-gray-800">
                          {String(expense.remark).length > 20
                            ? String(expense.remark).slice(0, 20) + " ... "
                            : expense.remark}
                        </h3>
                        <p className="text-lg sm:text-xl font-medium text-red-600 mt-2 sm:mt-0">
                          रु {Number(expense.amount).toLocaleString()}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 sm:mt-0">
                        <span className="font-medium">Date:</span>{" "}
                        {new Date(expense.date).toLocaleString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LatestData;
