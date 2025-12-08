import React from "react";
import { useNavigate } from "react-router-dom";
import "./MealCard.css";

function MealCard({ meal, isFavorite, toggleFavorite }) {
    // ------------------------------
    // useNavigate Hook für Navigation zu Detailseite
    // ------------------------------
    const navigate = useNavigate();

    return (
        <div className="meal-card shadow-sm position-relative">
            {/* ------------------------------
                Anzeige des Vorschaubildes des Meals
                Alt-Text für Barrierefreiheit
            ------------------------------ */}
            <img src={meal.thumbnail} alt={meal.name} className="meal-img" />

            {/* ------------------------------
                Favoriten-Button (Toggle)
                Positioniert oben rechts, Farbe abhängig vom Favoritenstatus
            ------------------------------ */}
            <button
                onClick={() => toggleFavorite(meal)}
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
            >
                {isFavorite ? "❤️" : "🤍"}
            </button>

            {/* ------------------------------
                Informationen zum Meal: Name, Kategorie, Herkunft
                Button für Detailansicht
            ------------------------------ */}
            <div className="meal-info">
                <div>
                    <div className="meal-title">{meal.name}</div>
                    <div className="meal-subtitle">
                        {meal.category_name} | {meal.area_name}
                    </div>
                </div>

                {/* Navigation zur Detailseite des Meals */}
                <button className="detail-btn" onClick={() => navigate(`/meal/${meal.id}`)}>
                    Detail
                </button>
            </div>
        </div>
    );
}

export default MealCard;
