
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

type TagSidebarProps = {
  tags: { name: string; count: number }[];
  active: string | null;
  onSelect: (tag: string | null) => void;
};
export const TagSidebar: React.FC<TagSidebarProps> = ({ tags, active, onSelect }) => {
  const [search, setSearch] = useState("");
  const filtered = tags.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <aside
      className="sticky top-[70px] h-[calc(100vh-70px)] min-w-[220px] max-w-[280px] bg-black/50 p-4 flex flex-col overflow-y-auto z-40 border-r border-neon-purple/20"
      style={{ transition: "left 0.2s" }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg text-gold">Filter by Tags</h3>
        <Info size={16} className="text-gray-400" />
      </div>
      <input
        className="w-full px-3 py-2 mb-4 rounded-lg bg-[#22252d] border border-neon-purple/50 focus:outline-none focus:ring-2 focus:ring-neon-purple"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search tags..."
      />
      <button
        className={cn(
          "mb-2 px-3 py-2 text-left w-full rounded-full font-semibold transition-colors",
          !active ? "bg-neon-purple text-gold" : "hover:bg-neon-purple/50"
        )}
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
                active === tag.name ? "bg-neon-purple text-gold" : "hover:bg-neon-purple/50"
              )}
              onClick={() => onSelect(tag.name)}
            >
              <span>{tag.name}</span>
              <span className="text-xs font-mono bg-yellow-400/20 text-yellow-300 px-2 py-0.5 rounded-full">{tag.count}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};
