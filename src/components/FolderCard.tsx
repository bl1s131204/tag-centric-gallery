
import React from "react";
import { Folder, Star, Pencil, Trash2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { themes } from "@/theme/themes";
import { useTheme } from "@/theme/themeContext";

type PreviewImage = { url: string; alt?: string };
export type FolderCardProps = {
  name: string;
  imageCount: number;
  previewImages?: PreviewImage[];
  selected?: boolean;
  onSelect?: () => void;
  onFavorite?: () => void;
  onRename?: () => void;
  onDelete?: () => void;
  isFavorite?: boolean;
  className?: string;
};

export const FolderCard: React.FC<FolderCardProps> = ({
  name,
  imageCount,
  previewImages = [],
  selected,
  onSelect,
  onFavorite,
  onRename,
  onDelete,
  isFavorite,
  className,
}) => {
  const { theme } = useTheme();
  const themeColors = themes[theme].colors;
  // Accent glow color
  const accent = themeColors.accent;
  return (
    <div
      className={cn(
        "group relative flex flex-col items-center justify-between cursor-pointer rounded-2xl p-4 w-full min-h-[170px] bg-white dark:bg-[#191b1f] border-2 transition-[box-shadow,border] duration-200",
        selected
          ? "border-[3px] ring-2 ring-offset-2 ring-accent border-accent shadow-xl"
          : "border-black/10 hover:border-[3px] hover:border-accent/80 hover:shadow-lg",
        "hover:shadow-xl hover:-translate-y-1 focus-within:shadow-xl focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/80",
        className
      )}
      tabIndex={0}
      aria-pressed={!!selected}
      onClick={onSelect}
      style={{
        background: "var(--folder-card-bg, white)",
        outline: selected ? `2px solid ${accent}` : undefined,
      }}
    >
      {/* Top-right quick actions */}
      <div className="absolute right-3 top-3 flex gap-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition duration-200 z-10">
        <button onClick={e => { e.stopPropagation(); onFavorite && onFavorite(); }} className="bg-white dark:bg-[#23243b] border border-black/10 rounded-full p-1 shadow hover:bg-accent hover:text-white transition">
          <Star size={16} fill={isFavorite ? accent : "none"} className={isFavorite ? "text-accent" : "text-gray-400"} />
        </button>
        <button onClick={e => { e.stopPropagation(); onRename && onRename(); }} className="bg-white dark:bg-[#23243b] border border-black/10 rounded-full p-1 shadow hover:bg-emerald hover:text-white transition">
          <Pencil size={16} />
        </button>
        <button onClick={e => { e.stopPropagation(); onDelete && onDelete(); }} className="bg-white dark:bg-[#23243b] border border-black/10 rounded-full p-1 shadow hover:bg-red-500 hover:text-white transition">
          <Trash2 size={16} />
        </button>
      </div>
      {/* Checkmark when selected */}
      {selected && <Check className="absolute left-3 top-3 text-accent bg-white rounded-full shadow p-0.5" size={18} />}

      {/* Preview thumbnail collage */}
      <div className="relative w-16 h-16 mb-2 z-0">
        <div className="absolute inset-0 flex items-center justify-center">
          <Folder
            className="transition-transform duration-200 group-hover:-translate-y-1 group-hover:rotate-1 text-accent"
            size={48}
            strokeWidth={2.2}
            style={{
              filter: "drop-shadow(0 2px 12px rgba(42,103,200,0.08))",
            }}
          />
        </div>
        {previewImages?.length > 0 && (
          <div className="absolute right-[-9px] bottom-[-8px] flex flex-wrap gap-0.5">
            {previewImages.slice(0, 4).map((img, idx) => (
              <img
                alt={img.alt || "Preview"}
                src={img.url}
                key={idx}
                className="w-5 h-5 rounded border border-white object-cover shadow-sm bg-gray-100"
                style={{
                  zIndex: idx,
                  marginLeft: idx ? "-8px" : 0,
                }}
              />
            ))}
          </div>
        )}
      </div>
      {/* Folder name & image count */}
      <div className="w-full flex flex-col items-center mt-2">
        <div className="font-semibold text-base text-ellipsis overflow-hidden whitespace-nowrap max-w-[140px]" style={{ color: themeColors.text }}>
          {name}
        </div>
        <div className="text-xs text-gray-500 mt-0.5">{imageCount} image{imageCount !== 1 ? "s" : ""}</div>
      </div>
    </div>
  );
};
