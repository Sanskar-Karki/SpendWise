import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Chart from "./Chart";

const ChartData = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [isMonthlyView, setIsMonthlyView] = useState(true);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [availableYears, setAvailableYears] = useState([]);  // Track available years

  const income = useSelector((state) => state.income.incomeData);
  const expense = useSelector((state) => state.expense.expenseData);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  };

  const createEmptyWeekData = (startDate) => {
    const weekData = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      weekData.push({
        date: formatDate(currentDate),
        income: 0,
        expense: 0,
      });
    }
    return weekData;
  };

  useEffect(() => {
    if (income.length > 0 && expense.length > 0) {
      // Extract and combine data
      const extractedData = [
        ...income.map(({ amount, date }) => ({
          date: new Date(date),
          income: Number(amount),
          expense: 0,
        })),
        ...expense.map(({ amount, date }) => ({
          date: new Date(date),
          income: 0,
          expense: Number(amount),
        })),
      ].sort((a, b) => a.date - b.date);

      // Process weekly data
      const processedWeeklyData = [];
      let currentStartDate = new Date(extractedData[0].date);
      currentStartDate.setHours(0, 0, 0, 0);

      while (currentStartDate <= extractedData[extractedData.length - 1].date) {
        const weekEnd = new Date(currentStartDate);
        weekEnd.setDate(weekEnd.getDate() + 6);

        const weekData = createEmptyWeekData(currentStartDate);

        extractedData.forEach((entry) => {
          if (entry.date >= currentStartDate && entry.date <= weekEnd) {
            const dayIndex = Math.floor((entry.date - currentStartDate) / (1000 * 60 * 60 * 24));
            if (dayIndex >= 0 && dayIndex < 7) {
              weekData[dayIndex].income += entry.income;
              weekData[dayIndex].expense += entry.expense;
            }
          }
        });

        processedWeeklyData.push(weekData);
        currentStartDate.setDate(currentStartDate.getDate() + 7);
      }

      // Process monthly data by year
      const groupedByMonth = Array.from({ length: 12 }, (_, index) => {
        const monthIndex = index;
        const monthName = new Date(new Date().getFullYear(), monthIndex, 1).toLocaleString("default", { month: "short" });
        return { date: monthName, income: 0, expense: 0 };
      });

      extractedData.forEach((entry) => {
        const monthIndex = entry.date.getMonth();
        const year = entry.date.getFullYear();
        if (year === currentYear) {
          groupedByMonth[monthIndex].income += entry.income;
          groupedByMonth[monthIndex].expense += entry.expense;
        }
      });

      setWeeklyData(processedWeeklyData);
      setMonthlyData(groupedByMonth);

      // Update the available years
      const yearsInData = Array.from(new Set(extractedData.map((entry) => entry.date.getFullYear())));
      setAvailableYears(yearsInData);
    }
  }, [income, expense, currentYear]); // Re-run when income, expense, or currentYear changes

  // Set the currentWeek to the last week (default view) once weeklyData is set
  useEffect(() => {
    if (weeklyData.length > 0) {
      setCurrentWeek(weeklyData.length - 1); // Set to last week by default
    }
  }, [weeklyData]);

  const isYearDataAvailable = monthlyData.some((data) => data.income > 0 || data.expense > 0);

  return (
    <div>
      <div className="max-w-5xl mx-auto p-6 bg-white/10 backdrop-blur-xl rounded-2xl shadow-lg">
        <div className="mb-6 flex justify-center">
          <button
            onClick={() => setIsMonthlyView(!isMonthlyView)}
            className="px-6 py-3 bg-[#364E97] shadow-[0_4px_6px_rgba(31,41,55,0.6)] hover:shadow-slate-300  rounded-lg text-white font-medium "
          >
            {isMonthlyView ? " Monthly Data" : "Weekly Data"}
          </button>
        </div>

        {isMonthlyView ? (
          <div>
            <div className="flex justify-between items-center px-4 mb-4">
              <button
                onClick={() => setCurrentYear(currentYear - 1)}
                disabled={!availableYears.includes(currentYear - 1)}
                className={`px-6 py-3  text-white rounded-lg ${!availableYears.includes(currentYear - 1)
                  ? "bg-white/10 shadow-lg cursor-not-allowed text-white/50"
                  : "bg-[#364E97] hover:bg-blue-700  text-white backdrop-blur-md border border-white/40"
                  } transition-all duration-300`}
              >
                Previous Year
              </button>

              <span className="text-2xl font-bold mr-5 text-blue">{currentYear}</span>

              <button
                onClick={() => setCurrentYear(currentYear + 1)}
                disabled={!availableYears.includes(currentYear + 1)}
                className={`px-6 py-3  rounded-lg ${!availableYears.includes(currentYear + 1)
                  ? "bg-white/10 shadow-lg cursor-not-allowed text-white/50"
                  : "bg-[#364E97] hover:bg-blue-700  text-white backdrop-blur-md border border-white/40"
                  } transition-all duration-300`}
              >
                Next Year
              </button>
            </div>

            <Chart data={monthlyData} />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center px-4">
              <button
                onClick={() => setCurrentWeek(Math.max(0, currentWeek - 1))}
                disabled={currentWeek === 0}
                className={`px-6 py-3 rounded-lg transition-all duration-300 ${currentWeek === 0
                  ? "bg-white/10 shadow-lg cursor-not-allowed text-white/50"
                  : "bg-[#364E97] hover:bg-blue-700  text-white backdrop-blur-md border border-white/40"
                  }`}
              >
                Previous Week
              </button>

              <span className="text-lg font-bold mr-6 text-blue">
                Week {currentWeek + 1} of {weeklyData.length}
              </span>

              <button
                onClick={() => setCurrentWeek(Math.min(weeklyData.length - 1, currentWeek + 1))}
                disabled={currentWeek === weeklyData.length - 1}
                className={`px-6 py-3 rounded-lg transition-all duration-300  ${currentWeek === weeklyData.length - 1
                  ? "bg-white/10 shadow-lg cursor-not-allowed text-white/50"
                  : "bg-[#364E97] hover:bg-blue-700  text-white backdrop-blur-md border border-white/40"
                  }`}
              >
                Next Week
              </button>
            </div>

            {weeklyData[currentWeek] && <Chart data={weeklyData[currentWeek]} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartData;
