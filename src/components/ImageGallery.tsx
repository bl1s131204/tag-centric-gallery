
import React, { useState, useMemo, useEffect } from "react";
import { parseFiles } from "@/utils/tagUtils";
import { TagSidebar } from "./TagSidebar";
import { FullscreenViewer } from "./FullscreenViewer";
import { cn } from "@/lib/utils";
import { Folder, Heart, Pencil } from "lucide-react";
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
  const nextImg = () =>
    setViewerIdx((i) =>
      i == null ? null : (i + 1) % visibleImages.length
    );
  const prevImg = () =>
    setViewerIdx((i) =>
      i == null ? null : (i - 1 + visibleImages.length) % visibleImages.length
    );

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
    <div className="flex flex-row w-full min-h-screen bg-[#f8f9fa] dark:bg-[#121212] transition-colors duration-200">
      {/* Sidebar */}
      <div className="hidden md:flex">
        <TagSidebar tags={tagSidebar} active={activeTag} onSelect={setActiveTags} />
      </div>
      {/* Main */}
      <div className="flex-1 min-h-screen flex flex-col px-2 md:px-8">
        <div className="flex items-center justify-between pt-10 pb-4">
          <div className="text-2xl md:text-3xl font-semibold text-[#202f3c] dark:text-[#d6e3ef]">
            Gallery
          </div>
          <div className="text-base font-medium text-gray-500 dark:text-gray-300">
            {visibleImages.length} image{visibleImages.length !== 1 ? "s" : ""} found
          </div>
        </div>
        {/* Card grid */}
        <div
          className={cn(
            "w-full",
            "grid",
            "gap-x-7 gap-y-9",
            "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4",
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
                "bg-white dark:bg-[#181b20]",
                "border-2 border-[#222] shadow-md",
                "rounded-2xl",
                "flex flex-col group relative transition-all duration-200 cursor-pointer overflow-hidden",
                "hover:shadow-lg hover:-translate-y-[2.5px]"
              )}
              style={{
                width: "100%",
                maxWidth: 365,
                minWidth: 270,
                minHeight: 355,
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box",
                aspectRatio: "1.18 / 1", // closer to reference
              }}
              tabIndex={0}
              onClick={() => openViewerAt(idx)}
              aria-label={img.title}
            >
              {/* Filename Header */}
              <div className="px-5 pt-5 flex flex-row items-center justify-between w-full">
                <span className="font-bold text-[1.08rem] text-[#202f3c] dark:text-[#ebf7fe] truncate max-w-[65%]">
                  {img.filename}
                </span>
                {/* Card actions */}
                <div className="flex gap-2 z-10">
                  <button
                    className="p-1.5 bg-black/75 dark:bg-[#2A67C8]/90 rounded-full text-white hover:bg-emerald-600/80 transition-shadow shadow-md"
                    onClick={e => e.stopPropagation()}
                  >
                    <Heart size={16} />
                  </button>
                  <button
                    className="p-1.5 bg-black/75 dark:bg-[#2A67C8]/90 rounded-full text-white hover:bg-gold transition-shadow shadow-md"
                    onClick={e => e.stopPropagation()}
                  >
                    <Pencil size={16} />
                  </button>
                </div>
              </div>
              {/* Folder source */}
              <div className="flex items-center gap-1 text-xs font-medium text-gray-500 pl-5 pb-1 pt-1 select-none">
                <Folder size={15} className="mr-1 text-gray-400" />
                Telegram Desktop
              </div>
              {/* Image */}
              <div
                className="relative w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-200/70 to-gray-50 dark:from-[#252c39]/70 dark:to-[#161921]"
                style={{
                  flex: 1,
                  width: "100%",
                  minHeight: "150px",
                  maxHeight: "240px",
                  borderRadius: "0.7rem",
                  margin: "0 auto",
                  boxSizing: "border-box",
                  border: "2.5px solid #bbb",
                }}
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover object-center fade-in-img"
                  draggable={false}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "0.2rem",
                  }}
                />
              </div>
              {/* Tag/Info section */}
              <div className="px-5 pb-4 pt-3 w-full">
                <div className="text-[1rem] font-semibold text-[#374958] dark:text-[#cde1ec] mb-0.5">Tags:</div>
                <div className="flex flex-wrap gap-2 w-full min-h-[22px]">
                  {img.tags.length > 0
                    ? img.tags.map(tag => (
                        <span
                          key={tag}
                          className={cn(
                            "text-xs px-3 py-1 rounded-full font-medium border border-[#cfdbe9] bg-[#eef2f8] text-[#374958] dark:bg-[#252c39] dark:text-[#cde1ec] dark:border-[#283046]"
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
                <div className="text-xs text-gray-400 mt-1">
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
          onNext={nextImg}
          onPrev={prevImg}
        />
      </div>
    </div>
  );
};

// Note: This file is now over 200 lines and should be refactored into smaller components for long-term maintainability.

