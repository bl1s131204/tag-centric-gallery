
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
    <div className="min-h-[calc(100vh-70px)] w-full flex flex-col justify-center items-center relative py-20">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-pink/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center px-6">
        {specialBanner ? (
          <div className="mb-12 p-8 rounded-2xl border border-brand-pink/20 text-center max-w-xl mx-auto"
               style={{
                 background: "linear-gradient(135deg, rgba(255,69,126,0.1) 0%, rgba(128,0,255,0.05) 100%)",
                 backdropFilter: "blur(20px)"
               }}>
            <div className="text-brand-pink font-medium text-lg mb-3">{specialBanner}</div>
            <div className="text-sm font-mono text-gray-400 break-all px-4 py-2 rounded-lg bg-black/30">
              {specialFolderPath}
            </div>
          </div>
        ) : (
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-playfair">
              Select a folder of images
            </h1>
            <p className="text-xl text-gray-400 max-w-md mx-auto">
              Choose your image collection to start exploring
            </p>
          </div>
        )}

        <div className="w-full max-w-lg">
          <div
            className="relative w-full min-h-[480px] rounded-3xl flex flex-col items-center justify-center gap-8 text-center p-12 transition-all duration-300 hover:scale-[1.02] border border-white/10"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1)"
            }}
          >
            {/* Upload icon with glow */}
            <div className="relative">
              <div className="absolute inset-0 bg-brand-pink/20 rounded-full blur-xl" />
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-brand-pink to-purple-600 flex items-center justify-center">
                <Upload size={32} className="text-white" />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Drag and Drop folder here</h2>
              <p className="text-gray-400 text-lg">Or click below to browse</p>
            </div>
            
            <div className="text-gray-500 text-sm">OR</div>
            
            <label htmlFor="folder-upload" className="cursor-pointer group">
              <div className="px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl bg-gradient-to-r from-brand-pink to-purple-600 text-white">
                <div className="flex items-center gap-3">
                  <Upload size={20} />
                  Select Folder
                </div>
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
            
            <div className="text-center space-y-2 max-w-xs">
              <p className="text-sm text-gray-400">
                Select a folder containing your images to get started
              </p>
              <p className="text-xs text-gray-500">
                Supports JPG, PNG, WebP, and other image formats
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <button className="hidden" tabIndex={-1} aria-hidden>
        Unlock
      </button>
    </div>
  );
};
