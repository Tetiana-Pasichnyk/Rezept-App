import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { HiX } from "react-icons/hi";

import "./AddMeal.css";

/**
 * AddMealPage-Komponente
 *
 * Diese Komponente ermöglicht es Benutzern, ein neues Rezept hinzuzufügen.
 * Sie beinhaltet:
 * - Bild-Upload mit Vorschau
 * - Eingabe von Name, Kategorie und Land
 * - Verwaltung mehrerer Zutaten
 * - Textbereich für Zubereitungsschritte
 * - Senden der Daten an das Backend
 */
function AddMealPage() {
    // State für die Rezeptdaten
    const [name, setName] = useState("");
    const [instructions, setInstructions] = useState("");
    const [ingredients, setIngredients] = useState([{ ingredient: "", measure: "" }]);
    const [thumbnail, setThumbnail] = useState(null);
    const [preview, setPreview] = useState(null);

    // State für Kategorie- und Länderoptionen
    const [categories, setCategories] = useState([]);
    const [areas, setAreas] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [areaId, setAreaId] = useState("");

    // Fetch-Kategorien und -Länder beim Mounten der Komponente
    useEffect(() => {
        fetch("http://localhost:8888/rezept-plattform/backend/get-categories-areas.php")
            .then((res) => res.json())
            .then((data) => {
                setCategories(data.categories);
                setAreas(data.areas);
            })
            .catch((err) => console.error("Fehler beim Laden der Kategorien/Länder:", err));
    }, []);

    /**
     * Handler für Änderungen einer Zutat
     * @param {number} index - Index der Zutat
     * @param {string} field - Feldname: "ingredient" oder "measure"
     * @param {string} value - Neuer Wert
     */
    const handleIngredientChange = (index, field, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index][field] = value;
        setIngredients(newIngredients);
    };

    // Neue Zutat hinzufügen
    const addIngredient = () => setIngredients([...ingredients, { ingredient: "", measure: "" }]);

    // Zutat entfernen
    const removeIngredient = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    // Handler für Bild-Upload
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setThumbnail(file);
        setPreview(URL.createObjectURL(file));
    };

    // Formular senden
    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("instructions", instructions);
        formData.append("thumbnail", thumbnail);
        formData.append("category_id", categoryId);
        formData.append("area_id", areaId);
        formData.append("ingredients", JSON.stringify(ingredients));

        try {
            const res = await fetch("http://localhost:8888/rezept-plattform/backend/add-meal.php", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            alert(data.message);
        } catch (err) {
            alert("Fehler beim Senden: " + err.message);
        }
    };

    return (
        <Container className="my-4 meal-page">
            {/* Obere Zeile: Bild links, Titel/Kategorie/Land rechts */}
            <Row className="mb-4 g-0">
                <Col md={7}>
                    <div className="meal-image-box">
                        <input
                            type="file"
                            id="thumbnailInput"
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                        />
                        {preview ? (
                            <Image src={preview} alt="Preview" fluid className="meal-image" />
                        ) : (
                            <div className="upload-wrapper">
                                <label htmlFor="thumbnailInput" className="upload-label">
                                    +
                                </label>
                                <div className="upload-text">Upload Image</div>
                            </div>
                        )}
                    </div>
                </Col>

                <Col md={5}>
                    <div className="meal-title-box p-3">
                        {/* Name des Gerichts */}
                        <Form.Control
                            type="text"
                            placeholder="Meal Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mb-2 text-center"
                        />

                        {/* Kategorie auswählen */}
                        <Form.Select
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            className="mb-2 category-select"
                        >
                            <option value="">Category</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </Form.Select>

                        {/* Land auswählen */}
                        <Form.Select value={areaId} onChange={(e) => setAreaId(e.target.value)} className="area-select">
                            <option value="">Country</option>
                            {areas.map((area) => (
                                <option key={area.id} value={area.id}>
                                    {area.name}
                                </option>
                            ))}
                        </Form.Select>
                    </div>
                </Col>
            </Row>

            {/* Untere Zeile: Anleitungen links, Zutaten rechts */}
            <Row>
                <Col md={6}>
                    <div className="meal-instructions card p-3 mb-4 mb-md-0">
                        <h2 className="text-center">Instructions</h2>
                        <Form.Control
                            as="textarea"
                            rows={10}
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                        />
                    </div>
                </Col>

                <Col md={6}>
                    <div className="meal-ingredients card p-3 mb-4 mb-md-0">
                        <h2 className="text-center mb-4">Ingredients</h2>
                        {ingredients.map((item, index) => (
                            <Row key={index} className="mb-2">
                                <Col>
                                    <Form.Control
                                        placeholder="Ingredient"
                                        value={item.ingredient}
                                        onChange={(e) => handleIngredientChange(index, "ingredient", e.target.value)}
                                    />
                                </Col>
                                <Col>
                                    <Form.Control
                                        placeholder="Measure"
                                        value={item.measure}
                                        onChange={(e) => handleIngredientChange(index, "measure", e.target.value)}
                                    />
                                </Col>
                                <Col xs="auto">
                                    <Button onClick={() => removeIngredient(index)} variant="danger">
                                        <HiX size={20} color="#fff" />
                                    </Button>
                                </Col>
                            </Row>
                        ))}

                        {/* Zutat hinzufügen */}
                        <Button variant="secondary" onClick={addIngredient} className="d-block mx-auto mb-5 mt-4 w-50">
                            Add Ingredient
                        </Button>

                        {/* Speichern */}
                        <Button onClick={handleSubmit} className=" mt-4 w-100">
                            Save Meal
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default AddMealPage;
