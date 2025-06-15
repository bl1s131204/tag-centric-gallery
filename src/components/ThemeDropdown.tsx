
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
        <Button variant="ghost" className="flex items-center gap-2 font-poppins text-white hover:text-gold hover:bg-[#191f2b] h-11 shadow">
          <Palette className="w-5 h-5 text-gold" />
          Themes
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[#23283a] shadow-xl border-gold min-w-[180px] z-50 rounded-xl mt-2">
        {Object.entries(themes).map(([key, t]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => setTheme(key as ThemeName)}
            className={`transition font-poppins px-3 py-2 rounded flex items-center gap-2 ${
              theme === key ? "font-bold bg-emerald/80 text-[#171616] shadow" : "text-white"
            }`}
            style={{ fontFamily: t.fontFamily }}
          >
            <span className="w-4 h-4 rounded-full block bg-gradient-to-br from-gold to-emerald mr-2 shadow" />
            {t.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
