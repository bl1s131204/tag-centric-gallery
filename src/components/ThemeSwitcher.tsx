
import React from "react";
import { useTheme } from "@/theme/themeContext";
import { themes, ThemeName } from "@/theme/themes";
import { Sun, Moon } from "lucide-react";

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex flex-wrap gap-3 items-center p-4 rounded-2xl border border-white/10"
         style={{
           background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
           backdropFilter: "blur(20px)"
         }}>
      <div className="flex items-center gap-2 font-medium text-foreground">
        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
          <span className="text-xs">🎨</span>
        </div>
        <span className="text-sm">Themes:</span>
      </div>
      
      {Object.entries(themes).map(([key, t]) => (
        <button
          key={key}
          className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 border ${
            theme === key 
              ? "bg-gradient-to-r from-primary to-purple-600 text-white border-transparent shadow-lg scale-105" 
              : "bg-white/10 text-gray-300 border-white/20 hover:bg-white/20 hover:text-white hover:scale-105"
          }`}
          style={{ fontFamily: t.fontFamily }}
          onClick={() => setTheme(key as ThemeName)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
};
