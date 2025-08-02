import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";
import { useTheme } from "@/theme/themeContext";
import { themes, ThemeName } from "@/theme/themes";

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Palette className="h-4 w-4" />
          <span className="sr-only">Switch theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {Object.values(themes).map((t) => (
          <DropdownMenuItem
            key={t.name}
            onClick={() => setTheme(t.name)}
            className={`flex items-center gap-3 ${
              theme === t.name ? "bg-accent" : ""
            }`}
          >
            <div className="flex gap-1">
              <div 
                className="w-3 h-3 rounded-sm border border-border/50"
                style={{ backgroundColor: t.preview.background }}
              />
              <div 
                className="w-3 h-3 rounded-sm border border-border/50"
                style={{ backgroundColor: t.preview.primary }}
              />
              <div 
                className="w-3 h-3 rounded-sm border border-border/50"
                style={{ backgroundColor: t.preview.accent }}
              />
            </div>
            <div className="flex-1">
              <div className="font-medium">{t.label}</div>
              <div className="text-xs text-muted-foreground">{t.description}</div>
            </div>
            {theme === t.name && (
              <div className="w-2 h-2 bg-primary rounded-full" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};