import { FaEdit, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";

const IncomeList = ({ incomeData, deleteHandler, editHandler }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const sortedData = [...incomeData].sort((a, b) => {
    if (!sortConfig.key) return 0; // If no sorting key, original data return garxa

    const order = sortConfig.direction === "asc" ? 1 : -1;
    if (sortConfig.key === "amount") {
      return (Number(a.amount) - Number(b.amount)) * order;
    }
    if (sortConfig.key === "date") {
      return (new Date(a.date) - new Date(b.date)) * order;
    }
    return 0;
  });

  // Handle sorting logic for each column
  const handleSort = (key) => {
    setSortConfig((prev) => {
      const newDirection = prev.key === key && prev.direction === "asc" ? "desc" : "asc";
      return { key, direction: newDirection };
    });
  };

  //  sorting icon linxa according to the current sorting state
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort className="w-4 h-4" />;
    return sortConfig.direction === "asc" ? (
      <FaSortUp className="w-4 h-4 text-blue-600" />
    ) : (
      <FaSortDown className="w-4 h-4 text-blue-600" />
    );
  };

  return (
    <div className="w-full overflow-x-auto px-4 md:px-0">
      <div className="min-w-full shadow-md rounded-lg border border-white/30 backdrop-blur-md bg-white/20">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-white/40 backdrop-blur-sm">
            <tr>
              <th className="px-4 py-4 text-left text-sm md:text-base font-semibold text-gray-700">
                Remark
              </th>
              <th className="px-4 py-4 text-left text-sm md:text-base font-semibold text-gray-700">
                <div
                  className="flex items-center cursor-pointer space-x-2"
                  onClick={() => handleSort("amount")}
                >
                  <span>Amount</span>
                  {getSortIcon("amount")}
                </div>
              </th>
              <th className="hidden md:table-cell px-4 py-4 text-left text-sm md:text-base font-semibold text-gray-700">
                <div
                  className="flex items-center cursor-pointer space-x-2"
                  onClick={() => handleSort("date")}
                >
                  <span>Date</span>
                  {getSortIcon("date")}
                </div>
              </th>
              <th className="px-4 py-4 text-left text-sm md:text-base font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedData.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                  <div className="flex flex-col items-center space-y-2">
                    <span className="text-2xl">📄</span>
                    <p className="text-sm md:text-base">No income to show.</p>
                  </div>
                </td>
              </tr>
            ) : (
              sortedData.map((data, index) => (
                <tr
                  key={index}
                  className="hover:bg-white/30 transition duration-200 ease-in-out"
                >
                  <td className="px-4 py-4 text-sm md:text-base text-gray-900 break-words max-w-xs">
                    <div className="flex flex-col">
                      <span className="font-medium">{data.remark}</span>
                      <span className="md:hidden text-xs text-gray-500 mt-1">
                        {new Date(data.date).toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm md:text-base font-semibold text-green-600">
                    रु {Number(data.amount).toLocaleString()}
                  </td>
                  <td className="hidden md:table-cell px-4 py-4 text-sm text-gray-500">
                    {new Date(data.date).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <div className="flex items-center space-x-3">
                      <button
                        className="p-2 rounded-full text-blue-600 hover:bg-blue-100 transition"
                        aria-label="Edit"
                        title="Edit"
                        onClick={() => editHandler(index)}
                      >
                        <FaEdit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteHandler(index)}
                        className="p-2 rounded-full text-red-600 hover:bg-red-100 transition"
                        aria-label="Delete"
                        title="Delete"
                      >
                        <MdDeleteForever className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IncomeList;
