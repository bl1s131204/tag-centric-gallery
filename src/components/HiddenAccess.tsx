
import React, { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { ExternalLink } from "lucide-react";

// Moved FOLDER_PATH out of constant for state editing
const PASSWORD = "1590";
const REVEAL_CLICK_COUNT = 5;

/**
 * Hidden access button, requires 5 clicks, then password to reveal folder tool
 */
export const HiddenAccess: React.FC<{ onReveal: () => void; show: boolean }> = ({
  onReveal,
  show,
}) => {
  const [cnt, setCnt] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState("");
  if (!show && !unlocked)
    return (
      <button
        className="fixed bottom-2 right-2 h-5 w-5 bg-transparent border-none text-transparent z-50"
        style={{ opacity: 0, pointerEvents: "auto" }}
        aria-label="hidden-access"
        onClick={() =>
          setCnt((v) => (v + 1 >= REVEAL_CLICK_COUNT ? (setUnlocked(true), 0) : v + 1))
        }
      >
        *
      </button>
    );
  if (!unlocked) return null;
  return (
    <div className="fixed bottom-6 right-8 z-[999] flex flex-col gap-4 p-6 rounded-2xl border border-purple-500/30 shadow-2xl"
         style={{
           background: "linear-gradient(135deg, rgba(128,0,255,0.1) 0%, rgba(0,0,0,0.9) 100%)",
           backdropFilter: "blur(20px)"
         }}>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
          <span className="text-white text-sm">🔓</span>
        </div>
        <span className="font-bold text-base text-gold">Unlock tool</span>
      </div>
      
      <input
        className="rounded-xl border px-4 py-3 font-mono bg-black/50 border-purple-500/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        placeholder="Enter password"
        type="password"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      
      <button
        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-xl font-semibold hover:scale-105 transition-transform duration-200 shadow-lg"
        onClick={() => {
          if (input === PASSWORD) onReveal();
        }}
      >
        Unlock Access
      </button>
    </div>
  );
};

/**
 * Folder path display, after unlock
 * - Add an "Open Folder in Gallery" button that calls onOpenInGallery(folderPath)
 */
export const HiddenFolderAccess: React.FC<{
  onClose: () => void;
  onOpenInGallery: (folderPath: string) => void;
  onFilesSelected: (files: File[]) => void;
}> = ({
  onClose,
  onOpenInGallery,
  onFilesSelected,
}) => {
  const [folderPath, setFolderPath] = useState("F:\\movie\\Telegram Desktop");
  const [driveLink, setDriveLink] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(folderPath);
    toast({ title: "Copied!", description: "Folder path copied to clipboard." });
  };

  const handleOpenDriveLink = () => {
    if (!driveLink.trim()) {
      toast({ 
        title: "Error", 
        description: "Please enter a Google Drive link first.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // Validate if it's a proper URL
      new URL(driveLink);
      window.open(driveLink, '_blank');
      toast({ 
        title: "Opening Google Drive", 
        description: "Google Drive folder opened in new tab." 
      });
    } catch (error) {
      toast({ 
        title: "Invalid URL", 
        description: "Please enter a valid Google Drive link.",
        variant: "destructive"
      });
    }
  };

  const handleFileSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      onFilesSelected(Array.from(e.target.files));
    }
  };

  return (
    <div className="fixed bottom-20 right-8 z-[999] rounded-2xl p-6 shadow-2xl flex flex-col gap-6 w-[400px] max-w-[calc(100vw-2rem)] border border-purple-500/30"
         style={{
           background: "linear-gradient(135deg, rgba(128,0,255,0.1) 0%, rgba(0,0,0,0.95) 100%)",
           backdropFilter: "blur(20px)"
         }}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
          <span className="text-white text-lg">🎯</span>
        </div>
        <h3 className="font-bold text-xl text-gold">Special Folder Access</h3>
      </div>
      
      {/* Google Drive Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center">
            <ExternalLink size={12} className="text-white" />
          </div>
          <h4 className="text-white font-semibold">Google Drive Integration</h4>
        </div>
        
        <input
          value={driveLink}
          onChange={(e) => setDriveLink(e.target.value)}
          placeholder="https://drive.google.com/drive/folders/..."
          className="rounded-xl px-4 py-3 font-mono w-full border bg-black/50 border-blue-500/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
          spellCheck={false}
        />
        
        <button
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-xl font-semibold w-full flex items-center justify-center gap-3 hover:scale-105 transition-transform duration-200 shadow-lg"
          onClick={handleOpenDriveLink}
        >
          <ExternalLink size={18} />
          Open in Google Drive
        </button>
      </div>

      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-purple-500/30"></div>
        <span className="flex-shrink mx-4 text-gray-400 text-sm font-medium">OR</span>
        <div className="flex-grow border-t border-purple-500/30"></div>
      </div>

      {/* Local Folder Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-purple-600 flex items-center justify-center">
            <span className="text-white text-sm">📁</span>
          </div>
          <h4 className="text-white font-semibold">Local Folder Path</h4>
        </div>
        
        <p className="text-xs text-gray-400 leading-relaxed">
          Enter a folder path and click "Open in Gallery" to be prompted to select that folder with the file picker.
        </p>
        
        <input
          value={folderPath}
          onChange={(e) => setFolderPath(e.target.value)}
          className="rounded-xl px-4 py-3 font-mono w-full border bg-black/50 border-purple-500/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          spellCheck={false}
        />
        
        <div className="grid grid-cols-2 gap-3">
          <button
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-xl font-semibold hover:scale-105 transition-transform duration-200 shadow-lg"
            onClick={handleCopy}
          >
            Copy Path
          </button>
          <button
            className="bg-gradient-to-r from-emerald to-teal-600 text-white px-4 py-3 rounded-xl font-semibold hover:scale-105 transition-transform duration-200 shadow-lg"
            onClick={() => onOpenInGallery(folderPath)}
          >
            Open in Gallery
          </button>
        </div>
      </div>
      
      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-purple-500/30"></div>
        <span className="flex-shrink mx-4 text-gray-400 text-sm font-medium">OR</span>
        <div className="flex-grow border-t border-purple-500/30"></div>
      </div>

      <label htmlFor="direct-folder-upload" className="w-full">
        <div className="bg-gradient-to-r from-sky-500 to-cyan-600 text-white px-4 py-3 rounded-xl font-semibold text-center cursor-pointer w-full hover:scale-105 transition-transform duration-200 shadow-lg flex items-center justify-center gap-3">
          <span className="text-lg">📂</span>
          Select Folder Directly
        </div>
        <input
          id="direct-folder-upload"
          type="file"
          multiple
          {...{ webkitdirectory: "true", directory: "true" } as any}
          className="hidden"
          onChange={handleFileSelectChange}
          accept="image/*"
        />
      </label>

      <button
        className="text-sm text-gold hover:text-yellow-300 transition-colors mt-2 underline self-center"
        onClick={onClose}
      >
        Hide Panel
      </button>
    </div>
  );
};
