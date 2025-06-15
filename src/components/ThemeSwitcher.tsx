
import React from "react";
import { useTheme } from "@/theme/themeContext";
import { themes, ThemeName } from "@/theme/themes";
import { Sun, Moon } from "lucide-react";

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {Object.entries(themes).map(([key, t]) => (
        <button
          key={key}
          className={`px-3 py-1 text-xs font-bold rounded-lg transition-all border border-transparent ${theme === key ? "ring-2 ring-accent" : ""}`}
          style={{ fontFamily: t.fontFamily, background: "rgba(255,255,255,0.4)" }}
          onClick={() => setTheme(key as ThemeName)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
};
