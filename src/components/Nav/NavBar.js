import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { Navbar, Nav, Container, Form } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./NavBar.css";
import { useState } from "react";

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

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //get login status
    useEffect(() => {
        // first redend with backend to check login status
        fetch("http://localhost:8888/rezept-plattform/backend/check-login.php", {
            credentials: "include", // send PHPSESSID cookie
        })
            .then((res) => res.json())
            .then((data) => setIsLoggedIn(data.loggedIn))
            .catch((err) => console.error("Failed to check login:", err));
    }, []);

    //remove localStorage key
    const handleLogout = () => {
        fetch("http://localhost:8888/rezept-plattform/backend/logout.php", {
            credentials: "include",
            // ";
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

                {/* Hamburger Menü für mobile Ansicht */}
                <Navbar.Toggle aria-controls="main-nav" />
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
                            <Nav.Link onClick={goToAddMeal}>New recipe</Nav.Link>
                            <Nav.Link onClick={goToAddMeal}>My recipe</Nav.Link>
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
