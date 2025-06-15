import React, { useState } from "react";
import { ThemeProvider } from "@/theme/themeContext";
import { ImageGallery } from "@/components/ImageGallery";
import { ThemeDropdown } from "@/components/ThemeDropdown";
import { UserCircle, Search, Folder, Filter } from "lucide-react";
import { HiddenAccess, HiddenFolderAccess } from "@/components/HiddenAccess";

const Index = () => {
  const [showHidden, setShowHidden] = useState(false);
  const [specialFolderPath, setSpecialFolderPath] = useState<string | null>(null);

  // Handler for opening folder
  const handleOpenInGallery = (folderPath: string) => {
    setSpecialFolderPath(folderPath);
    setShowHidden(false);
  };

  return (
    <ThemeProvider>
      <header className="fixed top-0 left-0 w-full z-[45] nav-blur shadow-lg border-b border-neon-purple/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-[70px] px-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Folder className="text-neon-purple" size={32} />
            <div className="flex flex-col">
              <span className="font-playfair text-2xl font-bold text-gold tracking-tight drop-shadow-xl select-none">ImageNest</span>
              <p className="text-xs text-gray-400 hidden md:block">Organize, tag, and explore your images with ease.</p>
            </div>
          </div>
          
          {/* Right: Theme + Profile + Notifications */}
          <div className="flex gap-2 items-center">
            <ThemeDropdown />
            <div className="relative ml-5">
              <button className="flex items-center justify-center w-11 h-11 bg-[#20243a] rounded-full transition shadow border-2 border-neon-purple hover:shadow-lg hover:shadow-neon-purple/30">
                <Filter className="text-gold" size={22} />
              </button>
            </div>
            <div className="relative ml-2">
              {/* Profile pic with dropdown placeholder */}
              <button className="flex items-center justify-center w-11 h-11 bg-[#20243a] rounded-full transition shadow border-2 border-neon-purple hover:shadow-lg hover:shadow-neon-purple/30 overflow-hidden">
                <UserCircle className="text-white" size={28} />
              </button>
              {/* Future: profile dropdown and account options */}
            </div>
          </div>
        </div>
      </header>
      <main className="pt-[80px] bg-[#0B0B0B] min-h-screen">
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
    </ThemeProvider>
  );
};
export default Index;
