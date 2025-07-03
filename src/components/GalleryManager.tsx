
import React, { useState } from "react";
import { getVirtualFolders, setVirtualFolders } from "@/utils/localPersistence";

type ManagerProps = {
  images: { filename: string; url: string }[];
  onMove: (imgs: string[], folder: string) => void;
};
export const GalleryManager: React.FC<ManagerProps> = ({ images, onMove }) => {
  const [folders, setFoldersState] = useState<Record<string, string[]>>(getVirtualFolders());
  const [selected, setSelected] = useState<string[]>([]);
  const [newFolder, setNewFolder] = useState("");
  const allFolders = Object.keys(folders);
  function handleAddFolder() {
    if (!newFolder.trim()) return;
    const newState = { ...folders, [newFolder]: [] };
    setFoldersState(newState);
    setVirtualFolders(newState);
    setNewFolder("");
  }
  function moveToFolder(folder: string) {
    const newState = { ...folders };
    newState[folder] = [...new Set([...(newState[folder] || []), ...selected])];
    setFoldersState(newState);
    setVirtualFolders(newState);
    setSelected([]);
    onMove(selected, folder);
  }
  return (
    <div className="mb-8 rounded-2xl p-6 border border-white/10"
         style={{
           background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
           backdropFilter: "blur(20px)",
           boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)"
         }}>
      <h2 className="font-bold text-xl text-white mb-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-pink to-purple-600 flex items-center justify-center">
          <span className="text-white text-sm">📁</span>
        </div>
        Gallery Manager
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {images.map(img => (
          <label key={img.filename} className="flex gap-3 items-center p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
            <input
              type="checkbox"
              checked={selected.includes(img.filename)}
              onChange={() =>
                setSelected(sel =>
                  sel.includes(img.filename)
                    ? sel.filter(f => f !== img.filename)
                    : [...sel, img.filename]
                )
              }
              className="w-4 h-4 text-brand-pink rounded border-gray-600 bg-gray-700 focus:ring-brand-pink focus:ring-2"
            />
            <span className="text-sm text-gray-300 truncate flex-1">{img.filename}</span>
          </label>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-3 items-end mb-6">
        <input
          placeholder="New folder name"
          className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent transition-all flex-1 min-w-[200px]"
          value={newFolder}
          onChange={e => setNewFolder(e.target.value)}
        />
        <button 
          className="px-6 py-2 rounded-xl bg-gradient-to-r from-brand-pink to-purple-600 text-white font-semibold hover:scale-105 transition-transform duration-200 shadow-lg" 
          onClick={handleAddFolder}
        >
          Add Folder
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {allFolders.map(f =>
          <button 
            key={f} 
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white font-medium hover:bg-white/20 transition-colors duration-200" 
            onClick={() => moveToFolder(f)}
          >
            Move selected to <span className="font-bold text-brand-pink">{f}</span>
          </button>
        )}
      </div>
      
      {allFolders.length > 0 && (
        <div className="mt-6 p-4 rounded-xl bg-black/20 border border-white/10">
          <h3 className="font-semibold text-white mb-3">Virtual Folders:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {allFolders.map(f => (
              <div key={f} className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                <span className="font-medium text-gray-300">{f}</span>
                <span className="text-xs text-gray-500 bg-white/10 px-2 py-1 rounded-full">
                  {folders[f].length} items
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
