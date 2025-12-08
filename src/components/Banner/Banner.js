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
            <img src="/images/homebild.jpg" alt="banner" className="banner-image" />
            <div className="banner-dark"></div>

            <div className="banner-text">
                {lines.map((line, index) => (
                    <h2 key={index}>{line}</h2>
                ))}
            </div>
        </div>
    );
}

export default Banner;