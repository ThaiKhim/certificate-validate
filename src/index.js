import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ProviderContextProvider } from "./components/providerContext/providerContext,";
const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ProviderContextProvider>
      <App />
    </ProviderContextProvider>
  </React.StrictMode>
);
