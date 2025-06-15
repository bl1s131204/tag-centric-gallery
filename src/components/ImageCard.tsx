
import React from 'react';
import { cn } from '@/lib/utils';
import { Folder } from 'lucide-react';
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
        "bg-white dark:bg-[#20232c]",
        "border border-[#121212] dark:border-[#292632]",
        "shadow-xl hover:shadow-2xl transition-shadow duration-150",
        "rounded-lg",
        "flex flex-col group relative cursor-pointer overflow-hidden",
        "hover:-translate-y-1.5",
        "min-h-[362px] max-w-[350px] w-full"
      )}
      style={{
        width: "100%",
        maxWidth: 350,
        minWidth: 255,
        minHeight: 362,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        aspectRatio: "0.93 / 1",
        borderWidth: "1.5px",
      }}
      tabIndex={0}
      onClick={onClick}
      aria-label={image.title}
    >
      <div className="px-5 pt-4 pb-0 flex flex-row items-center justify-between w-full">
        <span className="font-bold text-[1.09rem] text-[#232A36] dark:text-[#ebf7fe] truncate max-w-[70%]">
          {image.filename}
        </span>
      </div>
      <div className="flex items-center gap-1 text-xs font-semibold text-gray-400 pl-5 pb-0 pt-1 select-none">
        <Folder size={15} className="mr-0.5 text-gray-300" />
        Telegram Desktop
      </div>
      <img
        src={image.url}
        alt={image.title}
        className="w-full h-full object-cover rounded-lg transition-all fade-in-img mt-2"
        draggable={false}
        style={{
          width: "95%",
          height: "210px",
          objectFit: "cover",
          border: "1.2px solid #232A36",
          background: "#dcdfe3",
          boxShadow: "0 1.5px 8px 0 #c0c0c044",
          display: "block",
          margin: "0 auto"
        }}
      />
      <div className="px-5 pb-4 pt-3 w-full">
        <div className="text-base font-semibold text-[#383F4F] dark:text-[#b8e1ff] mb-1">
          Tags
        </div>
        <div className="flex flex-wrap gap-2 w-full min-h-[22px] mb-1">
          {image.tags.length > 0
            ? image.tags.map(tag => (
                <span
                  key={tag}
                  className={cn(
                    "text-xs px-3 py-1 rounded-full font-medium border border-[#ccd4e1] bg-[#f6f8fa] text-[#3b5779] dark:bg-[#24282e] dark:text-[#c7daf7] dark:border-[#262830]",
                    "hover:bg-emerald-50 hover:text-emerald-700 transition-colors cursor-pointer"
                  )}
                  onClick={e => {
                    e.stopPropagation();
                    onTagClick(tag);
                  }}
                >
                  {tag}
                </span>
              ))
            : <span className="text-xs text-gray-400">No tags found</span>
          }
        </div>
        <div className="text-xs text-gray-400 mt-0.5">
          {image.tags.length} tag{image.tags.length !== 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
};
