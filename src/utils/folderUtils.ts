import { FolderData } from "@/components/FolderManager";

const FOLDERS_STORAGE_KEY = "gallery_folders";

export function getFolders(): FolderData[] {
  try {
    const stored = localStorage.getItem(FOLDERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn("Failed to get folders from storage:", error);
    return [];
  }
}

export function saveFolders(folders: FolderData[]): void {
  try {
    localStorage.setItem(FOLDERS_STORAGE_KEY, JSON.stringify(folders));
  } catch (error) {
    console.warn("Failed to save folders to storage:", error);
  }
}

export function createFolder(name: string): FolderData {
  const newFolder: FolderData = {
    id: generateId(),
    name: name.trim(),
    images: [],
    createdAt: Date.now()
  };
  
  const folders = getFolders();
  folders.push(newFolder);
  saveFolders(folders);
  
  return newFolder;
}

export function addImageToFolder(folderId: string, imageName: string): void {
  const folders = getFolders();
  const folder = folders.find(f => f.id === folderId);
  
  if (folder && !folder.images.includes(imageName)) {
    folder.images.push(imageName);
    saveFolders(folders);
  }
}

export function removeImageFromFolder(folderId: string, imageName: string): void {
  const folders = getFolders();
  const folder = folders.find(f => f.id === folderId);
  
  if (folder) {
    folder.images = folder.images.filter(img => img !== imageName);
    saveFolders(folders);
  }
}

export function deleteFolder(folderId: string): void {
  const folders = getFolders();
  const filtered = folders.filter(f => f.id !== folderId);
  saveFolders(filtered);
}

export function renameFolder(folderId: string, newName: string): void {
  const folders = getFolders();
  const folder = folders.find(f => f.id === folderId);
  
  if (folder) {
    folder.name = newName.trim();
    saveFolders(folders);
  }
}

export function getFolderImages(folderId: string): string[] {
  const folders = getFolders();
  const folder = folders.find(f => f.id === folderId);
  return folder ? folder.images : [];
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}