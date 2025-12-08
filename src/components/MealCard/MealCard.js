import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MealCard.css";

/**
 * MealCard-Komponente
 * --------------------------------------------------------------
 * Anzeige eines einzelnen Rezepts in Kartenform mit Hover- und Click-Animationen.
 * 
 * Props:
 * - meal: Objekt mit allen Rezeptinformationen (name, thumbnail, category_name, area_name, id)
 * - isFavorite: Boolean, ob das Meal als Favorit markiert ist
 * - toggleFavorite: Callback-Funktion zum Umschalten des Favoritenstatus
 * - showFavorite: optional, ob der Favoriten-Button angezeigt wird (default: true)
 *
 * Features:
 * - Vorschaubild mit Alt-Text für Barrierefreiheit
 * - Favoriten-Toggle-Button oben rechts mit Puls-Animation bei Klick
 * - Anzeige von Name, Kategorie und Herkunft
 * - Button zur Navigation zur Detailseite des Rezepts
 * - Smooth Hover-Effekte für Card, Bild und Buttons
 * --------------------------------------------------------------
 */
function MealCard({ meal, isFavorite, toggleFavorite, showFavorite = true }) {
    // ------------------------------
    // useNavigate Hook für Navigation zur Detailseite
    // ------------------------------
    const navigate = useNavigate();

    // ------------------------------
    // State für Herz-Pulsanimation beim Klicken
    // ------------------------------
    const [pulse, setPulse] = useState(false);

    // ------------------------------
    // Handler für Klick auf Favoriten-Button
    // - Toggle Favorite
    // - Trigger Herz-Pulsanimation
    // ------------------------------
    const handleFavoriteClick = () => {
        toggleFavorite(meal);
        setPulse(true);
        setTimeout(() => setPulse(false), 300); // Dauer der Animation entspricht CSS keyframes
    };

    return (
        <div className="meal-card shadow-sm position-relative">
            {/* --------------------------------------------------
                Anzeige des Vorschaubildes
                - Objektfüllend, skalierbar mit Hover-Effekt
                - Alt-Text für Barrierefreiheit
            -------------------------------------------------- */}
            <img src={meal.thumbnail} alt={meal.name} className="meal-img" />

            {/* --------------------------------------------------
                Favoriten-Button (❤️ / 🤍)
                - Oben rechts positioniert
                - Farbe abhängig vom Favoritenstatus
                - Puls-Animation beim Klick
            -------------------------------------------------- */}
            {showFavorite && (
                <button
                    onClick={handleFavoriteClick}
                    className={pulse ? "heart-pulse" : ""}
                    style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        background: "transparent",
                        border: "none",
                        fontSize: "24px",
                        cursor: "pointer",
                        color: isFavorite ? "red" : "white",
                    }}
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                    {isFavorite ? "❤️" : "🤍"}
                </button>
            )}

            {/* --------------------------------------------------
                Informationsbereich
                - Name, Kategorie, Herkunft
                - Button zur Detailseite
                - Glassmorphism-Effekt + Hover-Transparenz
            -------------------------------------------------- */}
            <div className="meal-info">
                <div>
                    <div className="meal-title">{meal.name}</div>
                    <div className="meal-subtitle">
                        {meal.category_name} | {meal.area_name}
                    </div>
                </div>

                {/* Navigation zur Detailseite */}
                <button className="detail-btn" onClick={() => navigate(`/meal/${meal.id}`)}>
                    Detail
                </button>
            </div>
        </div>
    );
}

export default MealCard;
