
import React from "react";
import { useTheme } from "@/theme/themeContext";
import { themes, ThemeName } from "@/theme/themes";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ThemeDropdown: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <Palette className="w-5 h-5 mr-1" />
          Themes
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.entries(themes).map(([key, t]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => setTheme(key as ThemeName)}
            className={theme === key ? "font-bold bg-accent text-accent-foreground" : ""}
            style={{ fontFamily: t.fontFamily }}
          >
            {t.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
