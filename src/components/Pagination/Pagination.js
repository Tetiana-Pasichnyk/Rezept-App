import React from "react";
import "./Pagination.css";

/**
 * Pagination-Komponente
 * --------------------------------------------------------------
 * Minimalistische, wiederverwendbare Paginierung.
 * 
 * Props:
 * - currentPage: aktuelle Seite (number)
 * - totalPages: Gesamtanzahl der Seiten (number)
 * - onPrev: Callback, wenn "Zurück"-Button gedrückt wird
 * - onNext: Callback, wenn "Weiter"-Button gedrückt wird
 * 
 * Besonderheiten:
 * - Vollständig kontrolliert über Props (Controlled Component)
 * - Buttons werden automatisch deaktiviert, wenn Grenzen erreicht sind
 * - Flexibles Layout für unterschiedliche UI-Kontexte
 * --------------------------------------------------------------
 */
function Pagination({ currentPage, totalPages, onPrev, onNext }) {
    return (
        <div className="d-flex justify-content-center align-items-center my-4">
            {/* ------------------------------
                "Zurück"-Button
                - deaktiviert, wenn aktuelle Seite = 1
                - gibt visuelles Feedback durch CSS
            ------------------------------ */}
            <button
                className="pagination-btn me-3"
                onClick={onPrev}
                disabled={currentPage === 1}
            >
                ◀
            </button>

            {/* ------------------------------
                Anzeige der aktuellen Seite / Gesamtseiten
                - klare, gut lesbare Darstellung
            ------------------------------ */}
            <span className="pagination-text">
                {currentPage} / {totalPages}
            </span>

            {/* ------------------------------
                "Weiter"-Button
                - deaktiviert, wenn aktuelle Seite = Gesamtseiten
                - gibt visuelles Feedback durch CSS
            ------------------------------ */}
            <button
                className="pagination-btn ms-3"
                onClick={onNext}
                disabled={currentPage === totalPages}
            >
                ▶
            </button>
        </div>
    );
}

export default Pagination;
