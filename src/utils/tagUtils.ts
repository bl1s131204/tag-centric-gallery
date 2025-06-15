
/**
 * Regex for tag splitting after first "title" part.
 */
const tagSplitRegex = /(?:,{1,3}|\s{2,}|--|\.{2,}|\|)+/g;

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
function groupTags(rawTags: string[], threshold = 2): Record<string, string[]> {
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
 * Return:
 * - imageData: [{filename, title, tags: [canonical]}]
 * - canonicalTags: { canonical: { originalVariants: [...], images: [...] } }
 */
export function parseFiles(files: File[]): {
  imageData: { filename: string; url: string; title: string; tags: string[] }[];
  tagMap: Record<string, { originalVariants: string[]; images: string[] }>;
} {
  const imageData: { filename: string; url: string; title: string; tags: string[] }[] = [];
  let rawTags: string[] = [];
  const tagRawVariants: Record<string, string[]> = {};

  // Build up images, split filename at first double space, --, ,, or so
  files.forEach(file => {
    const [titlePart, ...rest] = file.name.split(/[\s]{2,}|--|,{2,}|\.{2,}|\|/);
    const title = (titlePart || file.name).replace(/\.[a-z0-9]+$/i, "").replace(/[_-]+/g, " ").trim();
    const tagPart = rest.join("").replace(/\.[a-z0-9]+$/i, "");
    const splitTags = tagPart.split(tagSplitRegex).filter(Boolean);
    const normed = splitTags
      .map(normalizeTag)
      .filter(Boolean) as string[];
    normed.forEach(tag => {
      if (tag) rawTags.push(tag);
      (tagRawVariants[tag] = tagRawVariants[tag] || []).push(tag);
    });
    imageData.push({
      filename: file.name,
      url: URL.createObjectURL(file),
      title,
      tags: normed,
    });
  });

  // Fuzzy group tags
  const canonicalGroups = groupTags([...new Set(rawTags)]);
  // Canonical mapping, images per canonical
  const tagMap: Record<string, { originalVariants: string[]; images: string[] }> = {};
  for (const [canonical, variants] of Object.entries(canonicalGroups)) {
    tagMap[canonical] = { originalVariants: variants, images: [] };
  }
  // Map which images belong to each canonical tag
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
