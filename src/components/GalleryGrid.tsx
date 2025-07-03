
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
        "w-full grid gap-8",
        "grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4",
        "justify-items-center pb-20 px-4"
      )}
      style={{
        alignItems: "start",
      }}
    >
      {images.map((img, idx) => (
        <div
          key={img.filename}
          className="w-full max-w-[400px] transform transition-all duration-500"
          style={{
            animationDelay: `${idx * 100}ms`,
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
