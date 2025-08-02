import React, { createContext, useContext, useEffect, useState } from "react";
import { themes, ThemeName } from "./themes";

interface ThemeContextValue {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

function getStoredTheme(): ThemeName {
  try {
    const stored = localStorage.getItem("gallery_theme");
    if (stored && Object.keys(themes).includes(stored)) {
      return stored as ThemeName;
    }
  } catch (error) {
    console.warn("Failed to get stored theme:", error);
  }
  return "light";
}

function storeTheme(theme: ThemeName) {
  try {
    localStorage.setItem("gallery_theme", theme);
  } catch (error) {
    console.warn("Failed to store theme:", error);
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(getStoredTheme);

  const setTheme = (newTheme: ThemeName) => {
    setThemeState(newTheme);
    storeTheme(newTheme);
  };

  useEffect(() => {
    // Apply theme class to document
    const themeClass = themes[theme].className;
    document.documentElement.className = themeClass;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className="min-h-screen transition-colors duration-300">
        {children}
      </div>
    </ThemeContext.Provider>
  );
}