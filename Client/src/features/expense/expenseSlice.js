// src/redux/expenseSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenseData: [
    {
      remark: "asdfasdf",
      amount: "200",
      date: "Oct 20, 2025, 2:44 AM",
    },
    {
      remark: "ad",
      amount: "400",
      date: "Dec 20, 2025, 2:44 AM",
    },
    {
      remark: "aqwe",
      amount: "300",
      date: "Apr 20, 2025, 2:44 AM",
    },
    {
      remark: "Lotfddfasdtery",
      amount: "700",
      date: "Jan 22, 2025, 09:24 PM",
    },
    {
      remark: "Lofasdfttery",
      amount: "1000",
      date: "Feb 29, 2025, 01:24 PM",
    },
  ],
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.expenseData.push(action.payload);
    },
    updateExpense: (state, action) => {
      const { index, newData } = action.payload;
      state.expenseData[index] = newData;
    },
    deleteExpense: (state, action) => {
      const { index } = action.payload;
      state.expenseData = state.expenseData.filter((_, i) => i !== index);
    },
  },

});
export const selectTop3Expense = (state) => {
  const sortedExpense = [...state.expense.expenseData]
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort descending by date
    .slice(0, 3); // Get top 3
  return sortedExpense;
};

export const { addExpense, updateExpense, deleteExpense } = expenseSlice.actions;

export default expenseSlice.reducer;
