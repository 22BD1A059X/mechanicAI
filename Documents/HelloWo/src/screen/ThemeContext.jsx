import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const themes = {
    light: {
      background: '#FFFFFF',
      text: '#000000',
      primary: 'maroon',
      secondary: 'grey',
      modalBackground: '#FFFFFF',
      modalOverlay: 'rgba(0, 0, 0, 0.5)',
    },
    dark: {
      background: '#121212',
      text: '#FFFFFF',
      primary: '#FF6B6B',
      secondary: '#4A4A4A',
      modalBackground: '#242424',
      modalOverlay: 'rgba(0, 0, 0, 0.7)',
    },
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme: isDarkMode ? themes.dark : themes.light }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);