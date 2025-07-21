
import React from 'react';

type GalleryHeaderProps = {
  imageCount: number;
};

export const GalleryHeader: React.FC<GalleryHeaderProps> = ({ imageCount }) => {
  return (
    <div className="flex items-center justify-between pt-16 pb-8 animate-fade-in-up">
      <div className="flex items-center gap-6">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 flex items-center justify-center shadow-large">
          <div className="text-2xl">🎨</div>
        </div>
        <div className="space-y-2">
          <h1 className="section-title text-4xl md:text-5xl font-bold font-inter">
            Image Gallery
          </h1>
          <p className="text-neutral-400 text-base font-medium">
            Discover and organize your visual collection
          </p>
        </div>
      </div>
      
      <div className="text-right space-y-1">
        <div className="text-3xl font-bold text-neutral-50 font-mono tracking-tight">
          {imageCount.toLocaleString()}
        </div>
        <div className="status-badge">
          {imageCount === 1 ? "1 image" : `${imageCount} images`}
        </div>
      </div>
    </div>
  );
};
