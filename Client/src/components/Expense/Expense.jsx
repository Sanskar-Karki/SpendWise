import { useState } from "react";
import ExpenseList from "./ExpenseList";
import Swal from "sweetalert2";
import "./Expense.css";

const Expense = () => {
  const [expenseData, setExpenseData] = useState([
    {
      remark: "asdfasdf",
      amount: "100",
      date: "Oct 20, 2005, 2:44 AM",
    },
    {
      remark: "Lotfddfasdtery",
      amount: "10000",
      date: "Jan 22, 2020, 09:24 PM",
    },
    {
      remark: "Lofasdfttery",
      amount: "1000",
      date: "Feb 29, 2022, 01:24 PM",
    },
  ]);
  const [data, setData] = useState({
    remark: "",
    amount: "",
    date: "",
  });
  const [isDateEditable, setIsDateEditable] = useState(true);
  const [editIndex, setEditIndex] = useState(null);

  const handleInput = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (data.remark.trim() && data.amount.trim() && data.date.trim()) {
      if (editIndex !== null) {
        const updatedData = [...expenseData];
        updatedData[editIndex] = data;
        setExpenseData(updatedData);
        Swal.fire({
          title: "Edit Successful!",
          icon: "success",
          timer: 2000,
          position: "bottom-end",
          timerProgressBar: true,
          showConfirmButton: false,
          customClass: {
            popup: 'my-swal-popup',
            timerProgressBar: 'my-progress-bar-edit',
          },
          toast: true
        });
        setEditIndex(null);
        setIsDateEditable(true);
      } else {
        setExpenseData([...expenseData, data]);
        Swal.fire({
          title: "Expense Added Successfully!",
          icon: "success",
          position: "bottom-right",
          background: "#fef2f2",
          timer: 2000,
          color: "#34d399",
          timerProgressBar: true,
          customClass: {
            popup: "w-80 sm:w-96 md:w-1/3 border-2 border-green-300 rounded-lg shadow-xl p-6",
            confirmButton: "bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-all duration-300",
            timerProgressBar: 'my-progress-bar-edit',
            title: "font-semibold text-lg md:text-xl text-center text-green-700"
          },
          showConfirmButton: false,
          backdrop: false,
          toast: true,
        });
      }

      setData({ remark: "", amount: "", date: "" });
    } else {
      Swal.fire({
        icon: "error",
        title: "Fill all the input fields",
        background: "#fef2f2",
        color: "#b91c1c",
        confirmButtonText: "Okay",
        customClass: {
          popup: "w-96 sm:w-96 md:w-1/3 border-2 border-red-300 rounded-lg shadow-lg",
          title: "font-semibold text-red-700 text-2xl",
          confirmButton: "bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700",
        },
        buttonsStyling: false,
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
    }).replace(" ", "T");

    setData({
      remark: expenseData[index].remark,
      amount: expenseData[index].amount,
      date: currentDateTime,
    });

    setIsDateEditable(false);
    setEditIndex(index);

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
      iconColor: '#b91c1c',
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: "#fef2f2",
      color: "#b91c1c",
      customClass: {
        popup: "w-96 sm:w-96 md:w-1/3 border-2 border-red-300 rounded-lg shadow-lg",
        confirmButton: "bg-red-700 text-white px-4 py-2 rounded hover:bg-red-700",
        cancelButton: "bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700",
        icon: "swal2-icon swal2-icon-question text-red-800 border-4 border-red-800 bg-transparent"
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deletion Successful",
          icon: "success",
          position: "bottom-right",
          background: "#FEF2F2",
          customClass: {
            popup: 'my-swal-popup',
            title: "font-semibold text-lg md:text-xl text-center text-red-700"
          },
          showConfirmButton: false,
          backdrop: false,
          timer: 2000,
          toast: true,
          iconColor: "#b91c1c",
        });
        const filteredData = expenseData.filter((_, i) => i !== index);
        setExpenseData(filteredData);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return;
      }
    });
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="backdrop-blur-lg bg-white/30 rounded-3xl shadow-xl p-8 border border-white/50">
          <h2 className="text-3xl font-bold text-gray-800/90 mb-8">
            {editIndex !== null ? "Edit Expense" : "Add New Expense"}
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
                  placeholder="What's this expense for?"
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
                  disabled={!isDateEditable}
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
                {editIndex !== null ? "Update Expense" : "Add Expense"}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8">
          <ExpenseList
            expenseData={expenseData}
            editHandler={editHandler}
            deleteHandler={deleteHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default Expense;
