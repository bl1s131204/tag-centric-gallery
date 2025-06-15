
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
    setTheme(theme);
  }, [theme]);
  return (
    <ThemeCtx.Provider value={{ theme, setTheme: setThemeState }}>
      <div className="relative min-h-screen">
        <div
          className="fixed inset-0 bg-cover bg-center z-[-2]"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')`,
          }}
        />
        <div className="fixed inset-0 bg-black/60 z-[-1]" />
        <div 
          className={`relative min-h-screen ${themes[theme].className} ${themes[theme].colors.bg} ${themes[theme].colors.text}`}
          style={{ fontFamily: themes[theme].fontFamily, transition: "background 0.2s, color 0.2s" }}
        >
          {children}
        </div>
      </div>
    </ThemeCtx.Provider>
  );
}
