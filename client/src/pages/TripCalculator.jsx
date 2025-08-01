import TripExpenseCalculator from "@/components/TripExpenseCalculator/ExpenseCalculator";
import React from "react";

const TripCalculatorPage = () => {
    return (
        <div className="mx-auto p-4 min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-pink-900 overflow-x-hidden">
            <TripExpenseCalculator/>
        </div>
    )
}

export default TripCalculatorPage;