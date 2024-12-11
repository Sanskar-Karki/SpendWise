import { useState } from "react"
import ExpenseList from "./ExpenseList"

const Expense = () => {

  const [expenseData, setexpenseData] = useState([])
  const [data, setData] = useState({
    remark: "",
    amount: "",
    date: "",
  })

  const handleInput = (e) => {
    const { value, name } = e.target
    setData({
      ...data,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (data.remark.trim() !== "" && data.amount.trim() !== "" && data.date.trim() !== "") {
      setexpenseData([...expenseData, data])
      setData({
        remark: "",
        amount: "",
        date: "",
      });
    } else {
      alert("Give all the inputs")
    }
  }

  const deleteHandler = (index) => {
    const filteredData = expenseData.filter((_, i) => i !== index)
    setexpenseData(filteredData)
  }

  console.log(expenseData)
  console.log(data)

  return (
    <div className="mx-40 my-10">
      <div >
        <form className="flex mb-8 min-w-full m-5" onSubmit={handleSubmit}>
          <label className=" text-gray-700 text-sm font-bold mb-2 ">
            Enter Text :
            <input
              name="remark"
              value={data.remark}
              className="border border-gray-500 ml-2 rounded w-1/2 py-2 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter text"
              type="text"
              onChange={handleInput}
            />
          </label>

          <label className=" text-gray-700 text-sm font-bold mb-2">
            Enter Amount :
            <input
              name="amount"
              value={data.amount}
              onChange={handleInput}
              className="border border-gray-500 rounded w-1/2 py-2 ml-2 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter amount"
              type="number"
            />
          </label >
          <label className=" text-gray-700 text-sm font-bold mb-2">
            Select Date :
            <input value={data.date} onChange={handleInput} name="date" className="border border-gray-500 rounded w-1/3 py-2 px-3 ml-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              type="datetime-local" />
          </label>
          <button className="border border-blue-500 rounded-xl px-5 text-sm  hover:bg-[#295383] hover:text-white hover:shadow-lg transition-all duration-500 ">
            Add Expense
          </button>
        </form>
      </div>

      <ExpenseList expenseData={expenseData} deleteHandler={deleteHandler} />
    </div>

  )
}

export default Expense
