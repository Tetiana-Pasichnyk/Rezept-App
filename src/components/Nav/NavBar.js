import { Navbar, Nav, Container, Form, Button } from "react-bootstrap";
import "./NavBar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";

// --------------------------------------------------------------------------
// Statisch definierte Kategorienliste.
// Wird aktuell noch nicht in dieser Komponente verwendet, dient aber
// typischerweise als Datenbasis für Filter- oder Menüfunktionen.
// --------------------------------------------------------------------------
const categories = [
    { name: "Beef", color: "#f94144" },
    { name: "Breakfast", color: "#d2691e" },
    { name: "Chicken", color: "#f9c74f" },
    { name: "Dessert", color: "#90be6d" },
    { name: "Pasta", color: "#43aa8b" },
    { name: "Seafood", color: "#4d908e" },
    { name: "Vegan", color: "#577590" },
    { name: "Goat", color: "#db5375" },
    { name: "Lamb", color: "#ec9192" },
    { name: "Miscellaneous", color: "#dfbe99" },
    { name: "Pork", color: "#b5bd89" },
    { name: "Side", color: "#729ea1" },
    { name: "Starter", color: "#13505b" },
    { name: "Vegetarian", color: "#d7d9ce" },
];

function NavBar() {
    const navigate = useNavigate();

    // --------------------------------------------------------------------------
    // Navigation basierend auf Kategorieparameter.
    // Wird programmgesteuert ausgelöst, um konsistentes Routing zu ermöglichen.
    // --------------------------------------------------------------------------
    const handleCategoryClick = (category) => {
        navigate(`/?category=${category}`);
    };

    // --------------------------------------------------------------------------
    // Leitet den Benutzer zur Seite zum Hinzufügen eines neuen Rezepts weiter.
    // Zentrale Navigation erleichtert Refactoring oder spätere Anpassungen.
    // --------------------------------------------------------------------------
    const goToAddMeal = () => {
        navigate("/add-meal");
    };

    return (
        <>
            {/* ------------------------------------------------------------------
                Haupt-Navigation der Anwendung.
                Enthält Branding, Suchfeld sowie Basislinks.
                Das Layout nutzt Bootstrap's responsive Navbar-Komponenten.
            ------------------------------------------------------------------- */}
            <Navbar expand="lg" bg="light" className="px-3 shadow-sm">
                <Container fluid className="navbar-container d-flex align-items-center justify-content-between">

                    {/* --------------------------------------------------------------
                        Marken-/Logo-Bereich.
                        Minimal gehalten; Icon ersetzt ein traditionelles grafisches Logo.
                    --------------------------------------------------------------- */}
                    <Navbar.Brand className="navbar-logo fw-bold">
                        <i className="bi bi-book" /> Super Rezept
                    </Navbar.Brand>

                    {/* --------------------------------------------------------------
                        Suchfeld.
                        Funktionalität ist noch nicht implementiert, aber visuell
                        bereits integriert – ideal für spätere Erweiterungen wie z.B.
                        Live-Suche oder API-gestützte Autocomplete-Funktionen.
                    --------------------------------------------------------------- */}
                    <div className="search-wrapper">
                        <Form>
                            <div className="position-relative">
                                <i
                                    className="bi bi-search position-absolute"
                                    style={{ left: "12px", top: "50%", transform: "translateY(-50%)", color: "#777" }}
                                />
                                <Form.Control type="text" placeholder="Search..." className="rounded-pill ps-5" />
                            </div>
                        </Form>
                    </div>

                    {/* --------------------------------------------------------------
                        Reaktionsfähiger Toggle für mobile Geräte.
                    --------------------------------------------------------------- */}
                    <Navbar.Toggle aria-controls="main-nav" />

                    {/* --------------------------------------------------------------
                        Navigationslinks.
                        Mischung aus statischen Links und programmatischer Navigation.
                    --------------------------------------------------------------- */}
                    <Navbar.Collapse id="main-nav" className="justify-content-center">
                        <Nav className="text-center">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link onClick={goToAddMeal}>Neues Rezept</Nav.Link>
                            <Nav.Link href="#">Log-in</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* --------------------------------------------------------------
                Visuelle Trennlinie zwischen Navigation und Seiteninhalt.
            --------------------------------------------------------------- */}
            <hr className="opacity-50" />
        </>
    );
}

export default NavBar;
