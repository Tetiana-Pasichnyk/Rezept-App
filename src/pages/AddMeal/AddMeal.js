import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Navigation / Redirect
import { Container, Row, Col, Form, Button, Image, Modal } from "react-bootstrap";
import { HiX } from "react-icons/hi";
import { API_BASE_URL } from "../../config/Api";
import "./AddMeal.css";

// ------------------------------
// AddMealPage-Komponente
// Ermöglicht das Hinzufügen eines neuen Gerichts inkl. Bild, Kategorien, Länder und Zutaten
// ------------------------------
function AddMealPage() {
    const navigate = useNavigate(); // Funktion für programmatische Navigation / Redirect

    // ------------------------------
    // Formular-States
    // ------------------------------
    const [name, setName] = useState(""); // Name des Gerichts
    const [instructions, setInstructions] = useState(""); // Zubereitungsanleitung
    const [ingredients, setIngredients] = useState([{ ingredient: "", measure: "" }]); // Zutatenliste
    const [thumbnail, setThumbnail] = useState(null); // Hochgeladenes Bild
    const [preview, setPreview] = useState(null); // Vorschaubild für Upload

    const [categories, setCategories] = useState([]); // Liste verfügbarer Kategorien
    const [areas, setAreas] = useState([]); // Liste verfügbarer Länder
    const [categoryId, setCategoryId] = useState(""); // Ausgewählte Kategorie
    const [areaId, setAreaId] = useState(""); // Ausgewähltes Land

    const [showErrorModal, setShowErrorModal] = useState(false); // Modal bei Validierungsfehler
    const [showSuccessModal, setShowSuccessModal] = useState(false); // Modal bei erfolgreichem Speichern

    const [highlight, setHighlight] = useState({
        name: false,
        instructions: false,
        categoryId: false,
        areaId: false,
        ingredients: false,
    }); // Hervorhebung von Pflichtfeldern

    const [pendingValidation, setPendingValidation] = useState(null); // Temporärer State für Validierung

    // ------------------------------
    // Kategorien und Länder beim Mounten laden
    // ------------------------------
    useEffect(() => {
        fetch(`${API_BASE_URL}/get-categories-areas.php`)
            .then((res) => res.json())
            .then((data) => {
                setCategories(data.categories || []);
                setAreas(data.areas || []);
            })
            .catch((err) => console.error("Fehler beim Laden der Kategorien/Länder:", err));
    }, []);

    // ------------------------------
    // Zutaten-Handler
    // ------------------------------
    const handleIngredientChange = (index, field, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index][field] = value;
        setIngredients(newIngredients);
        clearHighlight("ingredients");
    };

    const addIngredient = () => setIngredients([...ingredients, { ingredient: "", measure: "" }]);

    const removeIngredient = (index) => {
        if (ingredients.length > 1) setIngredients(ingredients.filter((_, i) => i !== index));
    };

    // ------------------------------
    // Bild-Upload
    // ------------------------------
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setThumbnail(file);
        setPreview(file ? URL.createObjectURL(file) : null); // Vorschau generieren
    };

    // ------------------------------
    // Hilfsfunktionen für Hervorhebung
    // ------------------------------
    const clearHighlight = (field) => setHighlight((prev) => ({ ...prev, [field]: false }));

    const validateFields = () => {
        const ingredientError = ingredients.some((i) => i.ingredient.trim() === "" || i.measure.trim() === "");

        return {
            name: !name.trim(),
            instructions: !instructions.trim(),
            categoryId: !categoryId,
            areaId: !areaId,
            ingredients: ingredientError,
        };
    };

    const isAllValid = (validation) => !Object.values(validation).includes(true);

    const clearForm = () => {
        setName("");
        setInstructions("");
        setIngredients([{ ingredient: "", measure: "" }]);
        setThumbnail(null);
        setPreview(null);
        setCategoryId("");
        setAreaId("");
        setHighlight({
            name: false,
            instructions: false,
            categoryId: false,
            areaId: false,
            ingredients: false,
        });
    };

    // ------------------------------
    // Formular absenden
    // ------------------------------
    const handleSubmit = async () => {
        const validation = validateFields();

        if (!isAllValid(validation)) {
            setPendingValidation(validation);
            setShowErrorModal(true);
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("instructions", instructions);
        if (thumbnail) formData.append("thumbnail", thumbnail);
        formData.append("category_id", categoryId);
        formData.append("area_id", areaId);
        formData.append("ingredients", JSON.stringify(ingredients.filter((i) => i.ingredient.trim() !== "")));

        try {
            const res = await fetch(`${API_BASE_URL}/add-meal.php`, {
                method: "POST",
                body: formData,
                credentials: "include",
            });

            const text = await res.text();
            try {
                JSON.parse(text); // Prüfen, ob Backend gültiges JSON zurückliefert
            } catch {
                console.log("Ungültiges JSON vom Backend:", text);
                return;
            }

            setShowSuccessModal(true);
            clearForm();

            // Redirect zur MyRecipes-Seite
            navigate("/my-recipes");
        } catch (err) {
            console.error("Fehler beim Senden des Formulars:", err);
            setShowErrorModal(true);
        }
    };

    // ------------------------------
    // Update der Feld-Hervorhebungen nach Modal-Schließen
    // ------------------------------
    useEffect(() => {
        if (!showErrorModal && pendingValidation) {
            setHighlight(pendingValidation);
            setPendingValidation(null);
        }
    }, [showErrorModal]);

    // ------------------------------
    // JSX / Render
    // ------------------------------
    return (
        <Container className="my-4 meal-page">
            {/* Error Modal */}
            <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)} centered>
                <Modal.Header closeButton style={{ backgroundColor: "#eddae0" }}>
                    <Modal.Title>
                        <span style={{ marginRight: "0.5rem", fontSize: "1.5rem" }}>❌</span>
                        Missing Required Fields
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>Please fill in all required fields before submitting.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Success Modal */}
            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
                <Modal.Header closeButton style={{ backgroundColor: "#d4edda" }}>
                    <Modal.Title>
                        <span style={{ marginRight: "0.5rem", color: "#28a745", fontSize: "1.5rem" }}>✔</span>
                        Meal Saved
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ color: "#155724", fontSize: "1.1rem" }}>
                    Your meal has been successfully saved!
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="success"
                        onClick={() => setShowSuccessModal(false)}
                        style={{ borderRadius: "40px", padding: "0.5rem 1.4rem" }}
                    >
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Meal Image + Upload */}
            <Row className="mb-4 g-0">
                <Col md={7}>
                    <div className="meal-image-box">
                        <input
                            type="file"
                            id="thumbnailInput"
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                            accept="image/*"
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

                {/* Meal Name + Kategorie + Land */}
                <Col md={5}>
                    <div className="meal-title-box p-3">
                        <Form.Control
                            type="text"
                            placeholder="Meal Name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                clearHighlight("name");
                            }}
                            className={`mb-2 text-center ${highlight.name ? "required-highlight" : ""}`}
                        />

                        <Form.Select
                            value={categoryId}
                            onChange={(e) => {
                                setCategoryId(e.target.value);
                                clearHighlight("categoryId");
                            }}
                            className={`mb-2 ${highlight.categoryId ? "required-highlight" : ""}`}
                        >
                            <option value="">Category</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </Form.Select>

                        <Form.Select
                            value={areaId}
                            onChange={(e) => {
                                setAreaId(e.target.value);
                                clearHighlight("areaId");
                            }}
                            className={`mb-2 ${highlight.areaId ? "required-highlight" : ""}`}
                        >
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

            {/* Instructions + Ingredients */}
            <Row>
                <Col md={6}>
                    <div className="meal-instructions card p-3 mb-4 mb-md-0">
                        <h2 className="text-center">Instructions</h2>
                        <Form.Control
                            as="textarea"
                            rows={10}
                            placeholder="Write the instructions here..."
                            value={instructions}
                            onChange={(e) => {
                                setInstructions(e.target.value);
                                clearHighlight("instructions");
                            }}
                            className={`${highlight.instructions ? "required-highlight" : ""}`}
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
                                        className={`${highlight.ingredients ? "required-highlight" : ""}`}
                                    />
                                </Col>
                                <Col>
                                    <Form.Control
                                        placeholder="Measure"
                                        value={item.measure}
                                        onChange={(e) => handleIngredientChange(index, "measure", e.target.value)}
                                        className={`${highlight.ingredients ? "required-highlight" : ""}`}
                                    />
                                </Col>
                                <Col xs="auto">
                                    <Button
                                        onClick={() => removeIngredient(index)}
                                        variant="danger"
                                        disabled={ingredients.length === 1}
                                    >
                                        <HiX size={20} color="#fff" />
                                    </Button>
                                </Col>
                            </Row>
                        ))}

                        <Button variant="secondary" onClick={addIngredient} className="d-block mx-auto mb-5 mt-4 w-50">
                            Add Ingredient
                        </Button>
                        <Button onClick={handleSubmit} className="w-100 mt-4">
                            Save Meal
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default AddMealPage;