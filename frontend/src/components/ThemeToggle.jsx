import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ThemeToggle = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'dark');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    // In a real app we'd apply this to document.documentElement
    // Since UI is forced forced dark we will use this as a placeholder structure
  };

  return null; // Interface is purely darkmode, component remains headless
};

export default ThemeToggle;
