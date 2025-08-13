import TripExpenseCalculator from "..//components/TripExpenseCalculator/ExpenseCalculator";
import React from "react";
import { useTheme } from "../context/ThemeContext";

const TripCalculatorPage = () => {
    const { isDarkMode } = useTheme();

    const backgroundClass = isDarkMode 
        ? 'bg-gradient-to-br from-black via-gray-900 to-pink-900' 
        : 'bg-gradient-to-br from-rose-300 via-blue-200 to-gray-300';

    return (
        <div className={`mx-auto p-4 min-h-screen w-full overflow-x-hidden transition-all duration-300 ${backgroundClass}`}>
            <TripExpenseCalculator />
        </div>
    )
}

export default TripCalculatorPage;