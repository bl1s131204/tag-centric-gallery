
import React, { useState, useMemo } from "react";
import { parseFiles } from "@/utils/tagUtils";
import { TagSidebar } from "./TagSidebar";
import { FullscreenViewer } from "./FullscreenViewer";
import { GalleryManager } from "./GalleryManager";
import { cn } from "@/lib/utils";

/**
 * Accepts local files, parses tags/titles, shows UI
 */
export const ImageGallery: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [viewerIdx, setViewerIdx] = useState<number | null>(null);
  const [showHidden, setShowHidden] = useState(false);

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

  // Images of active tag or all
  const visibleImages = useMemo(() =>
    imageData.filter(img => !activeTag || img.tags.includes(activeTag))
  , [imageData, activeTag]);

  // For fullscreen modal
  const openViewerAt = (idx: number) => setViewerIdx(idx);
  const closeViewer = () => setViewerIdx(null);
  const nextImg = () => setViewerIdx(i => i == null ? null : (i + 1) % visibleImages.length);
  const prevImg = () => setViewerIdx(i => i == null ? null : (i - 1 + visibleImages.length) % visibleImages.length);

  // Handle move-to-virtual-folder
  const onMove = (imgNames: string[], folder: string) => {
    // Just demo: could use folders, but images stay in main gallery
  };

  // File picker handler
  function handleFilePick(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setFiles(Array.from(e.target.files));
    setActiveTag(null);
    setViewerIdx(null);
  }

  // UI
  if (!files.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-4xl font-bold mb-2">Select Image Folder</h1>
        <p className="text-muted-foreground mb-4">Choose a folder with images to get started.</p>
        <input
          type="file"
          multiple
          webkitdirectory="true"
          directory="true"
          className="mb-4"
          onChange={handleFilePick}
          accept="image/*"
        />
        <button
          className="hidden"
          tabIndex={-1}
          aria-hidden
          onClick={() => setShowHidden(true)}
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
        <div className="sticky top-0 z-20 bg-white/90 dark:bg-black/70 py-3 mb-2 flex justify-between items-center shadow-md">
          <div className="font-bold text-xl">
            Image Gallery
            {activeTag && (
              <span className="ml-4 text-base text-muted-foreground">— {visibleImages.length} found for <b className="text-accent pl-1">{activeTag}</b></span>
            )}
          </div>
          <div className="flex gap-3">
            <button
              className="md:hidden px-2 py-1 rounded border bg-white"
              onClick={() => document.getElementById("sidebar-pop")?.classList.toggle("hidden")}
            >Tags</button>
            <label className="px-2">
              <input type="file" multiple webkitdirectory="true" directory="true" onChange={handleFilePick} accept="image/*" className="hidden" />
              <span className="cursor-pointer underline">Change Folder</span>
            </label>
          </div>
        </div>
        {/* Mobile sidebar panel */}
        <div id="sidebar-pop" className="md:hidden fixed left-0 top-0 z-50 h-full bg-white/95 dark:bg-black/95 shadow-lg hidden">
          <TagSidebar tags={tagSidebar} active={activeTag} onSelect={tag => {
            setActiveTag(tag);
            document.getElementById("sidebar-pop")?.classList.add("hidden");
          }} />
        </div>
        {/* Gallery Manager */}
        <GalleryManager images={imageData} onMove={onMove} />
        {/* Gallery grid */}
        <div className={cn(
          "grid gap-6",
          "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8"
        )}>
          {visibleImages.map((img, idx) => (
            <div
              key={img.filename}
              className={cn(
                "rounded-xl shadow-lg bg-card border p-2 flex flex-col items-center hover:scale-105 transition-transform cursor-pointer group",
                ""
              )}
              onClick={() => openViewerAt(idx)}
            >
              <div className="font-semibold text-base mb-2 truncate w-full text-center">{img.title}</div>
              <img
                src={img.url}
                alt={img.title}
                className="w-full aspect-[4/3] object-contain rounded-lg mb-2 bg-gray-100"
                draggable={false}
              />
              <div className="flex flex-wrap gap-1 w-full justify-center mt-1">
                {img.tags.map(tag => (
                  <span
                    key={tag}
                    className={cn(
                      "text-xs px-2 py-1 rounded-full font-mono cursor-pointer bg-badge hover:bg-accent text-badgeText border",
                      tag === activeTag && "ring-2"
                    )}
                    onClick={e => { e.stopPropagation(); setActiveTag(tag); }}
                  >
                    {tag}
                  </span>
                ))}
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
