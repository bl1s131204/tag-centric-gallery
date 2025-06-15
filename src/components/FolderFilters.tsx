
import React from "react";
import { Search, SlidersHorizontal, LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { themes } from "@/theme/themes";
import { useTheme } from "@/theme/themeContext";

type SortBy = "dateCreated" | "lastModified" | "count" | "az";
type ViewType = "grid" | "list";

type FolderFiltersProps = {
  search: string;
  onSearchChange: (v: string) => void;
  sort: SortBy;
  onSortChange: (v: SortBy) => void;
  view: ViewType;
  onViewChange: (v: ViewType) => void;
};

export const FolderFilters: React.FC<FolderFiltersProps> = ({
  search,
  onSearchChange,
  sort,
  onSortChange,
  view,
  onViewChange,
}) => {
  const { theme } = useTheme();
  const themeColors = themes[theme].colors;
  return (
    <div className="flex flex-wrap items-center gap-3 w-full mb-7">
      {/* Search bar */}
      <div className="relative flex-1 max-w-[290px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="Search folders..."
          className="w-full pl-10 pr-4 py-2.5 rounded-full border border-black/10 bg-white dark:bg-[#17181b] shadow focus:ring-2 focus:ring-accent outline-none transition"
          style={{ color: themeColors.text }}
        />
      </div>
      {/* Sort toggles */}
      <div className="flex gap-2 items-center">
        <span className="text-gray-500 text-xs">Sort:</span>
        <select
          className={cn(
            "rounded px-3 py-2 border border-black/10 bg-white dark:bg-[#23253f] text-sm shadow focus:border-accent focus:ring-2 focus:ring-accent transition"
          )}
          style={{ color: themeColors.text }}
          value={sort}
          onChange={e => onSortChange(e.target.value as SortBy)}
        >
          <option value="dateCreated">Date Created</option>
          <option value="lastModified">Last Modified</option>
          <option value="count">Number of Images</option>
          <option value="az">A-Z</option>
        </select>
      </div>
      {/* Grid/List view toggles */}
      <div className="flex ml-auto gap-1">
        <button
          className={cn(
            "p-2 rounded transition border",
            view === "grid"
              ? "bg-accent border-accent text-white"
              : "bg-white dark:bg-[#23253f] border-black/10 text-gray-500 hover:text-accent"
          )}
          onClick={() => onViewChange("grid")}
          aria-pressed={view === "grid"}
        >
          <LayoutGrid size={19} />
        </button>
        <button
          className={cn(
            "p-2 rounded transition border",
            view === "list"
              ? "bg-accent border-accent text-white"
              : "bg-white dark:bg-[#23253f] border-black/10 text-gray-500 hover:text-accent"
          )}
          onClick={() => onViewChange("list")}
          aria-pressed={view === "list"}
        >
          <List size={19} />
        </button>
      </div>
    </div>
  );
};
