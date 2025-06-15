
import React, { useState, useMemo, useEffect } from "react";
import { parseFiles } from "@/utils/tagUtils";
import { TagSidebar } from "./TagSidebar";
import { FullscreenViewer } from "./FullscreenViewer";
import { cn } from "@/lib/utils";
import { Folder } from "lucide-react";
import { useTheme } from "@/theme/themeContext";
import { themes } from "@/theme/themes";

type ImageGalleryProps = {
  specialFolderPath?: string | null;
  searchTerm?: string;
  onSearchTermChange?: (search: string) => void;
};

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  specialFolderPath,
  searchTerm = "",
  onSearchTermChange,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [activeTag, setActiveTags] = useState<string | null>(null);
  const [viewerIdx, setViewerIdx] = useState<number | null>(null);
  const [specialBanner, setSpecialBanner] = useState<string | null>(null);
  const { theme } = useTheme();
  const themeColors = themes[theme].colors;

  useEffect(() => {
    if (specialFolderPath) {
      setSpecialBanner(
        `To open this folder (${specialFolderPath}), click "Change Folder" and pick it in the file picker.`
      );
      setFiles([]); // clear previous files
    }
  }, [specialFolderPath]);

  const { imageData, tagMap } = useMemo(
    () => (files.length ? parseFiles(files) : { imageData: [], tagMap: {} }),
    [files]
  );

  const tagSidebar = useMemo(
    () =>
      Object.entries(tagMap)
        .map(([name, val]) => ({ name, count: val.images.length }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    [tagMap]
  );

  const visibleImages = useMemo(
    () =>
      imageData
        .filter((img) => !activeTag || img.tags.includes(activeTag))
        .filter(
          (img) =>
            !searchTerm ||
            img.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            img.tags.some((t) =>
              t.toLowerCase().includes(searchTerm.toLowerCase())
            )
        ),
    [imageData, activeTag, searchTerm]
  );

  const openViewerAt = (idx: number) => setViewerIdx(idx);
  const closeViewer = () => setViewerIdx(null);

  function handleFilePick(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setFiles(Array.from(e.target.files));
    setActiveTags(null);
    setViewerIdx(null);
    setSpecialBanner(null);
  }

  if (!files.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h1 className="text-4xl font-bold mb-2" style={{ color: themeColors.accent }}>
          Select Image Folder
        </h1>
        <p className="text-gray-400 mb-4">
          Choose a folder with images to get started.
        </p>
        {specialBanner && (
          <div className={`bg-[${themeColors.accent}]/10 border border-[${themeColors.accent}] rounded-lg text-[${themeColors.accent}] px-4 py-3 mb-3 max-w-xl text-center`}>
            {specialBanner}
            <br />
            <span className="text-sm font-mono" style={{ color: themeColors.accent }}>{specialFolderPath}</span>
          </div>
        )}
        <label
          className="btn cursor-pointer"
          style={{
            backgroundColor: themeColors.accent,
            color: themeColors.accentText,
          }}
        >
          Select Folder
          <input
            type="file"
            multiple
            {...{ webkitdirectory: "true", directory: "true" } as any}
            className="hidden"
            onChange={handleFilePick}
            accept="image/*"
          />
        </label>
        <button className="hidden" tabIndex={-1} aria-hidden>
          Unlock
        </button>
      </div>
    );
  }

  // Main gallery layout and cards
  return (
    <div className="flex flex-row w-full min-h-screen bg-[#f5f5f8] dark:bg-[#18181b] transition-colors duration-200">
      {/* Sidebar */}
      <div className="hidden md:flex mr-4">
        <TagSidebar tags={tagSidebar} active={activeTag} onSelect={setActiveTags} />
      </div>
      {/* Main */}
      <div className="flex-1 min-h-screen flex flex-col px-2 md:px-8">
        <div className="flex items-center justify-between pt-10 pb-4">
          <div className="text-2xl md:text-3xl font-semibold text-[#232A36] dark:text-[#dbe7f6] tracking-tight">
            Image Gallery
          </div>
          <div className="text-base font-medium text-gray-500 dark:text-gray-300">
            {visibleImages.length} image{visibleImages.length !== 1 ? "s" : ""} found
          </div>
        </div>
        {/* Card grid */}
        <div
          className={cn(
            "w-full grid gap-x-3 gap-y-8",
            "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3",
            "justify-items-center pb-16"
          )}
          style={{
            alignItems: "start",
          }}
        >
          {visibleImages.map((img, idx) => (
            <div
              key={img.filename}
              className={cn(
                "bg-white dark:bg-[#20232c]",
                "border border-[#121212] dark:border-[#292632]",
                "shadow-xl hover:shadow-2xl transition-shadow duration-150",
                "rounded-2xl",
                "flex flex-col group relative cursor-pointer overflow-hidden",
                "hover:-translate-y-1.5",
                "min-h-[382px] max-w-[350px] w-full"
              )}
              style={{
                width: "100%",
                maxWidth: 350,
                minWidth: 255,
                minHeight: 382,
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box",
                aspectRatio: "0.93 / 1",
                borderWidth: "1.5px", // Slightly thinner border (from the user's earlier request)
              }}
              tabIndex={0}
              onClick={() => openViewerAt(idx)}
              aria-label={img.title}
            >
              {/* Filename Header */}
              <div className="px-5 pt-6 pb-0 flex flex-row items-center justify-between w-full">
                <span className="font-bold text-[1.09rem] text-[#232A36] dark:text-[#ebf7fe] truncate max-w-[70%]">
                  {img.filename}
                </span>
              </div>
              {/* Folder source */}
              <div className="flex items-center gap-1 text-xs font-semibold text-gray-400 pl-5 pb-0 pt-1 select-none">
                <Folder size={15} className="mr-0.5 text-gray-300" />
                Telegram Desktop
              </div>
              {/* Image - flush to card, with thin border */}
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover rounded-lg transition-all fade-in-img mt-3"
                draggable={false}
                style={{
                  width: "95%",
                  height: "210px",
                  objectFit: "cover",
                  borderRadius: "0.67rem",
                  border: "1.2px solid #232A36",
                  background: "#dcdfe3",
                  boxShadow: "0 1.5px 8px 0 #c0c0c044",
                  display: "block",
                  margin: "0 auto"
                }}
              />
              {/* Tag/Info section */}
              <div className="px-5 pb-5 pt-4 w-full">
                <div className="text-base font-semibold text-[#383F4F] dark:text-[#b8e1ff] mb-1">
                  Tags
                </div>
                <div className="flex flex-wrap gap-2 w-full min-h-[22px] mb-1">
                  {img.tags.length > 0
                    ? img.tags.map(tag => (
                        <span
                          key={tag}
                          className={cn(
                            "text-xs px-3 py-1 rounded-full font-medium border border-[#ccd4e1] bg-[#f6f8fa] text-[#3b5779] dark:bg-[#24282e] dark:text-[#c7daf7] dark:border-[#262830]",
                            "hover:bg-emerald-50 hover:text-emerald-700 transition-colors cursor-pointer"
                          )}
                          onClick={e => {
                            e.stopPropagation();
                            setActiveTags(tag);
                          }}
                        >
                          {tag}
                        </span>
                      ))
                    : <span className="text-xs text-gray-400">No tags found</span>
                  }
                </div>
                <div className="text-xs text-gray-400 mt-0.5">
                  {img.tags.length} tag{img.tags.length !== 1 ? "s" : ""}
                </div>
              </div>
            </div>
          ))}
        </div>
        <FullscreenViewer
          open={viewerIdx !== null}
          idx={viewerIdx ?? 0}
          images={visibleImages.map(({ filename, url }) => ({ filename, url }))}
          onClose={closeViewer}
        />
      </div>
    </div>
  );
};

// Note: This file is now over 200 lines and should be refactored into smaller components for long-term maintainability.
