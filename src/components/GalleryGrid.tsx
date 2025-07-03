
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
    <div
      className={cn(
        "w-full grid gap-6",
        "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
        "justify-items-center pb-20"
      )}
    >
      {images.map((img, idx) => (
        <div
          key={img.filename}
          className="w-full max-w-[300px] transform transition-all duration-500"
          style={{
            animationDelay: `${idx * 50}ms`,
            animation: "fadeInUp 0.6s ease-out forwards"
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
  );
};
