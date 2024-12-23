import { useState } from "react";
import ExpenseList from "./ExpenseList";

const Expense = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [data, setData] = useState({
    remark: "",
    amount: "",
    date: "",
  });

  const handleInput = (e) => {
    const { value, name } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.remark.trim() !== "" && data.amount.trim() !== "" && data.date.trim() !== "") {
      setExpenseData([...expenseData, data]);
      setData({
        remark: "",
        amount: "",
        date: "",
      });
    } else {
      alert("Please fill all fields");
    }
  };

  const deleteHandler = (index) => {
    const filteredData = expenseData.filter((_, i) => i !== index);
    setExpenseData(filteredData);
  };

  return (
    <div className="mx-4 md:mx-8 lg:mx-40 my-6 md:my-10">
      <div className="w-full max-w-4xl mx-auto">
        <form
          className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-white rounded-lg shadow-sm"
          onSubmit={handleSubmit}
        >
          <div className="flex-1">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Enter Text:
              <input
                name="remark"
                value={data.remark}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter text"
                type="text"
                onChange={handleInput}
              />
            </label>
          </div>

          <div className="flex-1">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Enter Amount:
              <input
                name="amount"
                value={data.amount}
                onChange={handleInput}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter amount"
                type="number"
              />
            </label>
          </div>

          <div className="flex-1">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select Date:
              <input
                value={data.date}
                onChange={handleInput}
                name="date"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                type="datetime-local"
              />
            </label>
          </div>

          <button
            className="w-full md:w-auto mt-4 md:mt-8 px-6 py-2 bg-blue-600 text-white rounded-md
                     hover:bg-blue-700 transition-colors duration-200"
          >
            Add Income
          </button>
        </form>
      </div>

      <ExpenseList expenseData={expenseData} deleteHandler={deleteHandler} />
    </div>
  );
};

export default Expense;