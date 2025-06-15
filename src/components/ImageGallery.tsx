
import React, { useState, useMemo, useEffect } from "react";
import { parseFiles } from "@/utils/tagUtils";
import { TagSidebar } from "./TagSidebar";
import { FullscreenViewer } from "./FullscreenViewer";
import { EmptyGallery } from "./EmptyGallery";
import { GalleryHeader } from "./GalleryHeader";
import { GalleryGrid } from "./GalleryGrid";
import { Image } from "@/types/image";

type ImageGalleryProps = {
  files: File[];
  onFilesChange: (files: File[]) => void;
  specialFolderPath?: string | null;
  searchTerm?: string;
};

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  files,
  onFilesChange,
  specialFolderPath,
  searchTerm = "",
}) => {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [viewerIdx, setViewerIdx] = useState<number | null>(null);
  const [specialBanner, setSpecialBanner] = useState<string | null>(null);

  useEffect(() => {
    // When a special folder is requested, show a banner.
    // The parent component is responsible for clearing files.
    if (specialFolderPath) {
      setSpecialBanner(
        `To open this folder, click "Change Folder" and pick it in the file picker.`
      );
    } else {
      setSpecialBanner(null);
    }

    // Any time the folder source changes (new files selected, or special folder requested)
    // reset the internal state of the gallery.
    setActiveTag(null);
    setViewerIdx(null);
  }, [files, specialFolderPath]);

  const { imageData, tagMap } = useMemo(
    () => (files.length ? parseFiles(files) : { imageData: [], tagMap: {} }),
    [files]
  );

  const tagSidebarData = useMemo(
    () =>
      Object.entries(tagMap)
        .map(([name, val]) => ({ name, count: val.images.length }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    [tagMap]
  );

  const visibleImages: Image[] = useMemo(
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

  const handleNext = () => {
    if (viewerIdx === null) return;
    const nextIdx = viewerIdx + 1;
    if (nextIdx < visibleImages.length) {
      setViewerIdx(nextIdx);
    }
  };

  const handlePrevious = () => {
    if (viewerIdx === null) return;
    const prevIdx = viewerIdx - 1;
    if (prevIdx >= 0) {
      setViewerIdx(prevIdx);
    }
  };

  function handleFilePick(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    onFilesChange(Array.from(e.target.files));
  }

  if (!files.length) {
    return (
      <EmptyGallery
        onFilePick={handleFilePick}
        specialBanner={specialBanner}
        specialFolderPath={specialFolderPath}
      />
    );
  }

  return (
    <div className="flex flex-row w-full min-h-screen bg-[#f5f5f8] dark:bg-[#18181b] transition-colors duration-200">
      <div className="hidden md:flex mr-4">
        <TagSidebar tags={tagSidebarData} active={activeTag} onSelect={setActiveTag} />
      </div>
      <div className="flex-1 min-h-screen flex flex-col px-2 md:px-8">
        <GalleryHeader imageCount={visibleImages.length} />
        <GalleryGrid
          images={visibleImages}
          onImageClick={openViewerAt}
          onTagClick={setActiveTag}
        />
        <FullscreenViewer
          open={viewerIdx !== null}
          idx={viewerIdx ?? 0}
          images={visibleImages.map(({ filename, url }) => ({ filename, url }))}
          onClose={closeViewer}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      </div>
    </div>
  );
};
