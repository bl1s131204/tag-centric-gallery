
import React from 'react';
import { useTheme } from "@/theme/themeContext";
import { themes } from "@/theme/themes";
import { Upload } from "lucide-react";

type EmptyGalleryProps = {
  onFilePick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  specialBanner?: string | null;
  specialFolderPath?: string | null;
};

export const EmptyGallery: React.FC<EmptyGalleryProps> = ({ onFilePick, specialBanner, specialFolderPath }) => {
  const { theme } = useTheme();
  const themeColors = themes[theme].colors;

  return (
    <div className="min-h-[60vh] w-full flex flex-col justify-center items-center relative py-14">
      <div className="w-full max-w-lg mx-auto flex flex-col items-center px-4">
        {specialBanner ? (
          <div className={`bg-[${themeColors.accent}]/10 border border-[${themeColors.accent}] rounded-lg text-[${themeColors.accent}] px-4 py-3 mb-6 max-w-xl text-center`}>
            {specialBanner}
            <br />
            <span className="text-sm font-mono" style={{ color: themeColors.accent }}>{specialFolderPath}</span>
          </div>
        ) : (
            <h1 className="text-2xl font-bold mb-6" style={{color: themeColors.text}}>Select a folder of images</h1>
        )}

        <div
          className="w-full min-h-[420px] rounded-xl flex flex-col items-center justify-center gap-4 text-center"
          style={{
            border: `2px dashed ${themeColors.accent}40`,
            background: "rgba(255, 255, 255, 0.02)",
            boxSizing: "border-box",
            padding: "38px 16px"
          }}
        >
          <span className="text-gray-400 text-base mb-3">Drop a folder to view images</span>
          <p className="text-xl font-bold mb-2" style={{color: themeColors.text}}>Drag and Drop folder here</p>
          <span className="text-gray-400 font-normal mb-0.5">OR</span>
          <label
            htmlFor="folder-upload"
            className="mx-auto cursor-pointer"
          >
            <div
              className="flex flex-row items-center gap-2 px-8 py-3 rounded-md font-semibold text-lg shadow hover:shadow-lg transition-all"
              style={{
                backgroundColor: themeColors.accent,
                color: themeColors.accentText,
                boxShadow: `0 2px 8px ${themeColors.accent}3c`,
              }}
            >
              <Upload size={20} className="mr-1" />
              Select Folder
            </div>
            <input
              id="folder-upload"
              type="file"
              multiple
              {...{ webkitdirectory: "true", directory: "true" } as any}
              className="hidden"
              onChange={onFilePick}
              accept="image/*"
            />
          </label>
          <div className="mt-6 w-full text-center">
            <div className="text-base text-gray-400 tracking-wide">Select a folder containing your images to get started.</div>
          </div>
        </div>
      </div>
      <button className="hidden" tabIndex={-1} aria-hidden>
        Unlock
      </button>
    </div>
  );
};
