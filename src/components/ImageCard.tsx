
import React from 'react';
import { cn } from '@/lib/utils';
import { Folder, Heart, Eye } from 'lucide-react';
import { Image } from '@/types/image';

type ImageCardProps = {
  image: Image;
  onClick: () => void;
  onTagClick: (tag: string) => void;
};

export const ImageCard: React.FC<ImageCardProps> = ({ image, onClick, onTagClick }) => {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300",
        "hover:scale-[1.02] hover:shadow-2xl hover:-translate-y-2",
        "bg-white/10 backdrop-blur-sm border border-white/20",
        "min-h-[400px] max-w-[380px] w-full"
      )}
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)"
      }}
      tabIndex={0}
      onClick={onClick}
      aria-label={image.title}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={image.url}
          alt={image.title}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
          draggable={false}
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* View icon on hover */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
            <Eye size={18} className="text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <h3 className="font-bold text-xl text-white truncate">
            {image.filename}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Folder size={16} className="text-brand-pink" />
            <span>Telegram Desktop</span>
          </div>
        </div>

        {/* Tags Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-200">Tags</span>
            <span className="text-xs text-gray-400">
              {image.tags.length} tag{image.tags.length !== 1 ? "s" : ""}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {image.tags.length > 0 ? (
              image.tags.slice(0, 3).map(tag => (
                <span
                  key={tag}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium",
                    "bg-gradient-to-r from-brand-pink/20 to-purple-600/20",
                    "border border-brand-pink/30 text-white",
                    "hover:from-brand-pink/30 hover:to-purple-600/30",
                    "transition-all duration-200 cursor-pointer",
                    "hover:scale-105 hover:shadow-lg"
                  )}
                  onClick={e => {
                    e.stopPropagation();
                    onTagClick(tag);
                  }}
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-500 italic">No tags found</span>
            )}
            
            {image.tags.length > 3 && (
              <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-700/50 text-gray-300">
                +{image.tags.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Favorite button */}
      <button
        className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0"
        onClick={e => {
          e.stopPropagation();
          // Add favorite functionality here
        }}
      >
        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 hover:bg-white/30 transition-colors">
          <Heart size={18} className="text-white" />
        </div>
      </button>
    </div>
  );
};
