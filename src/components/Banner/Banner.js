import React from "react";
import "./Banner.css";

/**
 * Banner-Komponente
 * --------------------------------------------------------------
 * Zeigt ein großformatiges Header-/Hero-Bild mit Overlay
 * und typografisch hervorgehobenen Schlagwörtern.
 *
 * Einsatzbereich:
 * - Startseite zur visuellen Einleitung und Markenpositionierung.
 * - Nutzt ein dunkles Overlay, um Textkontrast zu verbessern,
 *   unabhängig vom gewählten Hintergrundbild.
 * --------------------------------------------------------------
 */
function Banner({ lines = [] }) {
    return (
        <div className="banner-wrapper mb-4">
            {/* ------------------------------
                Hintergrundbild des Banners
                Alt-Text für Barrierefreiheit
            ------------------------------ */}
            <img src="/images/homebild.jpg" alt="banner" className="banner-image" />

            {/* ------------------------------
                Dunkles Overlay über dem Bild
                Verbessert die Lesbarkeit des Textes
            ------------------------------ */}
            <div className="banner-dark"></div>

            {/* ------------------------------
                Textbereich des Banners
                Jede Zeile wird als <h2> dargestellt
            ------------------------------ */}
            <div className="banner-text">
                {lines.map((line, index) => (
                    <h2 key={index}>{line}</h2>
                ))}
            </div>
        </div>
    );
}

export default Banner;
