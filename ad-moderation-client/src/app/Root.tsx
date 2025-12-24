import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, theme as antdTheme } from "antd";

import { ThemeContext } from "./ThemeContext";
import { ThemeProvider } from "./ThemeProvider";
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

function RootInner() {
  const ctx = React.useContext(ThemeContext);
  const isDark = ctx?.isDark ?? false;

  React.useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
  }, [isDark]);

  React.useEffect(() => {
    document.documentElement.style.setProperty(
      "--app-bg",
      isDark ? "#191919ff" : "#ffffff"
    );
  }, [isDark]);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark
          ? antdTheme.darkAlgorithm
          : antdTheme.defaultAlgorithm,
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
  );
}

export function Root() {
  return (
    <ThemeProvider>
      <RootInner />
    </ThemeProvider>
  );
}
