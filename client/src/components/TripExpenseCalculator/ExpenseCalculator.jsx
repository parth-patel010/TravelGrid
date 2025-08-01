import React, { useState } from "react";
import ExpenseInputRow from "./ExpenseInputRow";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TripExpenseCalculator = () => {
    const [expense, setExpense] = useState({
        transport: "",
        accommodation: "",
        food: "",
        activities: "",
        localTransport: "",
        miscellaneous: "",
    });

    const [mode, setMode] = useState("Individual");
    const [numPeople, setNumPeople] = useState(1);

    const handleChange = (category, value) => {
        setExpense((prev) => ({
        ...prev,
        [category]: value,
        }));
    };

    const total = Object.values(expense).reduce(
        (sum, val) => sum + Number(val || 0),
        0
    );

    const displayedTotal =
        mode === "group" ? total / Math.max(numPeople, 1) : total;

    const chartData = Object.entries(expense)
        .filter(([ , value]) => Number(value) > 0)
        .map(([category, value]) => ({
            name: category.charAt(0).toUpperCase() + category.slice(1),
            value: Number(value),
        }))

        const COLORS = ['#f43f5e', '#fb7185', '#fda4af', '#fecdd4', '#fbcfe8', '#f9a8d4'];

    return (
    <div className="bg-gradient-to-br from-[#fef8f4] to-[#fcefe4] rounded-2xl shadow-2xl p-8 border border-[#f9e7dc] max-w-xl mx-auto my-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Trip Expense Calculator
        </h2>

        <div className="flex justify-center mb-6">
        <div className="inline-flex bg-[#fae7de] rounded-full p-1">
            {["Individual", "group"].map((option) => (
            <button
              key={option}
              onClick={() => setMode(option)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                mode === option
                  ? "bg-gradient-to-r from-[#f7a593] to-[#ec7373] text-white shadow-md"
                  : "text-[#d26767]"
              }`}
            >
              {option === "Individual" ? "Individual" : "group"}
            </button>
          ))}
        </div>
        </div>

        {Object.keys(expense).map((category) => (
            <ExpenseInputRow
            key={category}
            label={category}
            value={expense[category]}
            onChange={(val) => handleChange(category, val)}
            inputClassName="w-full px-4 py-3 border-2 border-[#f3cfc0] rounded-xl focus:border-[#ec9488] focus:ring-4 focus:ring-[#f8e5dc] transition-all outline-none bg-white"
            />
        ))}

        {mode === "group" && (
        <div className="flex items-center gap-4 mt-6">
            <label className="text-sm font-semibold text-gray-700">
                Number of People:
            </label>
            <input
                type="number"
                min="1"
                value={numPeople}
                onChange={(e) => setNumPeople(Number(e.target.value))}
                className="w-24 px-4 py-2 border-2 border-[#f3cfc0] rounded-xl focus:border-[#ec9488] focus:ring-4 focus:ring-[#f8e5dc] outline-none bg-white"
            />
        </div>
        )}

        <div className="mt-8 text-center">
            <p className="text-lg font-semibold text-gray-800">
            Total Cost:
             <span className="ml-2 text-[#e46e6e]">₹{displayedTotal.toFixed(2)}</span>
            <span className="ml-1 text-gray-500 text-sm">
                ({mode === "group" ? "Per Person" : "Individual Total"})
            </span>
            </p>
        </div>

        <div className="mt-12 p-8">
            <h3 className="text-2xl font-bold text-center mb-2 text-gray-900">Expense Breakdown</h3>
            <ResponsiveContainer width="100%" height={450} >
                <PieChart margin={{ top: 30, bottom: 60 }}>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"  
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label
                        className="mt-10"
                    >  
                    {chartData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                    ))}
                    </Pie>
                    <Tooltip/>
                    <Legend layout="horizontal" verticalAlign="bottom" align="center" />             
                </PieChart>
            </ResponsiveContainer>
        </div>
    </div>
  );
};

export default TripExpenseCalculator;
