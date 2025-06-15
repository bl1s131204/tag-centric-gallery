
const THEME_KEY = "gallery_theme";
const FOLDER_KEY = "gallery_folder";
const VIRTUAL_KEY = "gallery_virtuals";

export function getTheme(): string | null {
  return localStorage.getItem(THEME_KEY);
}
export function setTheme(theme: string) {
  localStorage.setItem(THEME_KEY, theme);
}
export function getFolder(): string | null {
  return localStorage.getItem(FOLDER_KEY);
}
export function setFolder(folder: string) {
  localStorage.setItem(FOLDER_KEY, folder);
}
export function getVirtualFolders(): Record<string, string[]> {
  try {
    return JSON.parse(localStorage.getItem(VIRTUAL_KEY) || "{}");
  } catch {
    return {};
  }
}
export function setVirtualFolders(folders: Record<string, string[]>) {
  localStorage.setItem(VIRTUAL_KEY, JSON.stringify(folders));
}
