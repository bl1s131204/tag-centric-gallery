
import React from 'react';
import { cn } from '@/lib/utils';
import { ImageCard } from './ImageCard';
import { Image } from '@/types/image';

type GalleryGridProps = {
  images: Image[];
  onImageClick: (index: number) => void;
  onTagClick: (tag: string) => void;
};

export const GalleryGrid: React.FC<GalleryGridProps> = ({ images, onImageClick, onTagClick }) => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div
        className={cn(
          "grid-responsive max-w-9xl mx-auto",
          "pb-24"
        )}
      >
        {images.map((img, idx) => (
          <div
            key={img.filename}
            className="w-full animate-fade-in-up hover-scale"
            style={{
              animationDelay: `${Math.min(idx * 50, 800)}ms`
            }}
          >
            <ImageCard
              image={img}
              onClick={() => onImageClick(idx)}
              onTagClick={onTagClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
