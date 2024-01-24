import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

// Create a React root and render the App component inside it
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // Wrap the App component with I18nextProvider to enable internationalization
  <I18nextProvider i18n={i18n}>
    {/* Enable React StrictMode for development */}
    <React.StrictMode>
      {/* Render the main App component */}
      <App />
    </React.StrictMode>
  </I18nextProvider>
);
