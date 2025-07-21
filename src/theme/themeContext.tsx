
import React, { createContext, useContext, useEffect, useState } from "react";
import { themes, ThemeName } from "./themes";
import { getTheme, setTheme } from "@/utils/localPersistence";

// Type for theme ctx
interface ThemeCtxValue {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}
const ThemeCtx = createContext<ThemeCtxValue | undefined>(undefined);

export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("ThemeCtx not found");
  return ctx;
}

// Validate theme from storage
function getInitialTheme(): ThemeName {
  const stored = getTheme();
  // Only use if it matches allowed themes
  if (stored && typeof stored === "string" && Object.keys(themes).includes(stored)) {
    return stored as ThemeName;
  }
  // Default to the light theme
  return "light";
}

// Provider
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(getInitialTheme);
  
  useEffect(() => {
    // Apply theme to document root
    document.documentElement.className = themes[theme].className;
    document.documentElement.style.fontFamily = themes[theme].fontFamily;
    
    // Persist theme
    setTheme(theme);
  }, [theme]);
  return (
    <ThemeCtx.Provider value={{ theme, setTheme: setThemeState }}>
      <div 
        className={`min-h-screen transition-all duration-300 ${themes[theme].className} ${themes[theme].colors.bg} ${themes[theme].colors.text}`}
        style={{ fontFamily: themes[theme].fontFamily }}
      >
        {children}
      </div>
    </ThemeCtx.Provider>
  );
}
