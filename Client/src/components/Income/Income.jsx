// src/Income.js
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addIncome, updateIncome, deleteIncome } from "../../features/income/incomeSlice.js";
import Swal from "sweetalert2";
import IncomeList from "./IncomeList";
import { motion } from "framer-motion";  // Import framer-motion
import "./Income.css";

const Income = () => {
  const dispatch = useDispatch();
  const incomeData = useSelector((state) => state.income.incomeData);
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
        dispatch(updateIncome({ index: editIndex, newData: data }));
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
          toast: true,
        });
        setEditIndex(null);
        setIsDateEditable(true);
      } else {
        dispatch(addIncome(data));
        Swal.fire({
          title: "Income Added Successfully!",
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
      remark: incomeData[index].remark,
      amount: incomeData[index].amount,
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
        dispatch(deleteIncome({ index }));
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return;
      }
    });
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add animation to the form */}
        <motion.div
          className="transition-  backdrop-blur-lg bg-gradient-to-tr from-white/40 via-white/30 to-white/10 rounded-3xl shadow-2xl p-8 border border-white/50 hover:shadow-3xl transition-shadow duration-500"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{ scale: 1.02, boxShadow: "-10px 10px 200px rgba(50, 205, 50, 0.4)" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-bold text-gray-800/90 mb-8">
            {editIndex !== null ? "Edit Income" : "Add New Income"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700/90">Remark</label>
                <input
                  name="remark"
                  value={data.remark}
                  onChange={handleInput}
                  className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-white/40 
             focus:ring-2 focus:ring-green-600 focus:border-transparent focus:outline-none 
             transition-all duration-500 placeholder-gray-400"
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
                  className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-white/40 
             focus:ring-2 focus:ring-green-600 focus:border-transparent focus:outline-none 
             transition-all duration-500 placeholder-gray-400"
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
                  className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-white/40 
             focus:ring-2 focus:ring-green-600 focus:border-transparent focus:outline-none 
             transition-all duration-500 placeholder-gray-400"
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

              <button className="px-8 py-4 sm:px-10 sm:py-4 text-xs  sm:rounded-xl sm:text-lg uppercase font-semibold text-white bg-green-600 border-none rounded-2xl 
            shadow-md transition-all duration-300 ease-in-out cursor-pointer outline-none 
            hover:bg-green-500 hover:shadow-lg hover:text-white hover:translate-y-[-4px]
            active:translate-y-[-1px] w-full sm:w-auto">
                {editIndex !== null ? "Update Income" : "Add Income"}
              </button>
            </div>
          </form>
        </motion.div>

        <div className="mt-8">
          <IncomeList
            incomeData={incomeData}
            deleteHandler={deleteHandler}
            editHandler={editHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default Income;
