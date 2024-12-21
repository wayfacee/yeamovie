import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.scss";
import { ErrorBoundary } from "./providers/ErrorBoundary";
import { StoreProvider } from "./providers/StoreProvider";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Toaster } from "@/shared/ui";
import { ScrollToHash } from "@/shared/ui";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <ErrorBoundary>
          <ScrollToHash />
          <App />
          <Toaster />
        </ErrorBoundary>
      </StoreProvider>
    </BrowserRouter>
  </StrictMode>,
);
