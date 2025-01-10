import { useState } from "react";
import { useSelector } from "react-redux";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

// Chart Component
const Chart = ({ data }) => {
  const [hoveredLine, setHoveredLine] = useState(null);

  if (!data || data.length === 0) {
    return (
      <div className="relative w-full h-[520px] bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center shadow-lg">
        <div className="text-white/70 font-medium">No data available</div>
      </div>
    );
  }

  const handleMouseEnter = (line) => {
    setHoveredLine(line);
  };

  const handleMouseLeave = () => {
    setHoveredLine(null);
  };

  return (

    <div className="relative w-full h-[520px] p-6 pb-16">
      {/* Glassmorphic background */}

      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-white/10 to-white/50 rounded-3xl shadow-2xl p-8 shadow-[0px_0px_50px_5px_rgba(255,255,255,0.4)] border-white/50 rounded-xl shadow-lg" />

      {/* Content */}
      <div className="relative">


        <ResponsiveContainer width="100%" height={420}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 0 }}>
            {/* Styled grid with black lines and a more visible middle line */}
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(0, 0, 0, 0.6)" // Darker black grid lines
              vertical={false}
            />

            {/* Income Line */}
            <Line
              type="monotone"
              dataKey="income"
              stroke={hoveredLine === "income" ? "#2D9B5F" : "#33AC62"}  // Darker green on hover
              strokeWidth={4}  // Increased line width
              dot={{
                fill: "#33AC62", // Green for dot color
                r: 6,  // Larger dot size
                strokeWidth: 2,
                stroke: "#fff" // White stroke for better visibility
              }}
              activeDot={{
                r: 8,
                stroke: "white",
                strokeWidth: 2
              }}
              onMouseEnter={() => handleMouseEnter("income")}
              onMouseLeave={handleMouseLeave}
            />

            {/* Expense Line */}
            <Line
              type="monotone"
              dataKey="expense"
              stroke={hoveredLine === "expense" ? "#9B1D1D" : "#DC2626"}  // Darker red on hover
              strokeWidth={4}  // Increased line width
              dot={{
                fill: "#f87171", // Red for dot color
                r: 6,  // Larger dot size
                strokeWidth: 2,
                stroke: "#fff" // White stroke for better visibility
              }}
              activeDot={{
                r: 8,
                stroke: "white",
                strokeWidth: 2
              }}
              onMouseEnter={() => handleMouseEnter("expense")}
              onMouseLeave={handleMouseLeave}
            />

            {/* Styled axes with black text */}
            <YAxis
              stroke="rgba(0,0,0,0.8)" // Black color for Y-axis text
              tickLine={{ stroke: "rgba(0,0,0,0.5)" }} // Darker tick lines
              axisLine={{ stroke: "rgba(0,0,0,0.6)" }} // Darker axis line
              tick={{ fill: 'rgba(0,0,0,0.8)', fontSize: 16 }} // Black color for tick labels
              tickFormatter={(value) => value.toLocaleString()}
            />
            <XAxis
              dataKey={data[0]?.date ? "date" : "month"}
              stroke="rgba(0,0,0,0.8)" // Black color for X-axis text
              tickLine={{ stroke: "rgba(0,0,0,0.5)" }} // Darker tick lines
              axisLine={{ stroke: "rgba(0,0,0,0.6)" }} // Darker axis line
              tickFormatter={(label) => label.length > 6 ? `${label.slice(0, 3)}.` : label}
              interval={0}
              tick={{ fill: 'rgba(0,0,0,0.8)', fontSize: 16 }} // Black color for tick labels
            />

            <Tooltip content={<CustomTooltip />} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800/90 backdrop-blur-sm border border-white/40 p-3 rounded-lg shadow-xl">
        <p className="font-semibold text-white/90 mb-2">{label}</p>
        <p className="text-green-700 font-medium flex items-center justify-between">
          Income:
          <span className="ml-4 font-bold">
            NPR {payload[0].value.toLocaleString()}
          </span>
        </p>
        <p className="text-red-700 font-medium flex items-center justify-between">
          Expense:
          <span className="ml-4 font-bold">
            NPR {payload[1].value.toLocaleString()}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

// ChartData Component
export default Chart;
