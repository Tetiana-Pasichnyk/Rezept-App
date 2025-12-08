import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// ------------------------------
// Bootstrap CSS & JS importieren
// CSS für Grundstyles, JS für interaktive Komponenten (Modal, Dropdown, etc.)
// ------------------------------
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// React Router import für Routing
import { BrowserRouter } from "react-router-dom";

// Globale CSS-Datei
import "./index.css";

// ------------------------------
// React Root erstellen
// ------------------------------
const root = ReactDOM.createRoot(document.getElementById("root"));

// ------------------------------
// App rendern
// - <React.StrictMode> für Entwicklungswarnungen und zukünftige Fehlererkennung
// - <BrowserRouter> für Client-Side-Routing
// ------------------------------
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// ------------------------------
// Performance-Messung (optional)
// Kann in Konsole geloggt oder an Analytics gesendet werden
// ------------------------------
reportWebVitals();
