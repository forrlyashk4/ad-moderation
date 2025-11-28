import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AdList } from "../widgets/ads-list";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

// This code is only for TypeScript
declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import("@tanstack/query-core").QueryClient;
  }
}

// This code is for all users
window.__TANSTACK_QUERY_CLIENT__ = queryClient;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <h1>Шапка приложения</h1>
      <AdList />
    </QueryClientProvider>
  </StrictMode>
);
