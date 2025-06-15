
import React, { useState, useMemo, useEffect } from "react";
import { parseFiles } from "@/utils/tagUtils";
import { TagSidebar } from "./TagSidebar";
import { FullscreenViewer } from "./FullscreenViewer";
import { cn } from "@/lib/utils";
import { Folder, Heart, Pencil } from "lucide-react";
import { useTheme } from "@/theme/themeContext";
import { themes } from "@/theme/themes";

/*
  - Accept specialFolderPath prop, if set show a banner and prompt user to select that folder in the picker.
  - If files loaded and all file paths (webkitRelativePath) include the requested folder path, auto-filter for those files.
*/
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
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [viewerIdx, setViewerIdx] = useState<number | null>(null);
  const [specialBanner, setSpecialBanner] = useState<string | null>(null);
  const { theme } = useTheme();
  const themeColors = themes[theme].colors;

  // Special folder: Show banner when requested
  useEffect(() => {
    if (specialFolderPath) {
      setSpecialBanner(`To open this folder (${specialFolderPath}), click "Change Folder" and pick it in the file picker.`);
      setFiles([]); // clear previous files
    }
  }, [specialFolderPath]);

  // Parse only once
  const { imageData, tagMap } = useMemo(() =>
    files.length ? parseFiles(files) : { imageData: [], tagMap: {} }
    , [files]
  );

  // Sidebar tag list, sorted
  const tagSidebar = useMemo(() => (
    Object.entries(tagMap)
      .map(([name, val]) => ({ name, count: val.images.length }))
      .sort((a, b) => a.name.localeCompare(b.name))
  ), [tagMap]);

  // Images of active tag or all, and filtered by search term
  const visibleImages = useMemo(() =>
    imageData
      .filter(img => !activeTag || img.tags.includes(activeTag))
      .filter(img =>
        !searchTerm ||
        img.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        img.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())))
  , [imageData, activeTag, searchTerm]);

  // For fullscreen modal
  const openViewerAt = (idx: number) => setViewerIdx(idx);
  const closeViewer = () => setViewerIdx(null);
  const nextImg = () => setViewerIdx(i => i == null ? null : (i + 1) % visibleImages.length);
  const prevImg = () => setViewerIdx(i => i == null ? null : (i - 1 + visibleImages.length) % visibleImages.length);

  // File picker handler
  function handleFilePick(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setFiles(Array.from(e.target.files));
    setActiveTag(null);
    setViewerIdx(null);
    setSpecialBanner(null);
  }

  // UI if no files selected
  if (!files.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h1 className="text-4xl font-bold mb-2" style={{ color: themeColors.accent }}>Select Image Folder</h1>
        <p className="text-gray-400 mb-4">Choose a folder with images to get started.</p>
        {specialBanner && (
          <div className={`bg-[${themeColors.accent}]/10 border border-[${themeColors.accent}] rounded-lg text-[${themeColors.accent}] px-4 py-3 mb-3 max-w-xl text-center`}>
            {specialBanner}
            <br />
            <span className="text-sm font-mono" style={{ color: themeColors.accent }}>{specialFolderPath}</span>
          </div>
        )}
        <label className="btn cursor-pointer" style={{ backgroundColor: themeColors.accent, color: themeColors.accentText }}>
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
        <button
          className="hidden"
          tabIndex={-1}
          aria-hidden
        >Unlock</button>
      </div>
    );
  }

  return (
    <div className="flex flex-row w-full">
      {/* Sidebar */}
      <div className="hidden md:flex">
        <TagSidebar tags={tagSidebar} active={activeTag} onSelect={setActiveTag} />
      </div>
      {/* Main */}
      <div className="w-full min-h-screen flex flex-col px-4">
        <div className="text-lg font-semibold text-gray-500 pt-8 pb-2">
          {visibleImages.length} image{visibleImages.length !== 1 ? "s" : ""} found
        </div>
        {/* Mobile sidebar panel */}
        <div id="sidebar-pop" className="md:hidden fixed left-0 top-0 z-50 h-full bg-white/95 shadow-lg hidden">
          <TagSidebar tags={tagSidebar} active={activeTag} onSelect={tag => {
            setActiveTag(tag);
            document.getElementById("sidebar-pop")?.classList.add("hidden");
          }} />
        </div>
        {/* Gallery grid */}
        <div
          className={cn(
            "grid gap-10",
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          )}
        >
          {visibleImages.map((img, idx) => (
            <div
              key={img.filename}
              className={`bg-white border border-black rounded-xl flex flex-col group relative transition-all duration-300 cursor-pointer overflow-hidden shadow hover:shadow-lg`}
              style={{
                minHeight: 330,
                maxWidth: 480,
                margin: "auto",
              }}
              onClick={() => openViewerAt(idx)}
            >
              <div className="font-bold text-base md:text-lg text-center text-black bg-[#fafafa] border-b border-black w-full py-2 px-4">
                {img.title}
              </div>
              <div
                className="relative w-full aspect-[16/9] md:aspect-[16/7] bg-gray-100 flex items-center justify-center"
                style={{
                  height: 250,
                  borderRadius: "0.75rem 0.75rem 0 0",
                  overflow: "hidden"
                }}
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover"
                  draggable={false}
                  style={{
                    borderRadius: "0.55rem"
                  }}
                />
                <div className="absolute top-2 right-2 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 bg-black/60 rounded-full text-white hover:text-red-500" onClick={(e) => e.stopPropagation()}><Heart size={16} /></button>
                  <button className="p-1.5 bg-black/60 rounded-full text-white hover:text-gold" onClick={(e) => e.stopPropagation()}><Pencil size={16} /></button>
                </div>
              </div>
              {/* File info */}
              <div className="flex-1 flex flex-col items-start justify-end px-4 py-3">
                <div className="flex flex-wrap gap-2 w-full justify-start mt-2">
                  {img.tags.length > 0
                    ? img.tags.map(tag => (
                      <span
                        key={tag}
                        className={cn(
                          "text-xs px-3 py-1 rounded-full font-semibold cursor-pointer border border-black transition-all duration-100",
                          `bg-gray-200 text-gray-700 hover:bg-gray-300`,
                          tag === activeTag && `ring-2 ring-black`
                        )}
                        style={tag === activeTag ? { boxShadow: `0 0 0 2px ${themeColors.accent}` } : {}}
                        onClick={e => { e.stopPropagation(); setActiveTag(tag); }}
                      >
                        {tag}
                      </span>
                    ))
                    : <span className="text-xs text-gray-500">No tags found</span>}
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
  )
};
