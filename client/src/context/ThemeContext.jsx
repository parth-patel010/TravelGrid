import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      // Check localStorage first, then system preference
      const savedTheme = localStorage.getItem('travelgrid_theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      // Check system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (error) {
      console.warn('Theme initialization failed:', error);
      return false; // Default to light mode on error
    }
  });

  const [isInitialized, setIsInitialized] = useState(false);

  // Enhanced theme application function
  const applyTheme = useCallback((darkMode) => {
    try {
      const root = document.documentElement;
      const body = document.body;

      // Remove existing theme classes
      root.classList.remove('dark', 'light');
      root.removeAttribute('data-theme');

      // Apply new theme
      if (darkMode) {
        root.classList.add('dark');
        root.setAttribute('data-theme', 'dark');
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
      } else {
        root.classList.add('light');
        root.setAttribute('data-theme', 'light');
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
      }

      // Force a reflow to ensure CSS variables are applied
      root.offsetHeight;

      // Dispatch custom event for components to listen to
      window.dispatchEvent(new CustomEvent('themeChanged', {
        detail: { isDarkMode: darkMode }
      }));

    } catch (error) {
      console.error('Failed to apply theme:', error);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  // Initialize theme on mount
  useEffect(() => {
    if (!isInitialized) {
      applyTheme(isDarkMode);
      setIsInitialized(true);
    }
  }, [isInitialized, isDarkMode, applyTheme]);

  // Apply theme changes
  useEffect(() => {
    if (isInitialized) {
      applyTheme(isDarkMode);
    }
  }, [isDarkMode, isInitialized, applyTheme]);

  // Save theme preference to localStorage
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem('travelgrid_theme', isDarkMode ? 'dark' : 'light');
      } catch (error) {
        console.warn('Failed to save theme preference:', error);
      }
    }
  }, [isDarkMode, isInitialized]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // Only update if user hasn't manually set a preference
      if (!localStorage.getItem('travelgrid_theme')) {
        setIsDarkMode(e.matches);
      }
    };

    try {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } catch (error) {
      console.warn('Failed to listen for system theme changes:', error);
    }
  }, []);

  // Provide theme state and utilities
  const value = {
    isDarkMode,
    toggleTheme,
    isInitialized,
    theme: isDarkMode ? 'dark' : 'light',
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 