
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

// Provider
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(() => getTheme() || "glass");
  useEffect(() => {
    setTheme(theme);
  }, [theme]);
  return (
    <ThemeCtx.Provider value={{ theme, setTheme: setThemeState }}>
      <div className={`min-h-screen ${themes[theme].className} ${themes[theme].colors.bg}`} style={{ fontFamily: themes[theme].fontFamily, transition: "background 0.2s, color 0.2s" }}>
        {children}
      </div>
    </ThemeCtx.Provider>
  );
}
