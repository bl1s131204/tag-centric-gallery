
import React, { useState, useMemo } from "react";
import { UserCircle, Settings, ChevronRight } from "lucide-react";
import { ThemeDropdown } from "@/components/ThemeDropdown";
import { FolderCard } from "@/components/FolderCard";
import { FolderFilters } from "@/components/FolderFilters";
import { themes } from "@/theme/themes";
import { useTheme } from "@/theme/themeContext";
// Example folders
const EXAMPLE_FOLDERS = [
  {
    id: "1",
    name: "Vacation 2024 Long Folder Name Example",
    imageCount: 120,
    previewImages: [
      { url: "https://picsum.photos/seed/v1/32/32" },
      { url: "https://picsum.photos/seed/v2/32/32" },
      { url: "https://picsum.photos/seed/v3/32/32" },
      { url: "https://picsum.photos/seed/v4/32/32" },
    ],
  },
  {
    id: "2",
    name: "Work Events",
    imageCount: 16,
    previewImages: [
      { url: "https://picsum.photos/seed/w1/32/32" },
      { url: "https://picsum.photos/seed/w2/32/32" },
    ],
  },
  {
    id: "3",
    name: "Portfolio",
    imageCount: 48,
    previewImages: [
      { url: "https://picsum.photos/seed/p1/32/32" },
      { url: "https://picsum.photos/seed/p2/32/32" },
      { url: "https://picsum.photos/seed/p3/32/32" },
    ],
  },
  {
    id: "4",
    name: "Family Photos",
    imageCount: 200,
    previewImages: [],
  },
];

type SortBy = "dateCreated" | "lastModified" | "count" | "az";
type ViewType = "grid" | "list";

export const FolderSelectionPage: React.FC = () => {
  const { theme } = useTheme();
  const themeColors = themes[theme].colors;

  // Demo state
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortBy>("az");
  const [view, setView] = useState<ViewType>("grid");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Handle selection (single or multi by holding shift)
  function handleSelect(id: string, e?: React.MouseEvent) {
    if ((e && e.shiftKey) || e?.metaKey) {
      setSelectedIds(ids => ids.includes(id) ? ids.filter(x => x !== id) : [...ids, id]);
    } else {
      setSelectedIds(ids => ids.length === 1 && ids[0] === id ? [] : [id]);
    }
  }

  // Filter/search/sort
  const visibleFolders = useMemo(() => {
    let arr = EXAMPLE_FOLDERS.filter(
      f =>
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.imageCount.toString().includes(search)
    );
    switch (sort) {
      case "count":
        arr = arr.slice().sort((a, b) => b.imageCount - a.imageCount);
        break;
      case "az":
        arr = arr.slice().sort((a, b) => a.name.localeCompare(b.name));
        break;
      // Additional: dateCreated/lastModified could use real fields in real app
      default:
        break;
    }
    return arr;
  }, [search, sort]);

  // Empty state
  const isEmpty = visibleFolders.length === 0;

  return (
    <div className="min-h-screen w-full bg-[#F8F9FA] dark:bg-[#121212] transition-colors">
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-30 bg-white/85 dark:bg-[#191b1f]/80 border-b border-black/10 shadow-sm backdrop-blur supports-backdrop-blur:backdrop-blur-md transition">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-[76px] px-5">
          {/* Logo + title */}
          <div className="flex items-center gap-3 min-w-0">
            <img src="/favicon.ico" alt="App Logo" className="w-10 h-10 rounded shadow border" />
            <span className="font-playfair text-2xl tracking-tight font-bold" style={{ color: themeColors.accent }}>
              ImageNest
            </span>
            <span className="text-lg ml-7 font-playfair text-black/50 dark:text-white/60 font-semibold select-none">Select a Folder</span>
          </div>
          {/* Actions right */}
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-gray-100 dark:bg-[#222] flex items-center justify-center shadow border border-black/10 hover:bg-emerald/90 transition">
              <Settings size={20} className="text-accent" />
            </button>
            <ThemeDropdown />
            <span className="ml-2">
              <UserCircle size={35} className="text-gray-500 drop-shadow" />
            </span>
          </div>
        </div>
      </header>
      <main className="relative pt-[90px] min-h-[calc(100vh-90px)] pb-28 flex flex-col items-center">
        {/* Filters/Search/Views */}
        <div className="w-full max-w-5xl pt-2 px-4 sm:px-9 mx-auto">
          <FolderFilters
            search={search}
            onSearchChange={setSearch}
            sort={sort}
            onSortChange={setSort}
            view={view}
            onViewChange={setView}
          />
        </div>
        {/* Folder Cards */}
        <section className={view === "grid"
          ? "w-full max-w-5xl px-4 sm:px-9 mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
          : "w-full max-w-4xl px-4 mt-2 flex flex-col gap-3"}>
          {!isEmpty ? visibleFolders.map((folder) => (
            <div
              key={folder.id}
              tabIndex={0}
              className="focus:outline-none"
              onClick={e => handleSelect(folder.id, e as any)}
              onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") handleSelect(folder.id);
              }}
            >
              <FolderCard
                name={folder.name}
                imageCount={folder.imageCount}
                previewImages={folder.previewImages}
                selected={selectedIds.includes(folder.id)}
              />
            </div>
          )) : (
            <div className="flex flex-col items-center justify-center w-full pt-44">
              <img src="/placeholder.svg" alt="" className="opacity-60 w-28 mb-2" />
              <span className="font-playfair text-xl text-gray-500 mb-2">No folders found. Create your first folder!</span>
            </div>
          )}
        </section>
        {/* Confirm Button */}
        <button
          className="fixed right-6 bottom-7 min-w-[160px] z-30 px-8 py-3 rounded-full bg-accent text-accentText font-semibold text-lg shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95 border-2 border-accent flex items-center justify-center gap-2"
          style={{
            background: themeColors.accent,
            color: themeColors.accentText,
            boxShadow: "0 4px 24px 0 rgba(42,103,200,0.09)"
          }}
          disabled={!selectedIds.length}
        >
          Select Folder
          {selectedIds.length > 0 && <ChevronRight className="ml-2" />}
        </button>
      </main>
    </div>
  );
};

export default FolderSelectionPage;
