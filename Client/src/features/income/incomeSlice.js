// src/redux/incomeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  incomeData: [
    {
      remark: "Salary",
      amount: "99",
      date: "Jun 10, 2025, 09:25 PM",
    },
    {
      remark: "Bonus",
      amount: "700",
      date: "Jun 10, 2025, 09:26 PM",
    },
    {
      remark: "Tansport",
      amount: "100",
      date: "April 12, 2025, 09:24 PM",
    },
    {
      remark: "Freelance Work",
      amount: "350",
      date: "Jan 9, 2025, 03:24 PM",
    },
    {
      remark: "Bonus",
      amount: "900",
      date: "Jan 8, 2025, 01:15 PM",
    },
    {
      remark: "Gift",
      amount: "500",
      date: "Jan 7, 2025, 06:40 AM",
    },
  ],
};

const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {
    addIncome: (state, action) => {
      state.incomeData.push(action.payload);
    },
    updateIncome: (state, action) => {
      const { index, newData } = action.payload;
      state.incomeData[index] = newData;
    },
    deleteIncome: (state, action) => {
      const { index } = action.payload;
      state.incomeData = state.incomeData.filter((_, i) => i !== index);
    },
  },
});
export const selectTop3Income = (state) => {
  const sortedIncome = [...state.income.incomeData]
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort descending by date
    .slice(0, 3); // Get top 3
  return sortedIncome;
};

export const { addIncome, updateIncome, deleteIncome } = incomeSlice.actions;

export default incomeSlice.reducer;
