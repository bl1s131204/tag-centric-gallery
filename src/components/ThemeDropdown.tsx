import React from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/theme/themeContext";
import { themes, ThemeName } from "@/theme/themes";

export const ThemeDropdown: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-foreground hover:text-foreground hover:bg-muted rounded-full">
          <Palette className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-card shadow-xl border min-w-[180px] z-50 rounded-xl mt-2">
        {Object.entries(themes).map(([key, t]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => setTheme(key as ThemeName)}
            className={`transition font-inter px-3 py-2 rounded flex items-center gap-2 ${
              theme === key ? "font-bold bg-accent text-accent-foreground shadow" : "text-foreground"
            }`}
          >
            <span className="w-4 h-4 rounded-full block bg-gradient-to-br from-primary to-accent mr-2 shadow" />
            {t.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
