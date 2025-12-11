import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
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
