import PackingChecklist from "../components/TravelPackingChecklist/PackingChecklist";
import React from "react";
import { useTheme } from "../context/ThemeContext";

const PackingChecklistPage = () => {
    const { isDarkMode } = useTheme();

    const backgroundClass = isDarkMode
        ? 'bg-gradient-to-br from-black via-gray-900 to-pink-900'
        : 'bg-gradient-to-br from-rose-300 via-blue-200 to-gray-300';

    return (
        <div className={`mx-auto p-10 min-h-screen w-full overflow-x-hidden pt-20 transition-all duration-300 ${backgroundClass}`}>
            <PackingChecklist />
        </div>
    )
}

export default PackingChecklistPage;