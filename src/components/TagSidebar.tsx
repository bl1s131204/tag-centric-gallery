
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import { useTheme } from "@/theme/themeContext";
import { themes } from "@/theme/themes";

type TagSidebarProps = {
  tags: { name: string; count: number }[];
  active: string | null;
  onSelect: (tag: string | null) => void;
};
export const TagSidebar: React.FC<TagSidebarProps> = ({ tags, active, onSelect }) => {
  const [search, setSearch] = useState("");
  const { theme } = useTheme();
  const themeColors = themes[theme].colors;

  const filtered = tags.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <aside
      className={`sticky top-[70px] h-[calc(100vh-70px)] min-w-[220px] max-w-[280px] p-4 flex flex-col overflow-y-auto z-40 border-r ${themeColors.sidebar}`}
      style={{ transition: "left 0.2s", borderColor: `${themeColors.accent}33` }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg" style={{ color: themeColors.accent }}>Filter by Tags</h3>
        <Info size={16} className="text-gray-400" />
      </div>
      <input
        className={`w-full px-3 py-2 mb-4 rounded-lg bg-[#22252d] border focus:outline-none focus:ring-2`}
        style={{ borderColor: `${themeColors.accent}80`, '--tw-ring-color': themeColors.accent } as React.CSSProperties}
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search tags..."
      />
      <button
        className={cn(
          "mb-2 px-3 py-2 text-left w-full rounded-full font-semibold transition-colors",
          !active ? "" : `hover:bg-[${themeColors.accent}]/20`
        )}
        style={!active ? { backgroundColor: themeColors.accent, color: themeColors.accentText } : {}}
        onClick={() => onSelect(null)}
      >
        Show All <span className="text-xs opacity-70">({tags.reduce((s, t) => s + t.count, 0)})</span>
      </button>
      <ul className="space-y-1">
        {filtered.map(tag => (
          <li key={tag.name}>
            <button
              className={cn(
                "w-full text-left px-3 py-1.5 rounded-full flex justify-between items-center transition-colors",
                active !== tag.name && `hover:bg-[${themeColors.accent}]/20`
              )}
              style={active === tag.name ? { backgroundColor: themeColors.accent, color: themeColors.accentText } : {}}
              onClick={() => onSelect(tag.name)}
            >
              <span>{tag.name}</span>
              <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${themeColors.badge} ${themeColors.badgeText}`}>{tag.count}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};
