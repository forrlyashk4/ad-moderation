import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeContext } from "./ThemeContext";
import { ConfigProvider, theme } from "antd";

import { List } from "../pages/list";
import { Item } from "../pages/item";
import { Stats } from "../pages/stats";

const queryClient = new QueryClient();

declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import("@tanstack/query-core").QueryClient;
  }
}

window.__TANSTACK_QUERY_CLIENT__ = queryClient;

export function Root() {
  const [isDark, setIsDark] = React.useState(() => {
    const saved = localStorage.getItem("theme");
    return saved !== "dark"; // поменять на нормальную логику
  });

  React.useEffect(() => {
    const theme = isDark ? "dark" : "light";
    localStorage.setItem("theme", theme);
    document.documentElement.dataset.theme = theme;
  }, [isDark]);

  React.useEffect(() => {
    document.body.style.setProperty(
      "--app-bg",
      isDark ? "#191919ff" : "#ffffff"
    );
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      <ConfigProvider
        theme={{
          algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
      >
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<List />} />
              <Route path="/list" element={<List />} />
              <Route path="/item/:id" element={<Item />} />
              <Route path="/stats" element={<Stats />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}
