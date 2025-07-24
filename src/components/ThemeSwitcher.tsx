
import React from "react";
import { useTheme } from "@/theme/themeContext";
import { themes, ThemeName } from "@/theme/themes";
import { Sun, Moon } from "lucide-react";

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <div className="glass-card p-6 rounded-2xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
          <span className="text-lg">🎨</span>
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Theme Selection</h3>
          <p className="text-sm text-muted-foreground">Choose your preferred visual style</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {Object.entries(themes).map(([key, t]) => (
          <button
            key={key}
            className={`group relative p-4 rounded-xl transition-all duration-300 border-2 ${
              theme === key 
                ? "border-primary bg-primary/10 shadow-lg scale-105" 
                : "border-border hover:border-primary/50 hover:bg-muted/50 hover:scale-102"
            }`}
            style={{ fontFamily: t.fontFamily }}
            onClick={() => setTheme(key as ThemeName)}
          >
            <div className="flex flex-col items-center gap-2">
              <div 
                className="w-8 h-8 rounded-lg border-2 border-border/50 shadow-inner"
                style={{ background: t.gradients.primary }}
              />
              <div className="text-center">
                <div className={`text-sm font-medium ${theme === key ? 'text-primary' : 'text-foreground'}`}>
                  {t.label}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {t.description}
                </div>
              </div>
            </div>
            
            {theme === key && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full shadow-lg animate-scale-in" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
