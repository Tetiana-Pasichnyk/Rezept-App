import { Button } from "react-bootstrap";
import "./CategoryButton.css";

export default function CategoryButton({ categories = [], activeCategory, onCategorySelect }) {
    return (
        <div className="category-container py-2">
            <div className="category-scroll d-flex overflow-auto px-2">
                <Button
                    className={`category-pill me-2 ${activeCategory === null ? "active" : ""}`}
                    onClick={() => onCategorySelect(null)}
                    style={{ backgroundColor: "#f94143", color: "#000", border: "none", borderRadius: "20px" }}
                >
                    All
                </Button>

                {categories.map((cat) => (
                    <Button
                        key={cat.id}
                        className={`category-pill me-2 ${activeCategory === cat.name ? "active" : ""}`}
                        onClick={() => onCategorySelect(cat.name)}
                        style={{ backgroundColor: cat.color, color: "#000", border: "none", borderRadius: "20px" }}
                    >
                        {cat.name}
                    </Button>
                ))}
            </div>
        </div>
    );
}
