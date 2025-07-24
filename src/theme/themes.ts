
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
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    shadow: string;
  };
  gradients: {
    primary: string;
    secondary: string;
    background: string;
  };
  effects: {
    blur: string;
    glow: string;
    elevation: string;
  };
}

export const themes: Record<ThemeName, Theme> = {
  light: {
    label: "Light Mode",
    className: "theme-light",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    description: "Clean and minimal light theme",
    colors: {
      primary: "hsl(210, 100%, 50%)",
      secondary: "hsl(210, 40%, 95%)",
      accent: "hsl(210, 100%, 60%)",
      background: "hsl(0, 0%, 100%)",
      surface: "hsl(0, 0%, 100%)",
      text: "hsl(240, 10%, 3.9%)",
      textSecondary: "hsl(210, 25%, 35%)",
      border: "hsl(210, 40%, 90%)",
      shadow: "hsl(210, 40%, 20% / 0.1)"
    },
    gradients: {
      primary: "linear-gradient(135deg, hsl(210, 100%, 50%) 0%, hsl(210, 100%, 60%) 100%)",
      secondary: "linear-gradient(135deg, hsl(210, 40%, 95%) 0%, hsl(210, 40%, 98%) 100%)",
      background: "linear-gradient(135deg, hsl(210, 40%, 98%) 0%, hsl(0, 0%, 100%) 100%)"
    },
    effects: {
      blur: "blur(16px)",
      glow: "0 0 20px hsl(210, 100%, 50% / 0.2)",
      elevation: "0 4px 16px hsl(210, 40%, 20% / 0.12)"
    }
  },
  dark: {
    label: "Dark Mode", 
    className: "theme-dark",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    description: "Sleek dark theme for low-light environments",
    colors: {
      primary: "hsl(210, 100%, 60%)",
      secondary: "hsl(240, 5%, 15%)",
      accent: "hsl(210, 100%, 70%)",
      background: "hsl(240, 10%, 3.9%)",
      surface: "hsl(240, 10%, 7%)",
      text: "hsl(0, 0%, 98%)",
      textSecondary: "hsl(240, 5%, 50%)",
      border: "hsl(240, 5%, 15%)",
      shadow: "hsl(0, 0%, 0% / 0.3)"
    },
    gradients: {
      primary: "linear-gradient(135deg, hsl(210, 100%, 60%) 0%, hsl(210, 100%, 70%) 100%)",
      secondary: "linear-gradient(135deg, hsl(240, 5%, 15%) 0%, hsl(240, 5%, 20%) 100%)",
      background: "linear-gradient(135deg, hsl(240, 10%, 3.9%) 0%, hsl(240, 10%, 7%) 100%)"
    },
    effects: {
      blur: "blur(20px)",
      glow: "0 0 30px hsl(210, 100%, 60% / 0.3)",
      elevation: "0 8px 32px hsl(0, 0%, 0% / 0.4)"
    }
  },
  luxuryGold: {
    label: "Luxury Gold",
    className: "theme-luxury-gold", 
    fontFamily: "'Playfair Display', Georgia, serif",
    description: "Elegant gold theme with premium feel",
    colors: {
      primary: "hsl(45, 100%, 55%)",
      secondary: "hsl(30, 40%, 15%)",
      accent: "hsl(45, 100%, 65%)",
      background: "hsl(30, 100%, 4%)",
      surface: "hsl(30, 40%, 8%)",
      text: "hsl(45, 100%, 85%)",
      textSecondary: "hsl(45, 50%, 60%)",
      border: "hsl(30, 40%, 20%)",
      shadow: "hsl(45, 100%, 30% / 0.3)"
    },
    gradients: {
      primary: "linear-gradient(135deg, hsl(45, 100%, 55%) 0%, hsl(45, 100%, 65%) 100%)",
      secondary: "linear-gradient(135deg, hsl(30, 40%, 15%) 0%, hsl(30, 40%, 20%) 100%)",
      background: "linear-gradient(135deg, hsl(30, 100%, 4%) 0%, hsl(30, 40%, 8%) 100%)"
    },
    effects: {
      blur: "blur(24px)",
      glow: "0 0 40px hsl(45, 100%, 55% / 0.4)",
      elevation: "0 8px 32px hsl(45, 100%, 30% / 0.3)"
    }
  },
  cyberpunkNeon: {
    label: "Cyberpunk Neon",
    className: "theme-cyberpunk-neon",
    fontFamily: "'Poppins', 'Roboto', sans-serif",
    description: "Futuristic neon theme with cyberpunk aesthetics",
    colors: {
      primary: "hsl(285, 100%, 65%)",
      secondary: "hsl(280, 50%, 15%)",
      accent: "hsl(195, 100%, 55%)",
      background: "hsl(270, 100%, 5%)",
      surface: "hsl(280, 50%, 8%)",
      text: "hsl(280, 100%, 85%)",
      textSecondary: "hsl(280, 30%, 60%)",
      border: "hsl(280, 50%, 20%)",
      shadow: "hsl(285, 100%, 50% / 0.4)"
    },
    gradients: {
      primary: "linear-gradient(135deg, hsl(285, 100%, 65%) 0%, hsl(195, 100%, 55%) 100%)",
      secondary: "linear-gradient(135deg, hsl(280, 50%, 15%) 0%, hsl(280, 50%, 20%) 100%)",
      background: "linear-gradient(135deg, hsl(270, 100%, 5%) 0%, hsl(280, 50%, 8%) 100%)"
    },
    effects: {
      blur: "blur(20px)",
      glow: "0 0 50px hsl(285, 100%, 65% / 0.5)",
      elevation: "0 8px 32px hsl(285, 100%, 50% / 0.4)"
    }
  },
  glass: {
    label: "Glass Morphism",
    className: "theme-glass",
    fontFamily: "'Poppins', 'Roboto', sans-serif", 
    description: "Modern glass morphism with transparency effects",
    colors: {
      primary: "hsl(200, 100%, 50%)",
      secondary: "hsl(210, 40%, 93%)",
      accent: "hsl(200, 100%, 60%)",
      background: "hsl(210, 40%, 98%)",
      surface: "hsl(0, 0%, 100% / 0.8)",
      text: "hsl(210, 40%, 15%)",
      textSecondary: "hsl(210, 25%, 35%)",
      border: "hsl(210, 40%, 85% / 0.6)",
      shadow: "hsl(200, 100%, 30% / 0.2)"
    },
    gradients: {
      primary: "linear-gradient(135deg, hsl(200, 100%, 50%) 0%, hsl(200, 100%, 60%) 100%)",
      secondary: "linear-gradient(135deg, hsl(210, 40%, 93%) 0%, hsl(210, 40%, 98%) 100%)",
      background: "linear-gradient(135deg, hsl(210, 40%, 98%) 0%, hsl(200, 50%, 96%) 100%)"
    },
    effects: {
      blur: "blur(20px)",
      glow: "0 0 30px hsl(200, 100%, 50% / 0.3)",
      elevation: "0 8px 32px hsl(200, 100%, 30% / 0.15)"
    }
  }
};
