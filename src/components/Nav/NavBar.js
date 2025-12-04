import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { Navbar, Nav, Container, Form } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./NavBar.css";

/**
 * @component NavBar
 * Hauptnavigationsleiste der App.
 * Verantwortlich für:
 * - Anzeige des App-Logos
 * - Suchfeld für Mahlzeiten
 * - Navigation (Home, New Recipe, Log-in)
 * - Responsive Verhalten über Bootstrap
 * - Automatischer Reset des Suchfeldes beim Seitenwechsel oder bei Kategoriewechsel
 */
function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { searchTerm, setSearchTerm } = useContext(SearchContext);

    // -------------------------
    // Navigation zu AddMeal-Seite
    // -------------------------
    const goToAddMeal = () => navigate("/add-meal");

    // -------------------------
    // Automatischer Reset des Suchfeldes beim Seitenwechsel
    // -------------------------
    useEffect(() => {
        setSearchTerm("");
    }, [location.pathname, setSearchTerm]);

    // -------------------------
    // Funktion für Reset beim Kategoriewechsel
    // Kann an CategoryButton weitergegeben werden
    // -------------------------
    const resetSearch = () => setSearchTerm("");

    return (
        <Navbar expand="lg" bg="light" className="px-3 shadow-sm">
            <Container fluid className="navbar-container d-flex align-items-center justify-content-between">
                {/* Logo und Branding */}
                <Navbar.Brand className="navbar-logo fw-bold">
                    <i className="bi bi-book" /> Great Recipe
                </Navbar.Brand>

                {/* Suchfeld */}
                <div className="search-wrapper">
                    <Form>
                        <div className="position-relative">
                            <i
                                className="bi bi-search position-absolute"
                                style={{ left: "12px", top: "50%", transform: "translateY(-50%)", color: "#777" }}
                            />
                            <Form.Control
                                type="text"
                                placeholder="Search for a Meal..."
                                className="rounded-pill small-placeholder ps-5"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </Form>
                </div>

                {/* Hamburger Menü für mobile Ansicht */}
                <Navbar.Toggle aria-controls="main-nav" />
                <Navbar.Collapse id="main-nav" className="justify-content-center">
                    <Nav className="text-center">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link onClick={goToAddMeal}>New recipe</Nav.Link>
                        <Nav.Link href="#">Log-in</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
