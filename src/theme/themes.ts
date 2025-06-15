
export type ThemeName =
  | "elegantMinimalist"
  | "darkLuxury"
  | "neonCyberpunk"
  | "softPastel"
  | "boldMagazine"
  | "natureInspired"
  | "glassmorphism"
  | "retroVintage"
  | "artisticBrush"
  | "futuristicMinimal";

interface Theme {
  label: string;
  className: string;
  fontFamily: string;
  colors: {
    bg: string;
    card: string;
    text: string;
    accent: string; // hex
    accentText: string; // hex
    primary: string; // hex, for card bg etc
    primaryText: string; // hex
    badge: string;
    badgeText: string;
    sidebar: string;
    shadow: string;
  };
}

export const themes: Record<ThemeName, Theme> = {
  elegantMinimalist: {
    label: "Elegant Minimalist",
    className: "theme-elegant-minimalist",
    fontFamily: "'Inter', sans-serif",
    colors: {
      bg: "bg-white",
      card: "bg-[#F5F5F5]",
      text: "text-[#111111]",
      accent: "#007ACC",
      accentText: "#FFFFFF",
      primary: "#F5F5F5",
      primaryText: "#111111",
      badge: "bg-gray-200",
      badgeText: "text-gray-700",
      sidebar: "bg-white/90 backdrop-blur-sm",
      shadow: "shadow-lg shadow-gray-200/50",
    },
  },
  darkLuxury: {
    label: "Dark Luxury",
    className: "theme-dark-luxury",
    fontFamily: "'Playfair Display', serif",
    colors: {
      bg: "bg-[#121212]",
      card: "bg-[#1E1E1E]",
      text: "text-white",
      accent: "#FFD700",
      accentText: "#121212",
      primary: "#1E1E1E",
      primaryText: "#FFFFFF",
      badge: "bg-yellow-400/20",
      badgeText: "text-yellow-300",
      sidebar: "bg-black/80 backdrop-blur-sm",
      shadow: "shadow-lg shadow-yellow-400/10",
    },
  },
  neonCyberpunk: {
    label: "Neon Cyberpunk",
    className: "theme-neon-cyberpunk",
    fontFamily: "'Poppins', sans-serif",
    colors: {
      bg: "bg-[#0B0B20]",
      card: "bg-black/80 border border-[#FF00FF]",
      text: "text-white",
      accent: "#00FFFF",
      accentText: "#000000",
      primary: "#FF00FF",
      primaryText: "#FFFFFF",
      badge: "bg-fuchsia-500/30",
      badgeText: "text-fuchsia-300",
      sidebar: "bg-black/90 backdrop-blur-sm",
      shadow: "shadow-lg shadow-cyan-500/20",
    },
  },
  softPastel: {
    label: "Soft Pastel",
    className: "theme-soft-pastel",
    fontFamily: "'Poppins', sans-serif",
    colors: {
      bg: "bg-[#FAFAFA]",
      card: "bg-[#E0F7FA]",
      text: "text-[#333333]",
      accent: "#F8BBD0",
      accentText: "#880E4F",
      primary: "#E0F7FA",
      primaryText: "#333333",
      badge: "bg-pink-100",
      badgeText: "text-pink-800",
      sidebar: "bg-[#E0F7FA]/80 backdrop-blur-sm",
      shadow: "shadow-lg shadow-pink-100/50",
    },
  },
  boldMagazine: {
    label: "Bold Magazine",
    className: "theme-bold-magazine",
    fontFamily: "'Playfair Display', serif",
    colors: {
      bg: "bg-white",
      card: "bg-black",
      text: "text-white",
      accent: "#FF0000",
      accentText: "#FFFFFF",
      primary: "#000000",
      primaryText: "#FFFFFF",
      badge: "bg-red-500/20",
      badgeText: "text-red-400",
      sidebar: "bg-gray-100/90 backdrop-blur-sm",
      shadow: "shadow-2xl shadow-black/20",
    },
  },
  natureInspired: {
    label: "Nature Inspired",
    className: "theme-nature-inspired",
    fontFamily: "'Inter', sans-serif",
    colors: {
      bg: "bg-[#F0F8F5]",
      card: "bg-white/80 border border-green-300",
      text: "text-[#2D3142]",
      accent: "#386641",
      accentText: "#FFFFFF",
      primary: "#6A994E",
      primaryText: "#FFFFFF",
      badge: "bg-green-200",
      badgeText: "text-green-800",
      sidebar: "bg-[#F0F8F5]/80 backdrop-blur-sm",
      shadow: "shadow-lg shadow-green-200/50",
    },
  },
  glassmorphism: {
    label: "Glassmorphism",
    className: "theme-glassmorphism",
    fontFamily: "'Poppins', sans-serif",
    colors: {
      bg: "bg-gradient-to-br from-gray-200 to-blue-200",
      card: "bg-white/20 backdrop-blur-lg border border-white/30",
      text: "text-black",
      accent: "#4A90E2",
      accentText: "#FFFFFF",
      primary: "rgba(255,255,255,0.2)",
      primaryText: "#000000",
      badge: "bg-blue-100/80",
      badgeText: "text-blue-800",
      sidebar: "bg-white/30 backdrop-blur-lg",
      shadow: "shadow-xl shadow-blue-200/20",
    },
  },
  retroVintage: {
    label: "Retro Vintage",
    className: "theme-retro-vintage",
    fontFamily: "'Playfair Display', serif",
    colors: {
      bg: "bg-[#F5F5DC]",
      card: "bg-[#FAF0E6] border border-[#C19A6B]",
      text: "text-[#3E2723]",
      accent: "#6B4226",
      accentText: "#FFFFFF",
      primary: "#C19A6B",
      primaryText: "#FFFFFF",
      badge: "bg-amber-200",
      badgeText: "text-amber-800",
      sidebar: "bg-[#F5F5DC]/80 backdrop-blur-sm",
      shadow: "shadow-lg shadow-yellow-800/20",
    },
  },
  artisticBrush: {
    label: "Artistic Brush",
    className: "theme-artistic-brush",
    fontFamily: "'Playfair Display', serif",
    colors: {
      bg: "bg-white",
      card: "bg-[#FFF8DC]",
      text: "text-[#2F4F4F]",
      accent: "#FF6347",
      accentText: "#FFFFFF",
      primary: "#FFF8DC",
      primaryText: "#2F4F4F",
      badge: "bg-red-200",
      badgeText: "text-red-900",
      sidebar: "bg-[#FFF8DC]/90 backdrop-blur-sm",
      shadow: "shadow-lg shadow-red-200/40",
    },
  },
  futuristicMinimal: {
    label: "Futuristic Minimal",
    className: "theme-futuristic-minimal",
    fontFamily: "'Inter', sans-serif",
    colors: {
      bg: "bg-black",
      card: "bg-[#1F1F1F]",
      text: "text-white",
      accent: "#00FFCC",
      accentText: "#000000",
      primary: "#1F1F1F",
      primaryText: "#FFFFFF",
      badge: "bg-cyan-400/20",
      badgeText: "text-cyan-300",
      sidebar: "bg-gray-900/90 backdrop-blur-sm",
      shadow: "shadow-lg shadow-cyan-500/10",
    },
  },
};
