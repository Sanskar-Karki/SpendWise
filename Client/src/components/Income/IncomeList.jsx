import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const IncomeList = ({ incomeData, deleteHandler }) => {

  const handleDelete = (index) => {
    deleteHandler(index)
  }
  return (

    <div className="container flex justify-center ">
      <table className="table-auto  w-full  border border-gray-500 rounded">
        <thead className=" bg-gray-200 text-gray-700 font-bold">
          <tr >
            <th className="text-left p-4 w-1/2">Remark</th>
            <th className="text-left p-4 w-1/65">Amount</th>
            <th className="text-left p-4 w-1/6">Date</th>
            <th className="text-left p-4 w-1/6">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-300">
          {incomeData.map((data, index) => {
            return (
              <tr key={index}>
                <td className="p-4">{index + 1}{" | "}{data.remark}</td>
                <td className="p-4 text-green-500">${data.amount}</td>
                <td className="p-4">{
                  data.date.replace("T", " | ")
                }</td>
                <td className="p-4 flex">
                  <button className="p-2 rounded-full  group transition-all duration-500  flex item-center">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(index)} className="p-2 rounded-full  group transition-all duration-500  flex item-center">
                    <MdDeleteForever />
                  </button>
                </td>
              </tr>
            )
          })}

        </tbody>
      </table>
    </div>


  )
}

export default IncomeList