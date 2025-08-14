import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useThemeStyles } from '../hooks/useThemeStyles';

const ThemeTest = () => {
    const { isDarkMode, toggleTheme, theme, isInitialized } = useTheme();
    const themeStyles = useThemeStyles();

    if (!isInitialized) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg">Initializing theme...</div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen transition-all duration-300 ${themeStyles.baseClasses.container}`}>
            <div className={themeStyles.layout.container}>
                <div className={themeStyles.layout.section}>
                    <h1 className={`text-4xl font-bold mb-8 ${themeStyles.text.primary}`}>
                        Theme System Test
                    </h1>

                    {/* Theme Status */}
                    <div className={`p-6 rounded-lg mb-8 ${themeStyles.componentClasses.card}`}>
                        <h2 className={`text-2xl font-semibold mb-4 ${themeStyles.text.primary}`}>
                            Current Theme Status
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className={`mb-2 ${themeStyles.text.secondary}`}>
                                    <strong>Theme:</strong> {theme}
                                </p>
                                <p className={`mb-2 ${themeStyles.text.secondary}`}>
                                    <strong>Dark Mode:</strong> {isDarkMode ? 'Yes' : 'No'}
                                </p>
                                <p className={`mb-2 ${themeStyles.text.secondary}`}>
                                    <strong>Initialized:</strong> {isInitialized ? 'Yes' : 'No'}
                                </p>
                            </div>
                            <div>
                                <button
                                    onClick={toggleTheme}
                                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${themeStyles.componentClasses.button.primary}`}
                                >
                                    Toggle Theme
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Component Examples */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Cards */}
                        <div className={`p-6 rounded-lg ${themeStyles.componentClasses.card}`}>
                            <h3 className={`text-xl font-semibold mb-3 ${themeStyles.text.primary}`}>
                                Card Example
                            </h3>
                            <p className={`mb-4 ${themeStyles.text.secondary}`}>
                                This is a theme-aware card component that automatically adapts to the current theme.
                            </p>
                            <button className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${themeStyles.componentClasses.button.secondary}`}>
                                Secondary Button
                            </button>
                        </div>

                        {/* Inputs */}
                        <div className={`p-6 rounded-lg ${themeStyles.componentClasses.card}`}>
                            <h3 className={`text-xl font-semibold mb-3 ${themeStyles.text.primary}`}>
                                Input Example
                            </h3>
                            <input
                                type="text"
                                placeholder="Enter some text..."
                                className={`w-full mb-4 ${themeStyles.componentClasses.input}`}
                            />
                            <button className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${themeStyles.componentClasses.button.outline}`}>
                                Outline Button
                            </button>
                        </div>

                        {/* Colors */}
                        <div className={`p-6 rounded-lg ${themeStyles.componentClasses.card}`}>
                            <h3 className={`text-xl font-semibold mb-3 ${themeStyles.text.primary}`}>
                                Color Palette
                            </h3>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <div className="w-4 h-4 bg-pink-500 rounded"></div>
                                    <span className={`text-sm ${themeStyles.text.primary}`}>Primary Text</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-4 h-4 bg-gray-500 rounded"></div>
                                    <span className={`text-sm ${themeStyles.text.secondary}`}>Secondary Text</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-4 h-4 bg-gray-400 rounded"></div>
                                    <span className={`text-sm ${themeStyles.text.muted}`}>Muted Text</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CSS Variables Test */}
                    <div className={`p-6 rounded-lg mt-8 ${themeStyles.componentClasses.card}`}>
                        <h2 className={`text-2xl font-semibold mb-4 ${themeStyles.text.primary}`}>
                            CSS Variables Test
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h3 className={`text-lg font-medium mb-2 ${themeStyles.text.primary}`}>
                                    Background Colors
                                </h3>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-6 h-6 rounded" style={{ backgroundColor: 'var(--bg-primary)' }}></div>
                                        <span className={`text-sm ${themeStyles.text.secondary}`}>--bg-primary</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-6 h-6 rounded" style={{ backgroundColor: 'var(--bg-secondary)' }}></div>
                                        <span className={`text-sm ${themeStyles.text.secondary}`}>--bg-secondary</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-6 h-6 rounded" style={{ backgroundColor: 'var(--bg-tertiary)' }}></div>
                                        <span className={`text-sm ${themeStyles.text.secondary}`}>--bg-tertiary</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className={`text-lg font-medium mb-2 ${themeStyles.text.primary}`}>
                                    Text Colors
                                </h3>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-6 h-6 rounded" style={{ backgroundColor: 'var(--text-primary)' }}></div>
                                        <span className={`text-sm ${themeStyles.text.secondary}`}>--text-primary</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-6 h-6 rounded" style={{ backgroundColor: 'var(--text-secondary)' }}></div>
                                        <span className={`text-sm ${themeStyles.text.secondary}`}>--text-secondary</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-6 h-6 rounded" style={{ backgroundColor: 'var(--accent-primary)' }}></div>
                                        <span className={`text-sm ${themeStyles.text.secondary}`}>--accent-primary</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className={`p-6 rounded-lg mt-8 ${themeStyles.componentClasses.card}`}>
                        <h2 className={`text-2xl font-semibold mb-4 ${themeStyles.text.primary}`}>
                            Testing Instructions
                        </h2>
                        <div className={`space-y-2 ${themeStyles.text.secondary}`}>
                            <p>1. Click the "Toggle Theme" button to switch between light and dark themes</p>
                            <p>2. Observe how all components automatically adapt to the new theme</p>
                            <p>3. Check that colors, backgrounds, and text are consistent across all elements</p>
                            <p>4. Verify that the theme persists after page refresh</p>
                            <p>5. Test on different pages to ensure theme consistency</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThemeTest;
