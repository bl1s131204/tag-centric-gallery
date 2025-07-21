
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
      bg: "bg-gradient-to-br from-gray-50 to-white",
      card: "bg-white border border-gray-200/60",
      text: "text-gray-900",
      accent: "#0077ff",
      accentText: "#fff",
      primary: "#f8fafc",
      primaryText: "#1e293b",
      badge: "bg-blue-100",
      badgeText: "text-blue-800",
      sidebar: "bg-white/95 backdrop-blur-sm border-r border-gray-200",
      shadow: "shadow-lg shadow-gray-200/40"
    }
  },
  dark: {
    label: "Dark",
    className: "theme-dark",
    fontFamily: "'Inter', sans-serif",
    colors: {
      bg: "bg-gradient-to-br from-gray-900 to-gray-800",
      card: "bg-gray-800/90 border border-gray-700/60",
      text: "text-gray-100",
      accent: "#3b82f6",
      accentText: "#ffffff",
      primary: "#1f2937",
      primaryText: "#f9fafb",
      badge: "bg-blue-600/20",
      badgeText: "text-blue-300",
      sidebar: "bg-gray-900/95 backdrop-blur-sm border-r border-gray-700",
      shadow: "shadow-lg shadow-black/40"
    }
  },
  luxuryGold: {
    label: "Luxury Gold",
    className: "theme-luxury-gold",
    fontFamily: "'Playfair Display', serif",
    colors: {
      bg: "bg-gradient-to-br from-amber-950 via-yellow-900 to-amber-800",
      card: "bg-amber-900/20 border border-amber-600/30 backdrop-blur-sm",
      text: "text-amber-50",
      accent: "#fbbf24",
      accentText: "#451a03",
      primary: "#f59e0b",
      primaryText: "#451a03",
      badge: "bg-amber-200/20",
      badgeText: "text-amber-200",
      sidebar: "bg-amber-950/90 backdrop-blur border-r border-amber-800/50",
      shadow: "shadow-lg shadow-amber-600/20"
    }
  },
  cyberpunkNeon: {
    label: "Cyberpunk Neon",
    className: "theme-cyberpunk-neon",
    fontFamily: "'Poppins', sans-serif",
    colors: {
      bg: "bg-gradient-to-br from-violet-950 via-purple-900 to-fuchsia-900",
      card: "bg-black/60 border border-fuchsia-500/50 backdrop-blur-sm",
      text: "text-cyan-100",
      accent: "#06b6d4",
      accentText: "#0c0a09",
      primary: "#d946ef",
      primaryText: "#fdf4ff",
      badge: "bg-fuchsia-600/20",
      badgeText: "text-fuchsia-300",
      sidebar: "bg-black/80 backdrop-blur border-r border-fuchsia-500/30",
      shadow: "shadow-lg shadow-fuchsia-500/25",
    }
  },
  glass: {
    label: "Glass",
    className: "theme-glass",
    fontFamily: "'Poppins', sans-serif",
    colors: {
      bg: "bg-gradient-to-br from-blue-50/80 via-white/90 to-cyan-50/80",
      card: "bg-white/40 backdrop-blur-xl border border-white/60",
      text: "text-slate-800",
      accent: "#0ea5e9",
      accentText: "#ffffff",
      primary: "#e0f2fe",
      primaryText: "#0f172a",
      badge: "bg-blue-100/60",
      badgeText: "text-blue-800",
      sidebar: "bg-white/60 backdrop-blur-xl border-r border-white/40",
      shadow: "shadow-lg shadow-blue-200/30"
    }
  }
};
