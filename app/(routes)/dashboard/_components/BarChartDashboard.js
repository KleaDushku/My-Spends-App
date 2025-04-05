import React from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function BarChartDashboard({ budgetList }) {
  return (
    <div className="border rounded-2xl p-5 bg-gradient-to-r from-purple-800 via-fuchsia-600 to-pink-500 text-white">
      <h2 className="font-bold text-lg">Activity</h2>
      <div className="mt-4">
        <p className="mb-4">
          Welcome to <strong className="text-yellow-300">My Spends App!</strong>
        </p>
        <ResponsiveContainer width={"80%"} height={300}>
          <BarChart
            data={budgetList}
            margin={{
              top: 7,
            }}
          >
            <XAxis dataKey="name" stroke="#FFFF" />
            {<YAxis stroke="#FFFFFF" />}
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '0.5rem'
              }}
            />
            <Legend />
          <Bar dataKey="totalSpend" stackId="a" fill="#4845d2" activeBar={false} />
         <Bar dataKey="amount" stackId="a" fill="#C3C2FF" activeBar={false} />

          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BarChartDashboard;