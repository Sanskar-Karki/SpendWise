import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const financialData = [
  { month: "January", income: 5000, expense: 2000 },
  { month: "February", income: 4000, expense: 2500 },
  { month: "March", income: 6000, expense: 3000 },
  { month: "April", income: 7000, expense: 4000 },
  { month: "May", income: 8000, expense: 4500 },
  { month: "June", income: 7500, expense: 5000 },
  { month: "July", income: 8500, expense: 5500 },
  { month: "August", income: 9000, expense: 6000 },
  { month: "September", income: 9500, expense: 6500 },
  { month: "October", income: 10000, expense: 7000 },
  { month: "November", income: 11000, expense: 7500 },
  { month: "December", income: 12000, expense: 8000 },
];

const Chart = () => {
  return (
    <div className="w-full h-[450px] bg-opacity-10 bg-white p-5 rounded-xl">
      <h2 className="text-center mb-5 text-gray-100"> Income vs Expense</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={financialData} margin={{ top: 20, right: 50, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="black" />
          <Line type="monotone" dataKey="income" stroke="green" strokeWidth={2} />
          <Line type="monotone" dataKey="expense" stroke="red" strokeWidth={2} />

          <XAxis
            dataKey="month"
            stroke="#000"
            tickFormatter={(month) => month.length > 6 ? `${month.slice(0, 3)}.` : month}
            interval={0} /
          >

          <YAxis stroke="#000" />
          <Legend />
          <Tooltip content={<CustomTooltip />} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 p-2 rounded-md text-gray-100">
        <p className="font-bold mb-2">{label}</p>
        <p className="text-green-400">
          Income: <span className="ml-2">NPR {payload[0].value}</span>
        </p>
        <p className="text-red-400">
          Expense: <span className="ml-2">NPR {payload[1].value}</span>
        </p>
      </div>
    );
  }

  return null;
};

export default Chart;
