// src/context/ThemeContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Check local storage for theme preference
        const savedTheme = localStorage.getItem('darkMode');
        return savedTheme === 'true';
    });

    useEffect(() => {
        // Apply the dark mode class to the body
        document.body.classList.toggle('dark', isDarkMode);
        // Save the user's preference to local storage
        localStorage.setItem('darkMode', isDarkMode);
    }, [isDarkMode]);

    return (
        <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
