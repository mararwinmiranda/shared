const tintColorLight = "#2563EB";
const tintColorDark = "#60A5FA";

export const Colors = {
  light: {
    text: "#1E293B",
    background: "#FFFFFF",
    tint: tintColorLight,
    icon: "#64748B",
    tabIconDefault: "#94A3B8",
    tabIconSelected: tintColorLight,
    card: "#F1F5F9",
    border: "#E2E8F0",
  },
  dark: {
    text: "#F1F5F9",
    background: "#0F172A",
    tint: tintColorDark,
    icon: "#94A3B8",
    tabIconDefault: "#64748B",
    tabIconSelected: tintColorDark,
    card: "#1E293B",
    border: "#334155",
  },
};

export type ThemeName = keyof typeof Colors;
