
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
        "w-full grid gap-x-[0.2cm] gap-y-[0.8cm]",
        "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3",
        "justify-items-center pb-16"
      )}
      style={{
        alignItems: "start",
      }}
    >
      {images.map((img, idx) => (
        <ImageCard
          key={img.filename}
          image={img}
          onClick={() => onImageClick(idx)}
          onTagClick={onTagClick}
        />
      ))}
    </div>
  );
};
