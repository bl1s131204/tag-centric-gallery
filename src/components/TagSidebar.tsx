
import React, { useState } from "react";
import { cn } from "@/lib/utils";
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
      className="sticky top-0 h-screen min-w-[220px] max-w-[280px] bg-white/70 dark:bg-gray-900/90 shadow-lg p-4 flex flex-col overflow-y-auto z-40"
      style={{ transition: "left 0.2s" }}
    >
      <input
        className="w-full px-2 py-1 mb-4 rounded border text-xs focus:outline-none"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search tags..."
      />
      <button
        className={cn(
          "mb-2 px-2 py-1 text-left w-full rounded font-semibold hover:bg-accent",
          !active && "bg-accent text-accent-foreground"
        )}
        onClick={() => onSelect(null)}
      >
        Show All ({tags.reduce((s, t) => s + t.count, 0)})
      </button>
      <ul className="space-y-1">
        {filtered.map(tag => (
          <li key={tag.name}>
            <button
              className={cn(
                "w-full text-left px-2 py-1 rounded flex justify-between items-center hover:bg-accent",
                active === tag.name && "bg-accent text-accent-foreground"
              )}
              onClick={() => onSelect(tag.name)}
            >
              <span>{tag.name}</span>
              <span className="text-xs font-mono opacity-70">{tag.count}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};
