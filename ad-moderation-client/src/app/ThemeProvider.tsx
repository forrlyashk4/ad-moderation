import React from "react";
import { ThemeContext, type ThemeCtx } from "./ThemeContext";

const STORAGE_KEY = "theme";

function readIsDarkFromStorage(): boolean {
  const v = localStorage.getItem(STORAGE_KEY);
  if (v === "dark") return true;
  if (v === "light") return false;
  return false;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = React.useState<boolean>(() =>
    readIsDarkFromStorage()
  );

  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
  }, [isDark]);

  React.useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      setIsDark(readIsDarkFromStorage());
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const value = React.useMemo<ThemeCtx>(
    () => ({ isDark, setIsDark }),
    [isDark]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
