
import React, { useState } from "react";
import { ThemeProvider, useTheme } from "@/theme/themeContext";
import { ImageGallery } from "@/components/ImageGallery";
import { ThemeDropdown } from "@/components/ThemeDropdown";
import { UserCircle, Search, Folder, Filter } from "lucide-react";
import { HiddenAccess, HiddenFolderAccess } from "@/components/HiddenAccess";
import { themes } from "@/theme/themes";

const AppContent = () => {
  const [showHidden, setShowHidden] = useState(false);
  const [specialFolderPath, setSpecialFolderPath] = useState<string | null>(null);
  const { theme } = useTheme();
  const themeColors = themes[theme].colors;

  // Handler for opening folder
  const handleOpenInGallery = (folderPath: string) => {
    setSpecialFolderPath(folderPath);
    setShowHidden(false);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-[45] nav-blur shadow-lg border-b border-[${themeColors.accent}]/20`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center h-[70px] px-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Folder style={{ color: themeColors.accent }} size={32} />
            <div className="flex flex-col">
              <span className="font-playfair text-2xl font-bold tracking-tight drop-shadow-xl select-none" style={{ color: themeColors.accent }}>ImageNest</span>
              <p className="text-xs text-gray-400 hidden md:block">Organize, tag, and explore your images with ease.</p>
            </div>
          </div>
          
          {/* Right: Theme + Profile + Notifications */}
          <div className="flex gap-2 items-center">
            <ThemeDropdown />
            <div className="relative ml-5">
              <button className={`flex items-center justify-center w-11 h-11 bg-[#20243a] rounded-full transition shadow border-2 border-[${themeColors.accent}] hover:shadow-lg hover:shadow-[${themeColors.accent}]/30`}>
                <Filter style={{ color: themeColors.accent }} size={22} />
              </button>
            </div>
            <div className="relative ml-2">
              {/* Profile pic with dropdown placeholder */}
              <button className={`flex items-center justify-center w-11 h-11 bg-[#20243a] rounded-full transition shadow border-2 border-[${themeColors.accent}] hover:shadow-lg hover:shadow-[${themeColors.accent}]/30 overflow-hidden`}>
                <UserCircle className="text-white" size={28} />
              </button>
              {/* Future: profile dropdown and account options */}
            </div>
          </div>
        </div>
      </header>
      <main className="pt-[80px] min-h-screen">
        <ImageGallery specialFolderPath={specialFolderPath} />
        <HiddenAccess
          onReveal={() => setShowHidden(true)}
          show={showHidden}
        />
        {showHidden && (
          <HiddenFolderAccess
            onClose={() => setShowHidden(false)}
            onOpenInGallery={handleOpenInGallery}
          />
        )}
        {/* Future: Sidebar, etc */}
      </main>
    </>
  );
}

const Index = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};
export default Index;
