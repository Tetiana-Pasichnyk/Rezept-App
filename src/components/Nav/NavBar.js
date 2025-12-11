import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Navbar, Nav, Container, Form } from "react-bootstrap";

import { SearchContext } from "../../context/SearchContext";
import { API_BASE_URL } from "../../config/Api";
import "./NavBar.css";

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
                navigate("/");
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
                    <Link to="/" className="text-decoration-none text-dark d-flex align-items-center nav-link">
                        <i className="bi bi-book" /> Super Recipe
                    </Link>
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
                        <Nav className="text-center ms-auto">
                            <Nav.Link className="nav-link" href="/">
                                <i className="bi bi-house" /> Home
                            </Nav.Link>
                            <Nav.Link className="nav-link" href="/favorites">
                                <i className="bi bi-heart" /> My favorites
                            </Nav.Link>
                            <Nav.Link className="nav-link" href="/login">
                                <i className="bi bi-box-arrow-in-right" /> Log-in
                            </Nav.Link>
                            <Nav.Link className="nav-link" href="/register">
                                <i className="bi bi-person-plus" /> Register
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                ) : (
                    <Navbar.Collapse id="main-nav" className="justify-content-center">
                        <Nav className="text-center ms-auto">
                            <Nav.Link className="nav-link" href="/">
                                <i className="bi bi-house" /> Home
                            </Nav.Link>
                            <Nav.Link className="nav-link" href="/favorites">
                                <i className="bi bi-heart" /> My favorites
                            </Nav.Link>
                            <Nav.Link className="nav-link" href="/my-recipes">
                                <i className="bi bi-journal-text" /> My Recipes
                            </Nav.Link>
                            <Nav.Link className="nav-link" onClick={goToAddMeal}>
                                <i className="bi bi-plus-square" /> New recipe
                            </Nav.Link>
                            <Nav.Link className="nav-link" onClick={() => handleLogout()} href="/">
                                <i className="bi bi-box-arrow-right" /> Log-out
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                )}
            </Container>
        </Navbar>
    );
}

export default NavBar;
