import React from "react";

const ExpenseInputRow = ({ label, value, onChange, inputClassName }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">
      {label}
    </label>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={`Enter ${label} cost`}
      className={inputClassName}
    />
  </div>
);


export default ExpenseInputRow;