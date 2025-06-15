
import React from 'react';

type GalleryHeaderProps = {
  imageCount: number;
};

export const GalleryHeader: React.FC<GalleryHeaderProps> = ({ imageCount }) => {
  return (
    <div className="flex items-center justify-between pt-10 pb-4">
      <div className="text-2xl md:text-3xl font-semibold text-[#232A36] dark:text-[#dbe7f6] tracking-tight">
        Image Gallery
      </div>
      <div className="text-base font-medium text-gray-500 dark:text-gray-300">
        {imageCount} image{imageCount !== 1 ? "s" : ""} found
      </div>
    </div>
  );
};
