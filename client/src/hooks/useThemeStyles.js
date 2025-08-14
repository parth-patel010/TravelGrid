import { useTheme } from '../context/ThemeContext';

/**
 * Custom hook that provides theme-aware styling utilities
 * @returns {Object} Theme-aware styling classes and utilities
 */
export const useThemeStyles = () => {
    const { isDarkMode, theme, isInitialized } = useTheme();

    // Base theme classes
    const baseClasses = {
        container: `theme-aware min-h-screen transition-all duration-300`,
        card: `theme-card rounded-lg shadow-md transition-all duration-300`,
        input: `theme-input rounded-md px-3 py-2 transition-all duration-300`,
        button: `theme-button px-4 py-2 rounded-md font-medium transition-all duration-300`,
        text: {
            primary: isDarkMode ? 'text-gray-100' : 'text-gray-900',
            secondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
            muted: isDarkMode ? 'text-gray-400' : 'text-gray-500',
            accent: 'text-pink-500',
        },
        background: {
            primary: isDarkMode ? 'bg-slate-900' : 'bg-white',
            secondary: isDarkMode ? 'bg-slate-800' : 'bg-gray-50',
            tertiary: isDarkMode ? 'bg-slate-700' : 'bg-gray-100',
        },
        border: {
            primary: isDarkMode ? 'border-slate-700' : 'border-gray-200',
            secondary: isDarkMode ? 'border-slate-600' : 'border-gray-300',
        },
        shadow: {
            primary: isDarkMode ? 'shadow-slate-900/30' : 'shadow-gray-900/10',
            secondary: isDarkMode ? 'shadow-slate-900/20' : 'shadow-gray-900/05',
        }
    };

    // Theme-aware component classes
    const componentClasses = {
        navbar: `${baseClasses.background.primary} border-b ${baseClasses.border.primary} backdrop-blur-md`,
        footer: `${baseClasses.background.secondary} border-t ${baseClasses.border.primary}`,
        hero: `${baseClasses.background.primary} ${baseClasses.text.primary}`,
        section: `${baseClasses.background.secondary} ${baseClasses.text.primary}`,
        card: `${baseClasses.card} ${baseClasses.background.secondary} ${baseClasses.border.primary}`,
        button: {
            primary: `${baseClasses.button} bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700`,
            secondary: `${baseClasses.button} ${baseClasses.background.secondary} ${baseClasses.text.primary} ${baseClasses.border.primary}`,
            outline: `${baseClasses.button} border-2 ${baseClasses.border.primary} ${baseClasses.text.primary} hover:${baseClasses.background.secondary}`,
        },
        input: `${baseClasses.input} ${baseClasses.background.secondary} ${baseClasses.text.primary} ${baseClasses.border.primary}`,
        link: `${baseClasses.text.accent} hover:${baseClasses.text.primary} transition-colors duration-200`,
    };

    // Theme-aware spacing and layout
    const layout = {
        container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
        section: 'py-12 sm:py-16 lg:py-20',
        card: 'p-6 sm:p-8',
        button: 'px-6 py-3',
    };

    // Animation classes
    const animations = {
        fadeIn: 'animate-fade-in',
        slideUp: 'animate-slide-up',
        scaleIn: 'animate-scale-in',
        hover: 'hover:scale-105 hover:shadow-lg transition-all duration-300',
    };

    return {
        isDarkMode,
        theme,
        isInitialized,
        baseClasses,
        componentClasses,
        layout,
        animations,
        // Utility function to combine classes
        combine: (...classes) => classes.filter(Boolean).join(' '),
        // Theme-aware conditional classes
        conditional: (lightClass, darkClass) => isDarkMode ? darkClass : lightClass,
    };
};
