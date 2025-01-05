import { useState } from "react";
import IncomeList from "./IncomeList";
import Swal from "sweetalert2";
import "./Income.css"
const Income = () => {
  const [incomeData, setIncomeData] = useState([
    {
      remark: "Lottery",
      amount: "1000",
      date: "Jan 10, 2025, 09:24 PM",
    },
    {
      remark: "Lottery",
      amount: "1000",
      date: "Jan 10, 2025, 09:24 PM",
    },
    {
      remark: "Lottery",
      amount: "1000",
      date: "Jan 10, 2025, 09:24 PM",
    },
  ]);
  const [data, setData] = useState({
    remark: "",
    amount: "",
    date: "",
  });
  const [isDateEditable, setIsDateEditable] = useState(true);
  const [editIndex, setEditIndex] = useState(null); // To track the index of the item being edited

  const handleInput = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (data.remark.trim() && data.amount.trim() && data.date.trim()) {
      if (editIndex !== null) {
        // Update the specific item in the array
        const updatedData = [...incomeData];
        updatedData[editIndex] = data;
        setIncomeData(updatedData);
        Swal.fire({
          title: "Edit Successful!",
          icon: "success",
          draggable: true,
          timer: 1500,
          timerProgressBar: true,
          customClass: {
            popup: 'my-swal-popup', // Apply custom class to the popup
            timerProgressBar: 'my-progress-bar-edit', // Apply custom class to the progress bar
          },
        });
        // Reset editIndex after updating
        setEditIndex(null);
        setIsDateEditable(true);
      } else {
        // Add a new entry
        setIncomeData([...incomeData, data]);
      }

      // Reset the form
      setData({ remark: "", amount: "", date: "" });
    } else {
      Swal.fire({
        icon: "error",
        title: "Fill all the Input fields",
        text: "Something went wrong!",
      });
    }
  };

  const editHandler = (index) => {
    const currentDateTime = new Date().toLocaleString("sv-SE", {
      timeZone: "Asia/Kathmandu",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).replace(" ", "T"); // Converts date to the `datetime-local` format

    setData({
      remark: incomeData[index].remark,
      amount: incomeData[index].amount,
      date: currentDateTime, // Use the corrected local time
    });

    setIsDateEditable(false); // Make the date field uneditable
    setEditIndex(index); // Track the index of the item being edited

    // Smooth scroll to the top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const cancelEdit = () => {
    setData({ remark: "", amount: "", date: "" });
    setEditIndex(null);
    setIsDateEditable(true);
  };

  const deleteHandler = (index) => {
    Swal.fire({
      title: "Confirm Delete?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deletion Successful",
          icon: "success",
          timerProgressBar: true,
          timer: 2000,
          customClass: {
            popup: 'my-swal-popup', // Apply custom class to the popup
            timerProgressBar: 'my-progress-bar-delete', // Apply custom class to the progress bar
          },
        });
        const filteredData = incomeData.filter((_, i) => i !== index);
        setIncomeData(filteredData);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Deletion Canceled",
          icon: "info",
        });
      }
    });
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="backdrop-blur-lg bg-white/30 rounded-3xl shadow-xl p-8 border border-white/50">
          <h2 className="text-3xl font-bold text-gray-800/90 mb-8">
            {editIndex !== null ? "Edit Income" : "Add New Income"}
          </h2>
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
                  disabled={!isDateEditable} // Disable the field if not editable
                  className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-white/40 border border-white/60 
                           focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  type="datetime-local"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              {editIndex !== null && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="inline-flex w-full sm:w-auto justify-center items-center px-8 py-3 backdrop-blur-sm bg-red-600/80 hover:bg-red-700/90 
                              text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium
                              border border-white/20"
                >
                  Cancel Update
                </button>
              )}

              <button className="inline-flex w-full sm:w-auto justify-center items-center px-8 py-3 backdrop-blur-sm bg-green-600/80 hover:bg-green-700/90 
                              text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium
                              border border-white/20">
                {editIndex !== null ? "Update Income" : "Add Income"}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8">
          <IncomeList incomeData={incomeData} editHandler={editHandler} deleteHandler={deleteHandler} />
        </div>
      </div>
    </div>
  );
};

export default Income;
