
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
  const [searchTerm, setSearchTerm] = useState("");
  const [navbarActive, setNavbarActive] = useState(false);
  const { theme } = useTheme();
  const themeColors = themes[theme].colors;
  const [files, setFiles] = useState<File[]>([]);

  // Handler for opening folder via path
  const handleOpenInGallery = (folderPath: string) => {
    setSpecialFolderPath(folderPath);
    setFiles([]); // Important: clear files to show EmptyGallery with instructions
    setShowHidden(false);
  };

  // Handler for when files are picked directly
  const handleFilesSelected = (newFiles: File[]) => {
    setFiles(newFiles);
    setSpecialFolderPath(null); // Clear special path, if any
    if (newFiles.length > 0) {
      setShowHidden(false); // Also hide if it was open and files were selected
    }
  };

  return (
    <>
      <header
        className={
          `fixed top-0 left-0 w-full z-[45] nav-blur shadow-lg border-b border-[${themeColors.accent}]/20 transition-all duration-300` +
          (navbarActive ? " navbar-expanded" : "")
        }
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center h-auto md:h-[70px] px-4 py-3 md:py-0 transition-all duration-300">
          {/* Logo and search in a row on desktop, stacked on mobile */}
          <div className="flex items-center justify-between w-full md:w-auto mb-3 md:mb-0">
            <div className="flex items-center gap-3">
              <Folder style={{ color: themeColors.accent }} size={32} />
              <div className="flex flex-col">
                <span className="font-playfair text-2xl font-bold tracking-tight drop-shadow-xl select-none" style={{ color: themeColors.accent }}>ImageNest</span>
                <p className="text-xs text-gray-400 hidden md:block">Organize, tag, and explore your images with ease.</p>
              </div>
            </div>
          </div>
          {/* Search bar in navbar */}
          <form
            className="w-full md:w-1/2 max-w-lg relative flex items-center transition-all"
            onFocus={() => setNavbarActive(true)}
            onBlur={() => setTimeout(() => setNavbarActive(false), 180)}
            onSubmit={e => e.preventDefault()}
            tabIndex={-1}
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by title or tags..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className={`w-full pl-11 pr-5 py-3 rounded-lg bg-white border border-black text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[${themeColors.accent}] transition-shadow hover:shadow-lg`}
              style={{
                boxShadow: navbarActive ? `0 0 0 3px ${themeColors.accent}30` : undefined,
                transition: "box-shadow 0.22s"
              }}
            />
          </form>
          {/* Right: Theme + Profile + Notifications */}
          <div className="flex gap-2 items-center mt-4 md:mt-0 ml-0 md:ml-5">
            <ThemeDropdown />
            <div className="relative">
              <button className={`flex items-center justify-center w-11 h-11 bg-[#f5f5f5] rounded-full transition shadow border-2 border-[${themeColors.accent}] hover:shadow-lg hover:shadow-[${themeColors.accent}]/30`}>
                <Filter style={{ color: themeColors.accent }} size={22} />
              </button>
            </div>
            <div className="relative ml-2">
              {/* Profile pic with dropdown placeholder */}
              <button className={`flex items-center justify-center w-11 h-11 bg-[#f5f5f5] rounded-full transition shadow border-2 border-[${themeColors.accent}] hover:shadow-lg hover:shadow-[${themeColors.accent}]/30 overflow-hidden`}>
                <UserCircle className="text-[#222]" size={28} />
              </button>
              {/* Future: profile dropdown and account options */}
            </div>
          </div>
        </div>
      </header>
      <main className="pt-[100px] md:pt-[80px] min-h-screen transition-all duration-300">
        <ImageGallery
          files={files}
          onFilesChange={handleFilesSelected}
          specialFolderPath={specialFolderPath}
          searchTerm={searchTerm}
        />
        <HiddenAccess
          onReveal={() => setShowHidden(true)}
          show={showHidden}
        />
        {showHidden && (
          <HiddenFolderAccess
            onClose={() => setShowHidden(false)}
            onOpenInGallery={handleOpenInGallery}
            onFilesSelected={handleFilesSelected}
          />
        )}
        {/* Future: Sidebar, etc */}
      </main>
      <style>{`
        .navbar-expanded {
          box-shadow: 0 6px 30px -4px rgba(37, 192, 138, 0.13);
          background: #fff !important;
        }
      `}</style>
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
