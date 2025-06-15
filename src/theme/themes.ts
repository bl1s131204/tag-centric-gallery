
export type ThemeName =
  | "light"
  | "dark"
  | "luxuryGold"
  | "cyberpunkNeon"
  | "glass";

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
  light: {
    label: "Light",
    className: "theme-light",
    fontFamily: "'Inter', sans-serif",
    colors: {
      bg: "bg-white",
      card: "bg-[#f9f9f9]",
      text: "text-[#181818]",
      accent: "#0077ff",
      accentText: "#fff",
      primary: "#f9f9f9",
      primaryText: "#181818",
      badge: "bg-blue-100",
      badgeText: "text-blue-700",
      sidebar: "bg-white/90 backdrop-blur-sm",
      shadow: "shadow-md shadow-gray-200/60"
    }
  },
  dark: {
    label: "Dark",
    className: "theme-dark",
    fontFamily: "'Inter', sans-serif",
    colors: {
      bg: "bg-[#23273a]",
      card: "bg-[#1b1b24]",
      text: "text-white",
      accent: "#FFD700",
      accentText: "#151515",
      primary: "#1b1b24",
      primaryText: "#ffffff",
      badge: "bg-yellow-600/20",
      badgeText: "text-yellow-200",
      sidebar: "bg-[#212229]/80 backdrop-blur-md",
      shadow: "shadow-lg shadow-yellow-200/20"
    }
  },
  luxuryGold: {
    label: "Luxury Gold",
    className: "theme-luxury-gold",
    fontFamily: "'Playfair Display', serif",
    colors: {
      bg: "bg-gradient-to-br from-[#222215] to-[#443319]",
      card: "bg-[#2b2516]/90 border border-[#FFD70044]",
      text: "text-[#fff8e1]",
      accent: "#FFD700",
      accentText: "#2b2516",
      primary: "#FFD700",
      primaryText: "#2b2516",
      badge: "bg-yellow-200",
      badgeText: "text-yellow-900",
      sidebar: "bg-[#2b2516]/90 backdrop-blur",
      shadow: "shadow-lg shadow-yellow-200/30"
    }
  },
  cyberpunkNeon: {
    label: "Cyberpunk Neon",
    className: "theme-cyberpunk-neon",
    fontFamily: "'Poppins', sans-serif",
    colors: {
      bg: "bg-gradient-to-br from-[#0F0326] to-[#2DE2E6]",
      card: "bg-black/80 border border-[#FF00FF]",
      text: "text-white",
      accent: "#00FFF9",
      accentText: "#28003d",
      primary: "#FF00FF",
      primaryText: "#FFFFFF",
      badge: "bg-fuchsia-600/30",
      badgeText: "text-fuchsia-200",
      sidebar: "bg-black/90 backdrop-blur-sm",
      shadow: "shadow-xl shadow-cyan-400/25",
    }
  },
  glass: {
    label: "Glass",
    className: "theme-glass",
    fontFamily: "'Poppins', sans-serif",
    colors: {
      bg: "bg-gradient-to-br from-white/75 to-blue-100/60",
      card: "bg-white/30 backdrop-blur-lg border border-white/40",
      text: "text-[#15192B]",
      accent: "#7EC8E3",
      accentText: "#fff",
      primary: "rgba(255,255,255,0.2)",
      primaryText: "#15192B",
      badge: "bg-blue-100/80",
      badgeText: "text-blue-800",
      sidebar: "bg-white/50 backdrop-blur-xl",
      shadow: "shadow-xl shadow-blue-200/20"
    }
  }
};
