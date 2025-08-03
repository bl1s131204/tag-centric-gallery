import { Image } from "@/types/image";

export type SortCriteria = "name" | "size" | "dateAdded" | "dateModified" | "type";
export type SortDirection = "asc" | "desc";

// Natural string comparison for file names (handles numbers correctly)
function naturalSort(a: string, b: string): number {
  const collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: 'base'
  });
  return collator.compare(a, b);
}

// Parse file size from string (e.g., "2.5 MB" -> bytes)
function parseFileSize(sizeStr: string): number {
  if (!sizeStr) return 0;
  
  const match = sizeStr.match(/^([\d.]+)\s*(KB|MB|GB)?$/i);
  if (!match) return 0;
  
  const value = parseFloat(match[1]);
  const unit = (match[2] || '').toUpperCase();
  
  switch (unit) {
    case 'GB': return value * 1024 * 1024 * 1024;
    case 'MB': return value * 1024 * 1024;
    case 'KB': return value * 1024;
    default: return value; // Assume bytes
  }
}

// Get file extension for type sorting
function getFileType(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  
  // Group by common types
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(ext)) {
    return 'image';
  }
  if (['pdf', 'doc', 'docx', 'txt', 'rtf'].includes(ext)) {
    return 'document';
  }
  if (['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm'].includes(ext)) {
    return 'video';
  }
  if (['mp3', 'wav', 'flac', 'aac', 'ogg'].includes(ext)) {
    return 'audio';
  }
  
  return ext || 'unknown';
}

export function sortImages(
  images: Image[],
  criteria: SortCriteria,
  direction: SortDirection
): Image[] {
  const sorted = [...images].sort((a, b) => {
    let comparison = 0;
    
    switch (criteria) {
      case "name":
        comparison = naturalSort(a.filename, b.filename);
        break;
        
      case "size":
        const sizeA = parseFileSize(a.size);
        const sizeB = parseFileSize(b.size);
        comparison = sizeA - sizeB;
        break;
        
      case "dateAdded":
        const dateA = new Date(a.dateAdded).getTime();
        const dateB = new Date(b.dateAdded).getTime();
        comparison = dateA - dateB;
        break;
        
      case "dateModified":
        const modA = new Date(a.lastModified).getTime();
        const modB = new Date(b.lastModified).getTime();
        comparison = modA - modB;
        break;
        
      case "type":
        const typeA = getFileType(a.filename);
        const typeB = getFileType(b.filename);
        comparison = typeA.localeCompare(typeB);
        // Secondary sort by filename if types are the same
        if (comparison === 0) {
          comparison = naturalSort(a.filename, b.filename);
        }
        break;
        
      default:
        comparison = 0;
    }
    
    return direction === "desc" ? -comparison : comparison;
  });
  
  return sorted;
}