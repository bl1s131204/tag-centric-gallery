
export type ThemeName =
  | "glass"
  | "pastel"
  | "retro"
  | "neon"
  | "sepia"
  | "gold"
  | "contrast"
  | "nature"
  | "mono"
  | "ink";

export const themes: Record<
  ThemeName,
  {
    label: string;
    className: string;
    fontFamily: string;
    colors: {
      bg: string;
      card: string;
      text: string;
      accent: string;
      badge: string;
      badgeText: string;
      sidebar: string;
      shadow: string;
    };
  }
> = {
  glass: {
    label: "Glassmorphism",
    className: "theme-glass",
    fontFamily: "Outfit, sans-serif",
    colors: {
      bg: "bg-gradient-to-br from-white/80 via-blue-100/40 to-gray-100/60 backdrop-blur-lg",
      card: "bg-white/70 border border-white/30 backdrop-blur rounded-xl",
      text: "text-gray-900",
      accent: "bg-blue-200 text-blue-900",
      badge: "bg-blue-100/80",
      badgeText: "text-blue-700",
      sidebar: "bg-white/80",
      shadow: "shadow-xl shadow-blue-200/40",
    },
  },
  pastel: {
    label: "Pastel Bloom",
    className: "theme-pastel",
    fontFamily: "Montserrat, sans-serif",
    colors: {
      bg: "bg-gradient-to-br from-pink-100 via-blue-100 to-lime-100",
      card: "bg-white/90 backdrop-blur-lg rounded-xl",
      text: "text-pink-900",
      accent: "bg-pink-200 text-pink-900",
      badge: "bg-blue-100",
      badgeText: "text-indigo-900",
      sidebar: "bg-pink-50/80",
      shadow: "shadow-lg shadow-blue-100/20",
    },
  },
  retro: {
    label: "Retro Terminal",
    className: "theme-retro",
    fontFamily: "IBM Plex Mono, monospace",
    colors: {
      bg: "bg-gradient-to-br from-black to-green-900",
      card: "bg-green-800/95 border border-green-600 rounded-md",
      text: "text-green-300",
      accent: "bg-black text-green-300",
      badge: "bg-green-600/50",
      badgeText: "text-green-300",
      sidebar: "bg-black/90",
      shadow: "shadow-lg shadow-black/70",
    },
  },
  neon: {
    label: "Neon Vibe",
    className: "theme-neon",
    fontFamily: "Fira Mono, monospace",
    colors: {
      bg: "bg-gradient-to-br from-fuchsia-900 via-black to-blue-900",
      card: "bg-black/80 border border-fuchsia-600 rounded-xl",
      text: "text-fuchsia-300",
      accent: "bg-fuchsia-900 text-yellow-400",
      badge: "bg-blue-900/60",
      badgeText: "text-fuchsia-300",
      sidebar: "bg-black/90",
      shadow: "shadow-lg shadow-fuchsia-600/40",
    },
  },
  sepia: {
    label: "Sepia Storybook",
    className: "theme-sepia",
    fontFamily: "Playfair Display, serif",
    colors: {
      bg: "bg-gradient-to-b from-yellow-50 via-amber-100 to-orange-50",
      card: "bg-yellow-50 border border-amber-200 rounded-xl",
      text: "text-amber-900",
      accent: "bg-amber-200 text-amber-900",
      badge: "bg-orange-100",
      badgeText: "text-orange-800",
      sidebar: "bg-yellow-100/80",
      shadow: "shadow-lg shadow-amber-200/40",
    },
  },
  gold: {
    label: "Luxury Gold",
    className: "theme-gold",
    fontFamily: "Montserrat, sans-serif",
    colors: {
      bg: "bg-gradient-to-br from-yellow-100 via-yellow-300 to-amber-400",
      card: "bg-yellow-200 border border-amber-500 rounded-xl",
      text: "text-yellow-900",
      accent: "bg-yellow-300 text-amber-900",
      badge: "bg-amber-100",
      badgeText: "text-yellow-800",
      sidebar: "bg-yellow-100/90",
      shadow: "shadow-xl shadow-amber-300/50",
    },
  },
  contrast: {
    label: "High Contrast",
    className: "theme-contrast",
    fontFamily: "Outfit, sans-serif",
    colors: {
      bg: "bg-black",
      card: "bg-white border border-black rounded-lg",
      text: "text-black",
      accent: "bg-black text-white",
      badge: "bg-gray-800",
      badgeText: "text-white",
      sidebar: "bg-gray-100",
      shadow: "shadow-lg shadow-black/40",
    },
  },
  nature: {
    label: "Nature Green",
    className: "theme-nature",
    fontFamily: "Montserrat, sans-serif",
    colors: {
      bg: "bg-gradient-to-b from-green-100 via-emerald-100 to-amber-50",
      card: "bg-white/80 border border-green-300 rounded-xl",
      text: "text-emerald-900",
      accent: "bg-green-200 text-emerald-900",
      badge: "bg-emerald-50",
      badgeText: "text-emerald-900",
      sidebar: "bg-green-100/80",
      shadow: "shadow-lg shadow-emerald-200/50",
    },
  },
  mono: {
    label: "Monochrome Minimal",
    className: "theme-mono",
    fontFamily: "IBM Plex Mono, monospace",
    colors: {
      bg: "bg-gradient-to-b from-white via-gray-200 to-gray-100",
      card: "bg-white border border-gray-300 rounded-lg",
      text: "text-gray-900",
      accent: "bg-gray-900 text-white",
      badge: "bg-gray-200",
      badgeText: "text-gray-800",
      sidebar: "bg-gray-100/90",
      shadow: "shadow",
    },
  },
  ink: {
    label: "Ink & Paper",
    className: "theme-ink",
    fontFamily: "Playfair Display, serif",
    colors: {
      bg: "bg-gradient-to-b from-gray-100 via-amber-50 to-white",
      card: "bg-white border border-gray-400 rounded-xl",
      text: "text-gray-900",
      accent: "bg-gray-800 text-white",
      badge: "bg-amber-100",
      badgeText: "text-gray-900",
      sidebar: "bg-gray-50/95",
      shadow: "shadow-lg shadow-gray-500/20",
    },
  },
};
