import React, { useState, useMemo, useEffect } from "react";
import { parseFiles } from "@/utils/tagUtils";
import { TagSidebar } from "./TagSidebar";
import { FullscreenViewer } from "./FullscreenViewer";
import { cn } from "@/lib/utils";
import { Search, Folder, Heart, Pencil } from "lucide-react";

/*
  - Accept specialFolderPath prop, if set show a banner and prompt user to select that folder in the picker.
  - If files loaded and all file paths (webkitRelativePath) include the requested folder path, auto-filter for those files.
*/
type ImageGalleryProps = {
  specialFolderPath?: string | null;
};

export const ImageGallery: React.FC<ImageGalleryProps> = ({ specialFolderPath }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [viewerIdx, setViewerIdx] = useState<number | null>(null);
  const [specialBanner, setSpecialBanner] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

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
        <h1 className="text-4xl font-bold mb-2 text-gold">Select Image Folder</h1>
        <p className="text-gray-400 mb-4">Choose a folder with images to get started.</p>
        {specialBanner && (
          <div className="bg-gold/10 border border-gold rounded-lg text-gold px-4 py-3 mb-3 max-w-xl text-center">
            {specialBanner}
            <br />
            <span className="text-sm text-gold font-mono">{specialFolderPath}</span>
          </div>
        )}
        <label className="btn cursor-pointer">
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
        <div className="sticky top-[70px] z-20 backdrop-blur-sm py-4 mb-4 flex flex-col items-center">
            <form className="w-full max-w-2xl relative group mb-2">
              <input
                type="text"
                placeholder="Search by title or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-5 py-3 rounded-full bg-[#23283a]/90 text-white placeholder:text-gray-400 border border-neon-purple focus:outline-none focus:ring-2 focus:ring-neon-purple transition-shadow hover:shadow-lg hover:shadow-neon-purple/20"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neon-purple" size={20} />
            </form>
            <div className="text-lg font-semibold text-gray-400">
              {visibleImages.length} image{visibleImages.length !== 1 ? "s" : ""} found
            </div>
          </div>
        {/* Mobile sidebar panel */}
        <div id="sidebar-pop" className="md:hidden fixed left-0 top-0 z-50 h-full bg-white/95 dark:bg-black/95 shadow-lg hidden">
          <TagSidebar tags={tagSidebar} active={activeTag} onSelect={tag => {
            setActiveTag(tag);
            document.getElementById("sidebar-pop")?.classList.add("hidden");
          }} />
        </div>
        {/* Professional Gallery grid */}
        <div className={cn(
          "grid gap-8 md:gap-10",
          "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        )}>
          {visibleImages.map((img, idx) => (
            <div
              key={img.filename}
              className="rounded-2xl bg-black border border-transparent p-4 flex flex-col group relative transition-all duration-300 hover:border-neon-purple hover:shadow-2xl hover:shadow-neon-purple/20 cursor-pointer"
              onClick={() => openViewerAt(idx)}
            >
              <div className="absolute top-3 right-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 bg-black/50 rounded-full text-white hover:text-red-500" onClick={(e) => e.stopPropagation()}><Heart size={16} /></button>
                <button className="p-1.5 bg-black/50 rounded-full text-white hover:text-gold" onClick={(e) => e.stopPropagation()}><Pencil size={16} /></button>
              </div>

              <div className="relative w-full aspect-video rounded-xl mb-4 overflow-hidden">
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                  draggable={false}
                />
                <div className="absolute bottom-2 left-2 flex flex-col gap-1 text-left">
                  <span className="text-xs font-semibold p-1 rounded bg-red-500/50 text-white">Excerpt: Some details here...</span>
                </div>
              </div>
              <div className="text-left">
                <div className="font-bold text-lg mb-1 truncate w-full tracking-tight text-gray-100">{img.title}</div>
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                  <Folder size={16} />
                  <span>{img.filename.substring(0, img.filename.lastIndexOf('/')) || "/"}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 w-full justify-start mt-auto">
                {img.tags.length > 0 ? img.tags.map(tag => (
                  <span
                    key={tag}
                    className={cn(
                      "text-xs px-3 py-1 rounded-full font-semibold cursor-pointer transition-all duration-100",
                      "bg-yellow-400/20 text-yellow-300 hover:bg-yellow-400/40",
                      tag === activeTag && "ring-2 ring-gold"
                    )}
                    onClick={e => { e.stopPropagation(); setActiveTag(tag); }}
                  >
                    {tag}
                  </span>
                )) : <span className="text-xs text-gray-500">No tags found</span>}
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
