/**
 * Regex to identify the first occurrence of a "split point" between title and tags.
 * Split on the first: 2+ spaces, --, ,, (multiple commas), ... (multiple dots), |.
 */
const TITLE_TAG_SPLIT_REGEX = /[\s]{2,}|--|,{2,}|\.{2,}|\|/;

/**
 * Separate pattern for splitting just the tags section into individual tags.
 * Split by any of: multiple commas, any sequence of spaces, --, ... (multiple dots), |.
 */
const TAG_SPLIT_REGEX = /(?:,{1,}|\.{2,}|--|\|)+|\s{2,}/g;

const STOPWORDS = [
  "by", "but", "as", "to", "and", "of", "the",
  "with", "for", "a", "in", "on",
];

function normalizeTag(raw: string): string | null {
  let s = raw.trim().toLowerCase().replace(/^[\W_]+|[\W_]+$/g, "");
  if (!s || STOPWORDS.includes(s)) return null;
  return s;
}

/** Levenshtein Distance, small util (for fuzzy 'typo' grouping) */
export function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
  return dp[m][n];
}

// Fuzzily group similar tags using Levenshtein distance
function groupTags(rawTags: string[], threshold = 4): Record<string, string[]> {
  const canonical: Record<string, string[]> = {};
  const used: Set<string> = new Set();
  for (let tag of rawTags) {
    if (!tag || used.has(tag)) continue;
    const group = [tag];
    used.add(tag);
    for (let other of rawTags) {
      if (other === tag || used.has(other)) continue;
      if (levenshtein(tag, other) <= threshold) {
        group.push(other);
        used.add(other);
      }
    }
    canonical[tag] = group;
  }
  return canonical;
}

/**
 * Parse filenames into title/tags and build canonical map.
 * For each filename:
 *  - Split title/tags at first "split point" (see above)
 *  - Tags: SPLIT on all common delimiters.
 *  - Each tag is trimmed and cleaned, and falsey/stopwords are dropped.
 */
export function parseFiles(files: File[]): {
  imageData: { filename: string; url: string; title: string; tags: string[]; size: string; dateAdded: number; lastModified: number }[];
  tagMap: Record<string, { originalVariants: string[]; images: string[] }>;
} {
  const imageData: { filename: string; url: string; title: string; tags: string[]; size: string; dateAdded: number; lastModified: number }[] = [];
  let rawTags: string[] = [];
  const tagRawVariants: Record<string, string[]> = {};

  files.forEach(file => {
    // Find where tag metadata starts (after split point)
    const nameNoExt = file.name.replace(/\.[a-z0-9]+$/i, "");
    const splitMatch = TITLE_TAG_SPLIT_REGEX.exec(nameNoExt);
    let title = nameNoExt;
    let tagString = "";
    if (splitMatch) {
      const splitIdx = splitMatch.index;
      title = nameNoExt.slice(0, splitIdx).trim();
      tagString = nameNoExt.slice(splitIdx + splitMatch[0].length).trim();
    }
    // Split tags (exactly as user wants)
    const splitTags = tagString
      .split(TAG_SPLIT_REGEX)
      .map(t => t.trim())
      .filter(Boolean);

    const normed: string[] = [];
    for (let tag of splitTags) {
      const cleaned = normalizeTag(tag);
      if (cleaned) {
        normed.push(cleaned);
        (tagRawVariants[cleaned] = tagRawVariants[cleaned] || []).push(tag);
        rawTags.push(cleaned);
      }
    }

    // Format file size
    const formatFileSize = (bytes: number): string => {
      if (bytes === 0) return '0 B';
      const k = 1024;
      const sizes = ['B', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    imageData.push({
      filename: file.name,
      url: URL.createObjectURL(file),
      title,
      tags: normed,
      size: formatFileSize(file.size),
      dateAdded: Date.now(),
      lastModified: file.lastModified,
    });
  });

  // Fuzzy group tags as before
  const canonicalGroups = groupTags([...new Set(rawTags)]);
  const tagMap: Record<string, { originalVariants: string[]; images: string[] }> = {};
  for (const [canonical, variants] of Object.entries(canonicalGroups)) {
    tagMap[canonical] = { originalVariants: variants, images: [] };
  }
  // Assign images to canonical tags
  imageData.forEach(img => {
    img.tags = img.tags.map(t => {
      let canon = t;
      for (const can in canonicalGroups) {
        if (canonicalGroups[can].includes(t)) {
          canon = can;
          break;
        }
      }
      return canon;
    });
    new Set(img.tags).forEach(tag => {
      tagMap[tag].images.push(img.filename);
    });
  });

  return { imageData, tagMap };
}
