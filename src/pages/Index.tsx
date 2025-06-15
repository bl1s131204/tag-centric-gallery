
import React, { useState } from "react";
import { ImageGallery } from "@/components/ImageGallery";
import { HiddenAccess, HiddenFolderAccess } from "@/components/HiddenAccess";
import Header from "@/components/Header";

const Index = () => {
  const [showHidden, setShowHidden] = useState(false);
  const [specialFolderPath, setSpecialFolderPath] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

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
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <main className="pt-[70px] min-h-screen transition-all duration-300">
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
    </>
  );
};

export default Index;
