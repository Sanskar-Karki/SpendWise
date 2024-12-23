import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const IncomeList = ({ incomeData, deleteHandler }) => {
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
                Amount
              </th>
              <th className="hidden md:table-cell px-4 py-4 text-left text-sm md:text-base font-semibold text-gray-700">
                Date
              </th>
              <th className="px-4 py-4 text-left text-sm md:text-base font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {incomeData.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                  <div className="flex flex-col items-center space-y-2">
                    <span className="text-2xl">📄</span>
                    <p className="text-sm md:text-base">No income to show.</p>
                  </div>
                </td>
              </tr>
            ) : (
              incomeData.map((data, index) => (
                <tr key={index} className="hover:bg-white/30 transition duration-200 ease-in-out">
                  <td className="px-4 py-4 text-sm md:text-base text-gray-900 break-words max-w-xs">
                    <div className="flex flex-col">
                      <span className="font-medium">{data.remark}</span>
                      <span className="md:hidden text-xs text-gray-500 mt-1">
                        {new Date(data.date).toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm md:text-base font-semibold text-green-600">
                    ${Number(data.amount).toLocaleString()}
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
