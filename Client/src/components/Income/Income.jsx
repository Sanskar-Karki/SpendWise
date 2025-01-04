import { useState } from "react";
import IncomeList from "./IncomeList";

const Income = () => {
  const [incomeData, setIncomeData] = useState([
    {
      remark: "Lotery",
      amount: "1000",
      date: "Jan 10, 2025, 09:24 PM",
    },
    {
      remark: "Lotery",
      amount: "1000",
      date: "Jan 10, 2025, 09:24 PM",
    },
    {
      remark: "Lotery",
      amount: "1000",
      date: "Jan 10, 2025, 09:24 PM",
    }
  ]);
  const [data, setData] = useState({
    remark: "",
    amount: "",
    date: "",
  });

  const handleInput = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.remark.trim() && data.amount.trim() && data.date.trim()) {
      setIncomeData([...incomeData, data]);
      setData({ remark: "", amount: "", date: "" });
    } else {
      alert("Please fill all fields");
    }
  };

  const deleteHandler = (index) => {
    const filteredData = incomeData.filter((_, i) => i !== index);
    setIncomeData(filteredData);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="backdrop-blur-lg bg-white/30 rounded-3xl shadow-xl p-8 border border-white/50">
          <h2 className="text-3xl font-bold text-gray-800/90 mb-8">Add New Income</h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700/90">Description</label>
                <input
                  name="remark"
                  value={data.remark}
                  onChange={handleInput}
                  className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-white/40 border border-white/60 
                           focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300
                           placeholder-gray-400"
                  placeholder="What is this income for?"
                  type="text"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700/90">Amount</label>
                <input
                  name="amount"
                  value={data.amount}
                  onChange={handleInput}
                  className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-white/40 border border-white/60 
                           focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300
                           placeholder-gray-400"
                  placeholder="0.00"
                  type="number"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700/90">Date</label>
                <input
                  value={data.date}
                  onChange={handleInput}
                  name="date"
                  className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-white/40 border border-white/60 
                           focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  type="datetime-local"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button className="inline-flex w-full flex justify-center sm:w-auto items-center px-8 py-3 backdrop-blur-sm bg-green-600/80 hover:bg-green-700/90 
                              text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium
                              border border-white/20">
                <div className="w-5 h-5 mr-2 " />
                Add Income
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8">
          <IncomeList incomeData={incomeData} deleteHandler={deleteHandler} />
        </div>
      </div>
    </div>
  );
};

export default Income;
