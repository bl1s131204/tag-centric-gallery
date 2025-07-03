
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
        "group relative flex flex-col items-center justify-between cursor-pointer rounded-2xl p-6 w-full min-h-[200px] transition-all duration-300 border border-white/10",
        selected
          ? "ring-2 ring-brand-pink shadow-2xl scale-[1.02]"
          : "hover:scale-[1.02] hover:shadow-xl hover:-translate-y-1",
        "focus-within:shadow-xl focus-within:ring-2 focus-within:ring-brand-pink/50",
        className
      )}
      tabIndex={0}
      aria-pressed={!!selected}
      onClick={onSelect}
      style={{
        background: selected 
          ? "linear-gradient(135deg, rgba(255,69,126,0.1) 0%, rgba(128,0,255,0.05) 100%)"
          : "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
        backdropFilter: "blur(20px)",
        boxShadow: selected 
          ? "0 25px 50px -12px rgba(255,69,126,0.3), inset 0 1px 0 rgba(255,255,255,0.1)"
          : "0 10px 30px -10px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)"
      }}
    >
      {/* Top-right quick actions */}
      <div className="absolute right-4 top-4 flex gap-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-10">
        <button 
          onClick={e => { e.stopPropagation(); onFavorite && onFavorite(); }} 
          className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm hover:bg-brand-pink/20 hover:border-brand-pink/40 transition-all duration-200"
        >
          <Star size={14} fill={isFavorite ? "#FFD700" : "none"} className={isFavorite ? "text-yellow-400" : "text-white"} />
        </button>
        <button 
          onClick={e => { e.stopPropagation(); onRename && onRename(); }} 
          className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm hover:bg-emerald/20 hover:border-emerald/40 transition-all duration-200"
        >
          <Pencil size={14} className="text-white" />
        </button>
        <button 
          onClick={e => { e.stopPropagation(); onDelete && onDelete(); }} 
          className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm hover:bg-red-500/20 hover:border-red-500/40 transition-all duration-200"
        >
          <Trash2 size={14} className="text-white" />
        </button>
      </div>
      
      {/* Checkmark when selected */}
      {selected && (
        <div className="absolute left-4 top-4 w-8 h-8 rounded-full bg-brand-pink flex items-center justify-center shadow-lg">
          <Check size={16} className="text-white" />
        </div>
      )}

      {/* Preview thumbnail collage */}
      <div className="relative w-20 h-20 mb-4 z-0">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-brand-pink/20 rounded-full blur-lg" />
            <Folder
              className="relative transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 group-hover:rotate-3 text-brand-pink"
              size={56}
              strokeWidth={2}
              style={{
                filter: "drop-shadow(0 4px 20px rgba(255,69,126,0.3))",
              }}
            />
          </div>
        </div>
        {previewImages?.length > 0 && (
          <div className="absolute right-[-12px] bottom-[-12px] flex flex-wrap gap-1">
            {previewImages.slice(0, 3).map((img, idx) => (
              <img
                alt={img.alt || "Preview"}
                src={img.url}
                key={idx}
                className="w-6 h-6 rounded-lg border-2 border-white object-cover shadow-lg bg-gray-100 transition-transform duration-200 hover:scale-110"
                style={{
                  zIndex: idx,
                  transform: `rotate(${idx * 5 - 5}deg) translateX(${idx * -8}px)`,
                }}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Folder name & image count */}
      <div className="w-full flex flex-col items-center mt-3 space-y-2">
        <h3 className="font-bold text-lg text-white text-center leading-tight max-w-[160px] truncate">
          {name}
        </h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-brand-pink/60" />
          <span className="text-sm text-gray-400 font-medium">
            {imageCount} image{imageCount !== 1 ? "s" : ""}
          </span>
          <div className="w-2 h-2 rounded-full bg-brand-pink/60" />
        </div>
      </div>
    </div>
  );
};
