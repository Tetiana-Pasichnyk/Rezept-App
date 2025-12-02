import React from "react";
import { useNavigate } from "react-router-dom";
import "./MealCard.css";

function MealCard({ meal, isFavorite, toggleFavorite }) {
    const navigate = useNavigate();

    return (
        <div className="meal-card shadow-sm position-relative">
            <img src={meal.thumbnail} alt={meal.name} className="meal-img" />

            <button
                onClick={() => toggleFavorite(meal.id)}
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

            <div className="meal-info">
                <div>
                    <div className="meal-title">{meal.name}</div>
                    <div className="meal-subtitle">
                        {meal.category_name} | {meal.area_name}
                    </div>
                </div>

                <button className="detail-btn" onClick={() => navigate(`/meal/${meal.id}`)}>
                    Detail
                </button>
            </div>
        </div>
    );
}

export default MealCard;
