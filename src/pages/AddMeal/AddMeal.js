import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Image,
  Modal,
} from "react-bootstrap";
import { HiX } from "react-icons/hi";

import "./AddMeal.css";

/**
 * @component AddMealPage
 * Hauptkomponente zum Hinzufügen eines neuen Gerichts.
 * Verantwortlich für:
 * - Formularfelder (Name, Category, Area, Ingredients, Instructions)
 * - Bild-Upload & Vorschau
 * - Validierung und Anzeige von Fehlern/Erfolg
 * - Kommunikation mit dem Backend
 */
function AddMealPage() {
  // -------------------------
  // Form state
  // -------------------------
  const [name, setName] = useState(""); // Name of the meal
  const [instructions, setInstructions] = useState(""); // Cooking instructions
  const [ingredients, setIngredients] = useState([
    { ingredient: "", measure: "" },
  ]); // Ingredients list
  const [thumbnail, setThumbnail] = useState(null); // Uploaded image file
  const [preview, setPreview] = useState(null); // Image preview URL

  const [categories, setCategories] = useState([]); // Categories from backend
  const [areas, setAreas] = useState([]); // Areas/Countries from backend
  const [categoryId, setCategoryId] = useState(""); // Selected category
  const [areaId, setAreaId] = useState(""); // Selected area

  const [showErrorModal, setShowErrorModal] = useState(false); // Show error modal
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Show success modal

  const [highlight, setHighlight] = useState({
    name: false,
    instructions: false,
    categoryId: false,
    areaId: false,
    ingredients: false,
  }); // Highlight fields with errors

  const [pendingValidation, setPendingValidation] = useState(null); // Temporarily store validation results

  // -------------------------
  // Load categories and areas from backend
  // -------------------------
  useEffect(() => {
    fetch("http://localhost/rezept/get-categories-areas.php")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories || []);
        setAreas(data.areas || []);
      })
      .catch((err) => console.error("Error loading categories/areas:", err));
  }, []);

  // -------------------------
  // Handle ingredients changes
  // -------------------------
  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
    clearHighlight("ingredients");
  };

  const addIngredient = () =>
    setIngredients([...ingredients, { ingredient: "", measure: "" }]);

  const removeIngredient = (index) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  // -------------------------
  // Handle file upload and preview
  // -------------------------
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  // -------------------------
  // Clear field highlights
  // -------------------------
  const clearHighlight = (field) => {
    setHighlight((prev) => ({ ...prev, [field]: false }));
  };

  // -------------------------
  // Validate fields before submission
  // -------------------------
  const validateFields = () => {
    const ingredientError = ingredients.some(
      (i) => i.ingredient.trim() === "" || i.measure.trim() === ""
    );

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

  // -------------------------
  // Submit form to backend
  // -------------------------
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
    formData.append(
      "ingredients",
      JSON.stringify(ingredients.filter((i) => i.ingredient.trim() !== ""))
    );

    try {
      const res = await fetch("http://localhost/rezept/add-meal.php", {
        method: "POST",
        body: formData,
      });

      const text = await res.text();
      try {
        JSON.parse(text);
      } catch {
        console.log("Invalid JSON from backend:", text);
        return;
      }

      setShowSuccessModal(true);
      clearForm();
    } catch (err) {
      console.error("Error sending form:", err);
      setShowErrorModal(true);
    }
  };

  // -------------------------
  // Update highlights after error modal is closed
  // -------------------------
  useEffect(() => {
    if (!showErrorModal && pendingValidation) {
      setHighlight(pendingValidation);
      setPendingValidation(null);
    }
  }, [showErrorModal]);

  return (
    <Container className="my-4 meal-page">
      {/* Error modal */}
      <Modal
        show={showErrorModal}
        onHide={() => setShowErrorModal(false)}
        centered
      >
        <Modal.Header closeButton style={{ backgroundColor: "#eddae0" }}>
          <Modal.Title>
            <span style={{ marginRight: "0.5rem", fontSize: "1.5rem" }}>
              ❌
            </span>
            Missing Required Fields
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please fill in all required fields before submitting.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success modal */}
      <Modal
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
        centered
      >
        <Modal.Header closeButton style={{ backgroundColor: "#d4edda" }}>
          <Modal.Title>
            <span
              style={{
                marginRight: "0.5rem",
                color: "#28a745",
                fontSize: "1.5rem",
              }}
            >
              ✔
            </span>
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
              className={`mb-2 text-center ${
                highlight.name ? "required-highlight" : ""
              }`}
            />

            <Form.Select
              value={categoryId}
              onChange={(e) => {
                setCategoryId(e.target.value);
                clearHighlight("categoryId");
              }}
              className={`mb-2 ${
                highlight.categoryId ? "required-highlight" : ""
              }`}
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
              className={`${
                highlight.instructions ? "required-highlight" : ""
              }`}
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
                    onChange={(e) =>
                      handleIngredientChange(
                        index,
                        "ingredient",
                        e.target.value
                      )
                    }
                    className={`${
                      highlight.ingredients ? "required-highlight" : ""
                    }`}
                  />
                </Col>
                <Col>
                  <Form.Control
                    placeholder="Measure"
                    value={item.measure}
                    onChange={(e) =>
                      handleIngredientChange(index, "measure", e.target.value)
                    }
                    className={`${
                      highlight.ingredients ? "required-highlight" : ""
                    }`}
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

            <Button
              variant="secondary"
              onClick={addIngredient}
              className="d-block mx-auto mb-5 mt-4 w-50"
            >
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
