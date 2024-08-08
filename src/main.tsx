import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// Supports weights 100-800
import "@fontsource-variable/jetbrains-mono";
import "@fontsource/libre-barcode-128-text";
import "@fontsource/unifont";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
