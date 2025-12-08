import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./MealPage.css";

/**
 * MealPage-Komponente
 * ------------------------------------------------------------
 * Lädt ein einzelnes Rezept anhand der ID aus der URL
 * und zeigt Bild, Titel, Anleitung sowie Zutaten an.
 *
 * Hinweise:
 * - API-Request wird in useEffect ausgelöst
 * - Portionen können dynamisch angepasst werden
 * - Komponentenlayout folgt Bootstrap Grid
 * ------------------------------------------------------------
 */
function MealPage() {
    const { id } = useParams();

    // State für ausgewähltes Rezept
    const [meal, setMeal] = useState(null);

    // State für die Portionsanzahl
    const [quantity, setQuantity] = useState(1);

    /**
     * useEffect:
     * ------------------------------------------------------------
     * Ruft die Rezeptdaten von der Backend-API ab,
     * sobald die ID sich ändert.
     * ------------------------------------------------------------
     */
    useEffect(() => {
        fetch(`http://localhost:8888/rezept-plattform/backend/get-meal.php?id=${id}`)
            .then((res) => res.json())
            .then((data) => setMeal(data));
    }, [id]);

    // Funktionen zum Ändern der Portionsanzahl
    const increase = () => setQuantity((prev) => prev + 1);
    const decrease = () => setQuantity((prev) => Math.max(prev - 1, 1));

    // Ladeanzeige, solange das Rezept noch nicht geladen wurde
    if (!meal) return <div className="text-center mt-5">Loading...</div>;

    return (
        <Container className="my-4 meal-page">
            {/* ------------------------------------------------------------
                Oberer Bereich: Bild + Titel
            ------------------------------------------------------------ */}
            <Row className="mb-4 g-0">
                <Col md={7}>
                    <Image src={meal.thumbnail} alt={meal.name} fluid className="meal-image" />
                </Col>

                <Col md={5}>
                    <div className="meal-title-box">
                        <h1 className="text-center">{meal.name}</h1>
                    </div>
                </Col>
            </Row>

            <Row>
                {/* ------------------------------------------------------------
                    Linke Spalte: Anleitung
                ------------------------------------------------------------ */}
                <Col md={6}>
                    <div className="meal-instructions card p-3 mb-4 mb-md-0">
                        <h2 className="text-center">Instructions</h2>
                        <p>{meal.instructions}</p>
                    </div>
                </Col>

                {/* ------------------------------------------------------------
                    Rechte Spalte: Zutaten + Portionsregler
                ------------------------------------------------------------ */}
                <Col md={6}>
                    <div className="meal-ingredients card p-3 mb-4 mb-md-0">
                        <h2 className="text-center mb-4">Ingredients</h2>
                        {/* Portionsregler */}
                        <div className="portion-selector">
                            <button onClick={decrease} className="portion-btn">
                                -
                            </button>

                            <span className="portion-display">
                                <strong>{quantity}</strong> Portions
                            </span>

                            <button onClick={increase} className="portion-btn">
                                +
                            </button>
                        </div>

                        {/* Zutatenliste */}
                        <table className="ingredients-table" cellPadding="0" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>Ingredient</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>

                            <tbody>
                                {meal.ingredients.map((item, index) => {
                                    const match = item.measure.match(/[\d,.]+/);
                                    const number = match ? parseFloat(match[0].replace(",", ".")) : null;
                                    const unit = number ? item.measure.replace(match[0], "").trim() : item.measure;
                                    const total = number ? (number * quantity).toFixed(0) : item.measure;

                                    return (
                                        <tr key={index}>
                                            <td>{item.ingredient}</td>
                                            <td>{number ? `${total} ${unit}` : item.measure}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default MealPage;
