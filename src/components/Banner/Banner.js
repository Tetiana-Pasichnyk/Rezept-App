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
function Banner() {
    return (
        <div className="banner-wrapper mb-4">
            {/* ----------------------------------------------------------
                Hintergrundbild des Banners.
                Bild wird durch CSS skaliert und positioniert, um
                responsives Verhalten sicherzustellen.
            ---------------------------------------------------------- */}
            <img src="/images/homebild.jpg" alt="banner" className="banner-image" />

            {/* ----------------------------------------------------------
                Abdunkelungsebene über dem Bild.
                Verstärkt die Lesbarkeit des Textes und sorgt für
                gleichmäßige Kontraste auf unterschiedlichen Screens.
            ---------------------------------------------------------- */}
            <div className="banner-dark"></div>

            {/* ----------------------------------------------------------
                Textüberlagerung.
                Drei separate <h2>-Elemente zur Erzeugung eines
                gestaffelten typografischen Effekts.
            ---------------------------------------------------------- */}
            <div className="banner-text">
                <h2>Your</h2>
                <h2>digital</h2>
                <h2>Сookbook</h2>
            </div>
        </div>
    );
}

export default Banner;
  