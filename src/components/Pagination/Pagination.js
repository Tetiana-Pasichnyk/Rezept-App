import React from "react";
import "./Pagination.css";

function Pagination({ currentPage, totalPages, onPrev, onNext }) {
    return (
        <div className="d-flex justify-content-center align-items-center my-4">
            <button className="pagination-btn me-3" onClick={onPrev} disabled={currentPage === 1}>
                ◀
            </button>
            <span className="pagination-text">
                {currentPage} / {totalPages}
            </span>
            <button className="pagination-btn ms-3" onClick={onNext} disabled={currentPage === totalPages}>
                ▶
            </button>
        </div>
    );
}

export default Pagination;
