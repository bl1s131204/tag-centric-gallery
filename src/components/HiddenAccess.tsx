import React, { useState } from "react";
import { toast } from "@/hooks/use-toast";

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
export const HiddenFolderAccess: React.FC<{ onClose: () => void; onOpenInGallery: (folderPath: string) => void }> = ({
  onClose,
  onOpenInGallery,
}) => {
  const [folderPath, setFolderPath] = useState("F:\\movie\\Telegram Desktop");

  const handleCopy = () => {
    navigator.clipboard.writeText(folderPath);
    toast({ title: "Copied!", description: "Folder path copied to clipboard." });
  };

  return (
    <div className="fixed bottom-12 right-8 z-[999] bg-black/90 border border-neon-purple/50 rounded-xl p-5 shadow-lg flex flex-col gap-2 w-[360px] max-w-full">
      <div className="font-semibold text-gold">Special Folder Access:</div>
      <input
        value={folderPath}
        onChange={(e) => setFolderPath(e.target.value)}
        className="rounded px-2 py-1 font-mono w-full mb-2 border bg-[#22252d] border-neon-purple/50 focus:outline-none focus:ring-2 focus:ring-neon-purple"
        spellCheck={false}
      />
      <div className="flex gap-2 mb-2">
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
      <span className="text-xs text-gray-400 mb-2">
        To open this folder, paste the copied path into your system's File Explorer address bar.
      </span>
      <button
        className="text-xs underline text-gold mt-1"
        onClick={onClose}
      >
        Hide
      </button>
    </div>
  );
};
