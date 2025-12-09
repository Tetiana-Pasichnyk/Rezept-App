import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Login.css";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config/Api";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

/**
 * Login-Komponente
 * --------------------------------------------------------------
 * Darstellung des Login-Formulars für Benutzer.
 *
 * Features:
 * - Eingabe von Email und Passwort
 * - Login über fetch an das Backend (PHP)
 * - Anzeige von Fehlermeldungen direkt unter dem Formular
 * - Buttons für Registrierung und alternative Logins (Google, Apple)
 *
 * Accessibility:
 * - aria-labels für Input-Felder
 * - Semantische Buttons und Links
 * --------------------------------------------------------------
 */
function Login() {
    const navigate = useNavigate(); // Funktion für programmatische Navigation / Redirect

    // --------------------------------------------
    // State-Management
    // --------------------------------------------
    const [email, setEmail] = useState(""); // Eingabe Email
    const [password, setPassword] = useState(""); // Eingabe Passwort
    const [msg, setMsg] = useState(""); // Anzeige Backend-Nachricht
    const { setIsLoggedIn } = useContext(AuthContext); // Auth-Status
    const [showLoginAlert, setShowLoginAlert] = useState(false); // Modal anzeigen

    // --------------------------------------------
    // Login-Handler
    // --------------------------------------------
    const handleLogin = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/login.php`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include", // Cookies werden mitgesendet
            });

            if (!res.ok) {
                throw new Error(`HTTP Fehler: ${res.status}`);
            }

            const data = await res.json();

            // Backend-Nachricht anzeigen
            setMsg(data.message);

            if (data.success) {
                setIsLoggedIn(true); // Auth-Status setzen
                setShowLoginAlert(true); // Erfolgreiches Login-Modal anzeigen
            }
        } catch (err) {
            console.error("Fetch request failed:", err);
            setMsg(`Connection error: ${err.message}`);
        }
    };

    return (
        <div className="row">
            {/* -----------------------
                Linke Spalte: Login-Formular
               ----------------------- */}
            <div className="col-6 p-0 left-wrapper">
                <div className="m-5 content-box">
                    <div className="d-flex flex-column mt-5 login-content">
                        {/* Logo + Home-Link */}
                        <a className="d-flex flex-row text-decoration-none" href="/" style={{ color: "black" }}>
                            <i className="bi bi-house-door" style={{ fontSize: 30, color: "#d2691e" }}></i>
                            <h1 className="text-nowrap">&nbsp; Super Recipe </h1>
                        </a>

                        {/* Backend-Fehlermeldung */}
                        <p style={{ color: "red" }}>{msg}</p>

                        <h2>Login</h2>

                        {/* Login Formular */}
                        <form id="login-form">
                            <input
                                className="form-control underline-input"
                                type="text"
                                placeholder="E-mail Address"
                                aria-label="Registered E-mail Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                className="form-control underline-input"
                                type="password"
                                placeholder="Password"
                                aria-label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </form>

                        {/* Passwort vergessen Link */}
                        <h6 className="text-nowrap mt-1">Forget your password?</h6>

                        {/* Login Button */}
                        <button form="login-form" type="button" className="btn mt-5 login-button" onClick={handleLogin}>
                            LOGIN
                        </button>

                        {/* Register Button */}
                        <a role="button" href="/register" className="btn btn-outline-dark mt-2 mb-5">
                            REGISTER
                        </a>

                        {/* Alternative Login Methoden */}
                        <h5>Log in with</h5>
                        <button type="button" className="btn btn-outline-dark mt-1 text-nowrap">
                            <img src="/images/icons8-google-48.png" alt="google" width="18" height="18" />
                            &nbsp; LOG IN WITH GOOGLE
                        </button>
                        <button type="button" className="btn btn-outline-dark mt-2 text-nowrap">
                            <i className="bi bi-apple"></i>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LOG IN WITH APPLE
                        </button>
                    </div>
                </div>
            </div>

            {/* -----------------------
                Rechte Spalte: Dekoration / Bild
               ----------------------- */}
            <div className="col-6 right-pic">
                <img src="images/spices-klein.png" alt="spices" className="img-fluid" />
            </div>

            {/* -----------------------
                Modal für erfolgreiches Login
               ----------------------- */}
            <Modal
                show={showLoginAlert}
                onHide={() => setShowLoginAlert(false)}
                centered
                className="login-success-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>✅</span> {/* Erfolgssymbol */}
                        Logged In
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>You have successfully logged in!</Modal.Body>
                <Modal.Footer>
                    {/* OK Button rechts ausgerichtet */}
                    <Button
                        className="ms-auto"
                        onClick={() => {
                            setShowLoginAlert(false);
                            navigate("/"); // React Router Redirect
                        }}
                    >
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Login;
