import React from "react";
import "./Pagination.css";

// Diese Komponente kapselt eine einfache Paginierung.
// Sie ist bewusst minimal gehalten, um in unterschiedlichen UI-Kontexten wiederverwendbar zu sein.
// Das Rendering basiert ausschließlich auf den übergebenen Props, wodurch die Komponente vollständig kontrolliert bleibt.
function Pagination({ currentPage, totalPages, onPrev, onNext }) {
    return (
        <div className="d-flex justify-content-center align-items-center my-4">
            {/* Zurück-Button: wird deaktiviert, wenn bereits auf der ersten Seite */}
            <button className="pagination-btn me-3" onClick={onPrev} disabled={currentPage === 1}>
                ◀
            </button>

            {/* Anzeige der aktuellen Seite im Verhältnis zur Gesamtseitenzahl */}
            <span className="pagination-text">
                {currentPage} / {totalPages}
            </span>

            {/* Weiter-Button: wird deaktiviert, wenn die letzte Seite erreicht ist */}
            <button className="pagination-btn ms-3" onClick={onNext} disabled={currentPage === totalPages}>
                ▶
            </button>
        </div>
    );
}

export default Pagination;
