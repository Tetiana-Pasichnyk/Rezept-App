import React from "react";
import { useNavigate } from "react-router-dom";
import "./MealCard.css";

/**
 * Komponente: MealCard
 * Stellt eine Vorschau-Karte für ein Rezept dar.
 * Zeigt Bild, Favoritenstatus, Basisinformationen und Link zur Detailseite.
 *
 * @param {Object} props
 * @param {Object} props.meal – Rezeptdaten (id, name, thumbnail, category_name, area_name, …)
 * @param {boolean} props.isFavorite – Gibt an, ob das Rezept als Favorit markiert ist
 * @param {Function} props.toggleFavorite – Callback zum (De-)Markieren als Favorit
 */
function MealCard({ meal, isFavorite, toggleFavorite }) {
  const navigate = useNavigate();

  return (
    <div className="meal-card shadow-sm position-relative">
      {/* ------------------------------------------------------------------
                Thumbnail des Rezepts.
                Alt-Text sorgt für Zugänglichkeit und bessere SEO.
            ------------------------------------------------------------------- */}
      <img src={meal.thumbnail} alt={meal.name} className="meal-img" />

      {/* ------------------------------------------------------------------
                Favoriten-Button.
                Visuelles Feedback durch Herz-Symbol und Farbwechsel – intuitiv.
                Inline-Styles verwendet, da diese Komponente sehr spezifisches Layout
                an dieser Stelle benötigt.
            ------------------------------------------------------------------- */}
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
          {/* --------------------------------------------------------------
                        Titel und Untertitel (Kategorie und Herkunft).
                        Gibt auf einen Blick wesentliche Informationen zum Rezept.
                    --------------------------------------------------------------- */}
          <div className="meal-title">{meal.name}</div>
          <div className="meal-subtitle">
            {meal.category_name} | {meal.area_name}
          </div>
        </div>

        {/* --------------------------------------------------------------
                    Detail-Button: leitet zur Detailseite des Rezepts weiter.
                    Verwendet programmgesteuerte Navigation über react-router.
                --------------------------------------------------------------- */}
        <button
          className="detail-btn"
          onClick={() => navigate(`/meal/${meal.id}`)}
        >
          Detail
        </button>
      </div>
    </div>
  );
}

export default MealCard;
