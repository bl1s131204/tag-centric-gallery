
import React, { useState } from "react";
import { ThemeProvider } from "@/theme/themeContext";
import { ImageGallery } from "@/components/ImageGallery";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { HiddenAccess, HiddenFolderAccess } from "@/components/HiddenAccess";

const Index = () => {
  const [showSecret, setShowSecret] = useState(false);
  const [showFolder, setShowFolder] = useState(false);

  return (
    <ThemeProvider>
      <div className="relative min-h-screen w-full">
        <nav className="sticky top-0 bg-[rgba(255,255,255,0.9)] dark:bg-black/90 shadow-xl z-30 px-4 py-3 flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <h1 className="font-playfair text-2xl tracking-tight font-bold">Pro Image Gallery</h1>
          </div>
          <div className="flex gap-4 items-center">
            <ThemeSwitcher />
          </div>
        </nav>
        <ImageGallery />
        <HiddenAccess onReveal={() => setShowSecret(true)} show={showFolder} />
        {showSecret && (
          <HiddenFolderAccess onClose={() => setShowSecret(false)} />
        )}
      </div>
    </ThemeProvider>
  );
};
export default Index;
