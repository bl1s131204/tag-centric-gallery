import React from 'react';
import { cn } from '@/lib/utils';
import { Eye } from 'lucide-react';
import { Image } from '@/types/image';

type ImageCardProps = {
  image: Image;
  onClick: () => void;
  onTagClick: (tag: string) => void;
};

export const ImageCard: React.FC<ImageCardProps> = ({ image, onClick, onTagClick }) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 hover-lift hover-glow",
        "card border-medium shadow-medium",
        "w-full aspect-[4/5]"
      )}
      tabIndex={0}
      role="button"
      aria-label={image.title}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-[70%] rounded-t-2xl">
        <img
          src={image.url}
          alt={image.title}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
          draggable={false}
        />
        
        {/* Professional Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
        
        {/* Action Button */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button className="w-9 h-9 rounded-xl bg-neutral-900/80 backdrop-blur-sm border border-neutral-700 flex items-center justify-center text-neutral-200 hover:bg-neutral-800/90 hover:text-white transition-all focus-ring">
            <Eye size={16} />
          </button>
        </div>

        {/* Status indicator */}
        <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="px-2.5 py-1 rounded-lg bg-neutral-900/80 backdrop-blur-sm border border-neutral-700 text-xs font-medium text-neutral-200">
            {image.tags?.length || 0} tags
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 h-[30%] flex flex-col justify-between">
        {/* Header */}
        <div className="space-y-1">
          <h3 className="font-semibold text-base text-neutral-50 truncate leading-tight font-inter">
            {image.filename}
          </h3>
          <p className="text-sm text-neutral-400 font-medium">
            {image.tags?.length ? `${image.tags.length} tags` : 'No tags'}
          </p>
        </div>

        {/* Tags Section */}
        {image.tags && image.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {image.tags.slice(0, 2).map((tag) => (
              <button
                key={tag}
                onClick={(e) => {
                  e.stopPropagation();
                  onTagClick(tag);
                }}
                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-primary-500/10 text-primary-300 hover:bg-primary-500/20 hover:text-primary-200 transition-all border border-primary-500/20 hover:border-primary-500/30"
              >
                {tag}
              </button>
            ))}
            {image.tags.length > 2 && (
              <span className="px-2.5 py-1 text-xs font-medium rounded-lg bg-neutral-800/50 text-neutral-400 border border-neutral-700">
                +{image.tags.length - 2}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};