 import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { Navbar, Nav, Container, Form } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./NavBar.css";
import { useState } from "react";
import { API_BASE_URL } from "../../config/Api";

/**
 * NavBar-Komponente
 * --------------------------------------------------------------
 * Hauptnavigationsleiste der App.
 *
 * Verantwortlich für:
 * - Anzeige des App-Logos
 * - Suchfeld für Mahlzeiten
 * - Navigation (Home, Favorites, My Recipes, Add Meal, Login/Logout)
 * - Responsive Verhalten über Bootstrap
 * - Automatischer Reset des Suchfeldes beim Seitenwechsel oder bei Kategoriewechsel
 * - Login-Statusprüfung via Backend
 * --------------------------------------------------------------
 */
function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { searchTerm, setSearchTerm } = useContext(SearchContext);

    // -------------------------
    // Navigation zur AddMeal-Seite
    // -------------------------
    const goToAddMeal = () => navigate("/add-meal");

    // -------------------------
    // Automatischer Reset des Suchfeldes beim Seitenwechsel
    // useEffect reagiert auf Pfadänderungen
    // -------------------------
    useEffect(() => {
        setSearchTerm("");
    }, [location.pathname, setSearchTerm]);

    // -------------------------
    // Funktion zum Reset beim Kategoriewechsel
    // Kann an CategoryButton-Komponente weitergegeben werden
    // -------------------------
    const resetSearch = () => setSearchTerm("");

    // -------------------------
    // Lokaler State für Login-Status
    // -------------------------
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // -------------------------
    // Backend-Abfrage für Login-Status beim Initial-Render
    // -------------------------
    useEffect(() => {
        fetch(`${API_BASE_URL}/check-login.php`, {
            credentials: "include", // send PHPSESSID cookie
        })
            .then((res) => res.json())
            .then((data) => setIsLoggedIn(data.loggedIn))
            .catch((err) => console.error("Failed to check login:", err));
    }, []);

    // -------------------------
    // Logout-Funktion
    // Backend-Aufruf und Redirect auf Startseite
    // -------------------------
    const handleLogout = () => {
        fetch(`${API_BASE_URL}/logout.php`, {
            credentials: "include",
        })
            .then(() => {
                setIsLoggedIn(false);
                window.location.href = "http://localhost:3000";
            })
            .catch((err) => console.error("Logout failed:", err));
    };

    return (
        <Navbar expand="lg" bg="light" className="px-3 shadow-sm">
            <Container fluid className="navbar-container d-flex align-items-center justify-content-between">
                {/* ------------------------------
                    Logo und Branding
                    ------------------------------ */}
                <Navbar.Brand className="navbar-logo fw-bold">
                    <i className="bi bi-book" /> Great Recipe
                </Navbar.Brand>

                {/* ------------------------------
                    Suchfeld für Mahlzeiten
                    - Icon überlagert Inputfeld
                    - State gesteuert über Context
                ------------------------------ */}
                <div className="search-wrapper">
                    <Form>
                        <div className="position-relative">
                            <i
                                className="bi bi-search position-absolute"
                                style={{
                                    left: "12px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: "#777",
                                }}
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

                {/* ------------------------------
                    Hamburger Menü für mobile Ansicht
                    ------------------------------ */}
                <Navbar.Toggle aria-controls="main-nav" />

                {/* ------------------------------
                    Navigationslinks abhängig vom Login-Status
                    ------------------------------ */}
                {!isLoggedIn ? (
                    <Navbar.Collapse id="main-nav" className="justify-content-center">
                        <Nav className="text-center">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/favorites">My favorites</Nav.Link>
                            <Nav.Link href="/login">Log-in</Nav.Link>
                            <Nav.Link href="/register">Register</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                ) : (
                    <Navbar.Collapse id="main-nav" className="justify-content-center">
                        <Nav className="text-center">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/favorites">My favorites</Nav.Link>
                            <Nav.Link href="/my-recipes">My Recipes</Nav.Link>
                            <Nav.Link onClick={goToAddMeal}>New recipe</Nav.Link>
                            <Nav.Link onClick={() => handleLogout()} href="/">
                                Log-out
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                )}
            </Container>
        </Navbar>
    );
}

export default NavBar;
