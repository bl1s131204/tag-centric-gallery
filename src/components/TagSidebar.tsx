
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

  const filtered = tags.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside className="sticky top-16 h-[calc(100vh-64px)] min-w-[300px] max-w-[320px] flex flex-col overflow-hidden z-40 border-r border-medium bg-neutral-900/50 backdrop-professional animate-slide-in-right">
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/80 to-neutral-900/60" />
      {/* Header */}
      <div className="relative p-6 border-b border-medium">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center shadow-medium">
            <Filter size={22} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-xl text-neutral-50 font-inter">Filter Tags</h3>
            <p className="text-sm text-neutral-400 mt-0.5">Organize your collection</p>
          </div>
        </div>

        {/* Search */}
        <div className="input-group">
          <Search className="input-icon" size={18} />
          <input
            className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/5 border border-medium text-neutral-50 placeholder-neutral-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all font-inter"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search tags..."
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-200 transition-colors focus-ring rounded p-1"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Tags List */}
      <div className="relative flex-1 overflow-y-auto p-6 space-y-3">
        {/* Show All Button */}
        <button
          className={cn(
            "w-full px-5 py-4 text-left rounded-xl font-semibold transition-all duration-200 group focus-ring",
            !active 
              ? "bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-medium hover-lift"
              : "bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-medium hover:border-strong"
          )}
          onClick={() => onSelect(null)}
        >
          <div className="flex items-center justify-between">
            <span className="font-inter">Show All Images</span>
            <div className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-mono font-semibold",
              !active 
                ? "bg-white/20 text-white"
                : "bg-neutral-800/50 text-neutral-400 group-hover:bg-neutral-700/50 group-hover:text-neutral-300"
            )}>
              {tags.reduce((sum, tag) => sum + tag.count, 0)}
            </div>
          </div>
        </button>

        {/* Tag List */}
        {filtered.length > 0 ? (
          <div className="space-y-2">
            {filtered.map((tag, index) => (
              <button
                key={tag.name}
                className={cn(
                  "w-full px-5 py-4 text-left rounded-xl transition-all duration-200 group focus-ring animate-fade-in",
                  active === tag.name
                    ? "bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-medium hover-lift"
                    : "bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-medium hover:border-strong"
                )}
                onClick={() => onSelect(tag.name)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium font-inter truncate mr-3">{tag.name}</span>
                  <div className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-mono font-semibold shrink-0",
                    active === tag.name
                      ? "bg-white/20 text-white"
                      : "bg-neutral-800/50 text-neutral-400 group-hover:bg-neutral-700/50 group-hover:text-neutral-300"
                  )}>
                    {tag.count}
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-neutral-500 text-sm font-medium">No tags found</div>
            <p className="text-neutral-600 text-xs mt-1">Try a different search term</p>
          </div>
        )}
      </div>
    </aside>
  );
};
