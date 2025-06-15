
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
    <div className="mb-6 rounded-xl bg-card p-4 shadow-xl">
      <h2 className="font-bold text-lg mb-2">Gallery Manager</h2>
      <div className="flex flex-wrap gap-2 mb-2">
        {images.map(img => (
          <label key={img.filename} className="flex gap-1 items-center">
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
            />
            <span className="text-xs">{img.filename}</span>
          </label>
        ))}
      </div>
      <div className="flex gap-3 items-end">
        <input
          placeholder="New folder"
          className="px-2 py-1 rounded border mr-2"
          value={newFolder}
          onChange={e => setNewFolder(e.target.value)}
        />
        <button className="bg-accent px-3 py-1 rounded" onClick={handleAddFolder}>Add Folder</button>
        {allFolders.map(f =>
          <button key={f} className="ml-2 px-3 py-1 bg-card border rounded" onClick={() => moveToFolder(f)}>
            Move selected to <b>{f}</b>
          </button>
        )}
      </div>
      <div className="mt-3">
        <h3 className="font-semibold">Virtual Folders:</h3>
        <ul className="ml-3">
          {allFolders.map(f => (
            <li key={f} className="text-xs">
              <b>{f}</b>: {folders[f].length} items
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
