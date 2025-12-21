import React from "react";

export type ThemeCtx = {
  isDark: boolean;
  setIsDark: (v: boolean) => void;
};

export const ThemeContext = React.createContext<ThemeCtx | null>(null);
