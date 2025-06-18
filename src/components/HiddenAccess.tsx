
import React, { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { ExternalLink } from "lucide-react";

// Moved FOLDER_PATH out of constant for state editing
const PASSWORD = "qazwsx";
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
    <div className="fixed bottom-6 right-8 z-[999] flex flex-col gap-2 bg-black/90 rounded-xl p-4 shadow-lg border border-neon-purple/50">
      <span className="font-bold text-sm text-gold">Unlock tool (password required):</span>
      <input
        className="rounded border px-2 py-1 font-mono bg-[#22252d] border-neon-purple/50 focus:outline-none focus:ring-2 focus:ring-neon-purple"
        placeholder="Password"
        type="password"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="bg-neon-purple text-gold px-3 py-1 rounded-lg font-semibold"
        onClick={() => {
          if (input === PASSWORD) onReveal();
        }}
      >
        Unlock
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
    <div className="fixed bottom-12 right-8 z-[999] bg-black/90 border border-neon-purple/50 rounded-xl p-5 shadow-lg flex flex-col gap-3 w-[360px] max-w-full">
      <div className="font-semibold text-gold">Special Folder Access:</div>
      
      {/* Google Drive Section */}
      <div className="space-y-2">
        <p className="text-xs text-gray-400">
          Open Google Drive folder directly:
        </p>
        <input
          value={driveLink}
          onChange={(e) => setDriveLink(e.target.value)}
          placeholder="https://drive.google.com/drive/folders/..."
          className="rounded px-2 py-1 font-mono w-full border bg-[#22252d] border-neon-purple/50 focus:outline-none focus:ring-2 focus:ring-neon-purple text-sm"
          spellCheck={false}
        />
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded-lg font-semibold w-full flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
          onClick={handleOpenDriveLink}
        >
          <ExternalLink size={16} />
          Open in Google Drive
        </button>
      </div>

      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-neon-purple/30"></div>
        <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
        <div className="flex-grow border-t border-neon-purple/30"></div>
      </div>

      {/* Local Folder Section */}
      <div className="space-y-2">
        <p className="text-xs text-gray-400">
          For special folders, manually enter the path and click "Open in Gallery". You will then be prompted to select that folder with the file picker.
        </p>
        <input
          value={folderPath}
          onChange={(e) => setFolderPath(e.target.value)}
          className="rounded px-2 py-1 font-mono w-full border bg-[#22252d] border-neon-purple/50 focus:outline-none focus:ring-2 focus:ring-neon-purple"
          spellCheck={false}
        />
        <div className="flex gap-2">
          <button
            className="bg-neon-purple/80 text-gold px-3 py-1 rounded-lg font-semibold flex-1"
            onClick={handleCopy}
          >
            Copy Path
          </button>
          <button
            className="bg-emerald text-white px-3 py-1 rounded-lg font-semibold flex-1"
            onClick={() => onOpenInGallery(folderPath)}
          >
            Open in Gallery
          </button>
        </div>
      </div>
      
      <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-neon-purple/30"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
          <div className="flex-grow border-t border-neon-purple/30"></div>
      </div>

      <label htmlFor="direct-folder-upload" className="w-full">
        <div
          className="bg-sky-500 text-white px-3 py-2 rounded-lg font-semibold flex-1 text-center cursor-pointer w-full hover:bg-sky-600 transition-colors"
        >
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
        className="text-xs underline text-gold mt-2"
        onClick={onClose}
      >
        Hide
      </button>
    </div>
  );
};
