import React from "react";
import { useTheme } from "../../context/ThemeContext";

const ExpenseInputRow = ({ label, value, onChange, inputClassName }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="mb-4">
      <label className={`block text-sm font-semibold mb-2 capitalize ${isDarkMode ? 'text-white' : 'text-gray-700'
        }`}>
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
};

export default ExpenseInputRow;