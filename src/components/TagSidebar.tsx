
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/theme/themeContext";
import { themes } from "@/theme/themes";
import { Search, Filter, X } from "lucide-react";

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
      className="sticky top-[70px] h-[calc(100vh-70px)] min-w-[280px] max-w-[320px] flex flex-col overflow-hidden z-40 border-r border-white/10"
      style={{
        background: "linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%)",
        backdropFilter: "blur(20px)"
      }}
    >
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-pink to-purple-600 flex items-center justify-center">
            <Filter size={20} className="text-white" />
          </div>
          <h3 className="font-bold text-xl text-white">Filter Tags</h3>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent transition-all"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search tags..."
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Tags List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-2">
        {/* Show All Button */}
        <button
          className={cn(
            "w-full px-4 py-3 text-left rounded-xl font-semibold transition-all duration-200 group",
            !active 
              ? "bg-gradient-to-r from-brand-pink to-purple-600 text-white shadow-lg"
              : "hover:bg-white/10 text-gray-300 hover:text-white"
          )}
          onClick={() => onSelect(null)}
        >
          <div className="flex items-center justify-between">
            <span>Show All Images</span>
            <div className={cn(
              "px-2 py-1 rounded-lg text-xs font-mono",
              !active 
                ? "bg-white/20 text-white"
                : "bg-gray-700/50 text-gray-400 group-hover:bg-gray-600/50 group-hover:text-gray-300"
            )}>
              {tags.reduce((sum, tag) => sum + tag.count, 0)}
            </div>
          </div>
        </button>

        {/* Tag List */}
        {filtered.length > 0 ? (
          <div className="space-y-1">
            {filtered.map(tag => (
              <button
                key={tag.name}
                className={cn(
                  "w-full px-4 py-3 text-left rounded-xl transition-all duration-200 group",
                  active === tag.name
                    ? "bg-gradient-to-r from-brand-pink to-purple-600 text-white shadow-lg"
                    : "hover:bg-white/10 text-gray-300 hover:text-white"
                )}
                onClick={() => onSelect(tag.name)}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{tag.name}</span>
                  <div className={cn(
                    "px-2 py-1 rounded-lg text-xs font-mono",
                    active === tag.name
                      ? "bg-white/20 text-white"
                      : "bg-gray-700/50 text-gray-400 group-hover:bg-gray-600/50 group-hover:text-gray-300"
                  )}>
                    {tag.count}
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-500 text-sm">No tags found</div>
          </div>
        )}
      </div>
    </aside>
  );
};
