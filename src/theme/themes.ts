
export type ThemeName = "light" | "gold" | "dark" | "neon" | "cyberpunk";

export interface Theme {
  name: ThemeName;
  label: string;
  description: string;
  className: string;
  preview: {
    background: string;
    primary: string;
    accent: string;
  };
}

export const themes: Record<ThemeName, Theme> = {
  light: {
    name: "light",
    label: "Light Theme",
    description: "Clean and minimal light theme",
    className: "theme-light",
    preview: {
      background: "#ffffff",
      primary: "#007acc",
      accent: "#e0f0ff"
    }
  },
  gold: {
    name: "gold", 
    label: "Gold Theme",
    description: "Elegant gold theme with premium feel",
    className: "theme-gold",
    preview: {
      background: "#fffdf5",
      primary: "#d4af37",
      accent: "#fef3c7"
    }
  },
  dark: {
    name: "dark",
    label: "Dark Theme", 
    description: "Sleek dark theme for low-light environments",
    className: "theme-dark",
    preview: {
      background: "#121212",
      primary: "#2196f3",
      accent: "#2c2c2c"
    }
  },
  neon: {
    name: "neon",
    label: "Neon Theme",
    description: "Bright neon colors with high contrast",
    className: "theme-neon", 
    preview: {
      background: "#0d0d0d",
      primary: "#00ffff",
      accent: "#39ff14"
    }
  },
  cyberpunk: {
    name: "cyberpunk",
    label: "Cyberpunk Theme",
    description: "Futuristic cyberpunk aesthetics",
    className: "theme-cyberpunk",
    preview: {
      background: "#0f0f1a",
      primary: "#f72585",
      accent: "#00fff7"
    }
  }
};
