
import React from 'react';

type GalleryHeaderProps = {
  imageCount: number;
};

export const GalleryHeader: React.FC<GalleryHeaderProps> = ({ imageCount }) => {
  return (
    <div className="flex items-center justify-between pt-12 pb-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-pink to-purple-600 flex items-center justify-center">
          <span className="text-white text-xl">🖼️</span>
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white font-playfair tracking-tight">
            Image Gallery
          </h1>
          <p className="text-gray-400 text-sm mt-1">Explore your image collection</p>
        </div>
      </div>
      
      <div className="text-right">
        <div className="text-2xl font-bold text-white">
          {imageCount.toLocaleString()}
        </div>
        <div className="text-sm text-gray-400">
          image{imageCount !== 1 ? "s" : ""} found
        </div>
      </div>
    </div>
  );
};
