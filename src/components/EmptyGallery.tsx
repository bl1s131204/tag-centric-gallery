
import React from 'react';
import { useTheme } from "@/theme/themeContext";
import { themes } from "@/theme/themes";

type EmptyGalleryProps = {
  onFilePick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  specialBanner?: string | null;
  specialFolderPath?: string | null;
};

export const EmptyGallery: React.FC<EmptyGalleryProps> = ({ onFilePick, specialBanner, specialFolderPath }) => {
  const { theme } = useTheme();
  const themeColors = themes[theme].colors;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl font-bold mb-2" style={{ color: themeColors.accent }}>
        Select Image Folder
      </h1>
      <p className="text-gray-400 mb-4">
        Choose a folder with images to get started.
      </p>
      {specialBanner && (
        <div className={`bg-[${themeColors.accent}]/10 border border-[${themeColors.accent}] rounded-lg text-[${themeColors.accent}] px-4 py-3 mb-3 max-w-xl text-center`}>
          {specialBanner}
          <br />
          <span className="text-sm font-mono" style={{ color: themeColors.accent }}>{specialFolderPath}</span>
        </div>
      )}
      <label
        className="btn cursor-pointer"
        style={{
          backgroundColor: themeColors.accent,
          color: themeColors.accentText,
        }}
      >
        Select Folder
        <input
          type="file"
          multiple
          {...{ webkitdirectory: "true", directory: "true" } as any}
          className="hidden"
          onChange={onFilePick}
          accept="image/*"
        />
      </label>
      <button className="hidden" tabIndex={-1} aria-hidden>
        Unlock
      </button>
    </div>
  );
};
