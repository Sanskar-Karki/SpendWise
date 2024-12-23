import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const IncomeList = ({ incomeData, deleteHandler }) => {
  return (
    <div className="w-full overflow-x-auto px-4 md:px-0">
      <div className="min-w-full shadow-sm rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs md:text-sm font-semibold text-gray-600">Remark</th>
              <th className="px-4 py-3 text-left text-xs md:text-sm font-semibold text-gray-600">Amount</th>
              <th className="hidden md:table-cell px-4 py-3 text-left text-xs md:text-sm font-semibold text-gray-600">Date</th>
              <th className="px-4 py-3 text-left text-xs md:text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">

            {incomeData.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
                  No Income Data to show.
                </td>
              </tr>
            ) : (

              incomeData.map((data, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <div className="flex flex-col md:flex-row md:items-center">
                      <span className="font-medium text-gray-900">{data.remark}</span>
                      <span className="md:hidden text-xs text-gray-500 mt-1">
                        {data.date.replace("T", " | ")}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-green-600">
                      ${Number(data.amount).toLocaleString()}
                    </span>
                  </td>
                  <td className="hidden md:table-cell px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {data.date.replace("T", " | ")}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      <button
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Edit">
                        <FaEdit className="w-4 h-4 text-blue-600" />
                      </button>
                      <button
                        onClick={() => deleteHandler(index)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Delete">
                        <MdDeleteForever className="w-4 h-4 text-red-600" />
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