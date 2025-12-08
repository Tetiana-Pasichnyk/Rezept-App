import { Button } from "react-bootstrap";
import "./CategoryButton.css";

/**
 * CategoryButton-Komponente
 * --------------------------------------------------------------
 * Darstellung einer horizontal scrollbaren Kategorie-Leiste.
 * Jede Kategorie wird als Button angezeigt, farblich codiert.
 *
 * Props:
 * - categories: Array der verfügbaren Kategorien (id, name, color)
 * - activeCategory: aktuell ausgewählte Kategorie (string oder null)
 * - onCategorySelect: Callback zur Auswahl einer Kategorie
 *
 * Diese Komponente dient als UI-Filterleiste und ist bewusst flexibel
 * gestaltet, sodass sie sowohl im Header als auch in Content-Bereichen
 * eingesetzt werden kann.
 * --------------------------------------------------------------
 */
function CategoryButton({ categories = [], activeCategory, onCategorySelect }) {
    return (
        <div className="category-container py-2">
            {/* --------------------------------------------------------------
                Scrollbarer Wrapper
                - horizontale Kategorie-Navigation
                - overflow-auto sorgt dafür, dass auch bei vielen Kategorien
                  Scrollbarkeit auf kleinen Bildschirmen erhalten bleibt
            -------------------------------------------------------------- */}
            <div className="category-scroll d-flex overflow-auto px-2">
                {/* ----------------------------------------------------------
                    "All"-Button
                    - Repräsentiert die Reset-Option für Filter
                    - Visuell wie Kategorie-Pills gestaltet, mit festem Farbwert
                ---------------------------------------------------------- */}
                <Button
                    className={`category-pill me-2 ${activeCategory === null ? "active" : ""}`}
                    onClick={() => onCategorySelect(null)}
                    style={{
                        backgroundColor: "#f94143",
                        color: "#000",
                        border: "none",
                        borderRadius: "20px",
                    }}
                >
                    All
                </Button>

                {/* ----------------------------------------------------------
                    Dynamisch generierte Kategorie-Buttons
                    - Jeder Button erhält die spezifische Farbe der Kategorie
                    - activeCategory markiert die aktuell gewählte Kategorie
                ---------------------------------------------------------- */}
                {categories.map((cat) => (
                    <Button
                        key={cat.id}
                        className={`category-pill me-2 ${activeCategory === cat.name ? "active" : ""}`}
                        onClick={() => onCategorySelect(cat.name)}
                        style={{
                            backgroundColor: cat.color,
                            color: "#000",
                            border: "none",
                            borderRadius: "20px",
                        }}
                    >
                        {cat.name}
                    </Button>
                ))}
            </div>
        </div>
    );
}

export default CategoryButton;
