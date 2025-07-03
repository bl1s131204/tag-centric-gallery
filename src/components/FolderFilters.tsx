
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
    <div className="flex flex-wrap items-center gap-4 w-full mb-8 p-6 rounded-2xl border border-white/10"
         style={{
           background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
           backdropFilter: "blur(20px)"
         }}>
      {/* Search bar */}
      <div className="relative flex-1 max-w-[400px]">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="Search folders..."
          className="w-full pl-12 pr-4 py-4 rounded-2xl border border-white/20 bg-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-pink focus:border-transparent outline-none transition-all duration-200 backdrop-blur-sm"
        />
      </div>
      
      {/* Sort dropdown */}
      <div className="flex gap-3 items-center">
        <div className="flex items-center gap-2 text-gray-300">
          <SlidersHorizontal size={18} />
          <span className="text-sm font-medium">Sort:</span>
        </div>
        <select
          className="rounded-xl px-4 py-3 border border-white/20 bg-white/10 text-white text-sm focus:border-brand-pink focus:ring-2 focus:ring-brand-pink outline-none transition-all backdrop-blur-sm"
          value={sort}
          onChange={e => onSortChange(e.target.value as SortBy)}
        >
          <option value="dateCreated" className="bg-gray-800">Date Created</option>
          <option value="lastModified" className="bg-gray-800">Last Modified</option>
          <option value="count" className="bg-gray-800">Number of Images</option>
          <option value="az" className="bg-gray-800">A-Z</option>
        </select>
      </div>
      
      {/* Grid/List view toggles */}
      <div className="flex ml-auto gap-2">
        <button
          className={cn(
            "p-3 rounded-xl transition-all duration-200 border",
            view === "grid"
              ? "bg-gradient-to-r from-brand-pink to-purple-600 border-transparent text-white shadow-lg scale-105"
              : "bg-white/10 border-white/20 text-gray-400 hover:text-white hover:bg-white/20 hover:scale-105"
          )}
          onClick={() => onViewChange("grid")}
          aria-pressed={view === "grid"}
        >
          <LayoutGrid size={20} />
        </button>
        <button
          className={cn(
            "p-3 rounded-xl transition-all duration-200 border",
            view === "list"
              ? "bg-gradient-to-r from-brand-pink to-purple-600 border-transparent text-white shadow-lg scale-105"
              : "bg-white/10 border-white/20 text-gray-400 hover:text-white hover:bg-white/20 hover:scale-105"
          )}
          onClick={() => onViewChange("list")}
          aria-pressed={view === "list"}
        >
          <List size={20} />
        </button>
      </div>
    </div>
  );
};
