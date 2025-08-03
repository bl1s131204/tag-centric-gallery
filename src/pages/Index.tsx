
import React, { useState, useEffect } from "react";
import { ImageGallery } from "@/components/ImageGallery";
import { HiddenAccess, HiddenFolderAccess } from "@/components/HiddenAccess";
import Header from "@/components/Header";
import { SortCriteria, SortDirection } from "@/components/SortControls";

const Index = () => {
  const [showHidden, setShowHidden] = useState(false);
  const [specialFolderPath, setSpecialFolderPath] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortCriteria>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSortChange = (criteria: SortCriteria, direction: SortDirection) => {
    setSortBy(criteria);
    setSortDirection(direction);
  };

  // Check for files from folder selection page on component mount
  useEffect(() => {
    const storedFilesData = sessionStorage.getItem('selectedFiles');
    if (storedFilesData) {
      try {
        const filesData = JSON.parse(storedFilesData);
        // Convert stored file data back to File objects (this is a limitation, 
        // but we'll work with what we can reconstruct)
        const reconstructedFiles = filesData.map((fileData: any) => {
          // Create a minimal File-like object for display purposes
          return new File([], fileData.name, {
            type: fileData.type,
            lastModified: fileData.lastModified
          });
        });
        setFiles(reconstructedFiles);
        // Clear the stored data
        sessionStorage.removeItem('selectedFiles');
      } catch (error) {
        console.error('Error loading files from storage:', error);
      }
    }
  }, []);

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
      <Header 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortChange={handleSortChange}
      />
      <main className="pt-16 min-h-screen transition-all duration-200 bg-neutral-900">
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
