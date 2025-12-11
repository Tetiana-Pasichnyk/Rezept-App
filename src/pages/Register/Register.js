import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { API_BASE_URL } from "../../config/Api";
import "./Register.css";
/**
 * Register-Komponente
 * --------------------------------------------------------------
 * Anzeige des Registrierungsformulars für Benutzer.
 *
 * Features:
 * - Eingabe von E-Mail, Passwort, Name und Telefonnummer
 * - Frontend-Validierung
 * - Registrierung via fetch an das Backend (PHP)
 * - Modal bei erfolgreicher Registrierung
 * - Buttons für Login und alternative Aktionen
 *
 * Accessibility:
 * - aria-labels für Input-Felder
 * - semantische Buttons und Links
 * --------------------------------------------------------------
 */
function Register() {
    // --------------------------------------------
    // State für Formularfelder
    // --------------------------------------------
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        password: "",
        password2: "",
    });
    const [message, setMessage] = useState(""); // Feedback-Messages
    const [showSuccessModal, setShowSuccessModal] = useState(false); // Modal State
    const navigate = useNavigate(); // Navigation Hook

    // --------------------------------------------
    // Allgemeine Handler-Funktion für Input-Änderungen
    // --------------------------------------------
    const handleChange = (e) => {
        const { name, value } = e.target;
        const sanitizedValue = name === "phone_number" ? value.replace(/\D/g, "") : value;
        setForm({ ...form, [name]: sanitizedValue });

        // Logging für nicht-sensible Felder

        // if (name !== "password" && name !== "password2") {
        //   console.log(`${name} changed:`, sanitizedValue);
        // }
    };

    // --------------------------------------------
    // Formular-Submit Handler
    // --------------------------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        // --- Frontend-Validierung ---
        if (!form.first_name || !form.last_name || !form.email || !form.password) {
            setMessage("Please fill in all required fields.");
            return;
        }

        if (form.password !== form.password2) {
            setMessage("Passwords do not match.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            setMessage("Please enter a valid email address.");
            return;
        }

        if (form.password.length < 6) {
            setMessage("Password must be at least 6 characters.");
            return;
        }

        // --- Backend Request ---
        try {
            const res = await fetch(`${API_BASE_URL}/registration.php`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            setMessage(data.message);

            if (data.status === "success") {
                // Formular zurücksetzen
                setForm({
                    first_name: "",
                    last_name: "",
                    phone_number: "",
                    email: "",
                    password: "",
                    password2: "",
                });

                // Modal für erfolgreiche Registrierung anzeigen
                setShowSuccessModal(true);
            }
        } catch (err) {
            console.error("API Error:", err);
            setMessage("Server error, please try again.");
        }
    };

    return (
        <div className="row">
            {/* -------------------------------
          Linke Seite: Registrierungsformular
      ------------------------------- */}
            <div className="col-6 p-0 left-wrapper">
                <div className="mx-5 my-4 content-box">
                    <div className="d-flex flex-column register-content">
                        {/* Logo + Home Link */}
                        <a href="/" className="d-flex flex-row text-decoration-none" style={{ color: "black" }}>
                            <i className="bi bi-house-door" style={{ fontSize: 30, color: "#d2691e" }}></i>
                            <h1 className="text-nowrap">&nbsp; Super Recipe </h1>
                        </a>

                        <h4>User Information</h4>

                        {/* -------------------------------
                Formularfelder
            ------------------------------- */}
                        <form id="register-form" onSubmit={handleSubmit}>
                            <input
                                className="form-control underline-input"
                                type="email"
                                placeholder="* E-Mail"
                                aria-label="E-Mail-Addresse"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                            />
                            <input
                                className="form-control underline-input"
                                type="password"
                                placeholder="* Password"
                                aria-label="Password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                            />
                            <input
                                className="form-control underline-input"
                                type="password"
                                placeholder="* Confirm Password"
                                aria-label="Confirm Password"
                                name="password2"
                                value={form.password2}
                                onChange={handleChange}
                            />
                            <input
                                className="form-control underline-input"
                                type="text"
                                placeholder="* FIRST NAME"
                                aria-label="FIRST NAME"
                                name="first_name"
                                value={form.first_name}
                                onChange={handleChange}
                            />
                            <input
                                className="form-control underline-input"
                                type="text"
                                placeholder="* LAST NAME"
                                aria-label="LAST NAME"
                                name="last_name"
                                value={form.last_name}
                                onChange={handleChange}
                            />
                        </form>

                        {/* -------------------------------
                Telefonnummer + Area Code
            ------------------------------- */}
                        <div className="d-flex flex-row gap-5 mt-0" id="last-input">
                            <div className="flex-grow-0" style={{ width: "100px" }}>
                                <label className="form-label">AREA CODE</label>
                                <input
                                    className="form-control underline-input"
                                    type="text"
                                    value="+49"
                                    readOnly
                                    aria-label="AREA CODE"
                                />
                            </div>
                            <div className="flex-grow-1">
                                <label className="form-label">* MOBILE NUMBER</label>
                                <input
                                    className="form-control underline-input"
                                    type="text"
                                    aria-label="MOBILE Number"
                                    name="phone_number"
                                    value={form.phone_number}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <p className="my-2">We will send you an SMS to verify your mobile number</p>

                        {/* -------------------------------
                Checkboxen für Marketing & Datenschutz
            ------------------------------- */}
                        <div className="check">
                            <label>
                                <input type="checkbox" />
                                <span>
                                    I would like to receive personalized commercial communications from SUPER RECIPE by
                                    email.
                                </span>
                            </label>
                        </div>
                        <div className="check">
                            <label>
                                <input type="checkbox" />
                                <span>I have read and understood the Privacy and Cookie Policy.</span>
                            </label>
                        </div>

                        {/* -------------------------------
                Buttons: Register / Login
            ------------------------------- */}
                        <button type="submit" form="register-form" className="btn mt-5 btn-outline-dark">
                            REGISTER
                        </button>
                        <a role="button" href="/login" className="btn mt-2 mb-5 login-button">
                            LOG IN
                        </a>
                    </div>
                </div>

                {/* -------------------------------
            Alert Message (Feedback)
        ------------------------------- */}
                {message && (
                    <div className="custom-alert" role="alert">
                        {message}
                        <button
                            type="button"
                            className="btn-close btn-close-white alert-close"
                            onClick={() => setMessage("")}
                        ></button>
                    </div>
                )}
            </div>

            {/* -------------------------------
          Rechte Seite: Bild
      ------------------------------- */}
            <div className="col-6 right-pic">
                <img src="images/cake-klein.png" alt="cake" className="img-fluid" />
            </div>

            {/* -------------------------------
          Modal für erfolgreiche Registrierung
      ------------------------------- */}
            <Modal
                show={showSuccessModal}
                onHide={() => setShowSuccessModal(false)}
                centered
                className="login-success-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>✅</span> Registration Successful
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>You have successfully registered!</Modal.Body>
                <Modal.Footer>
                    <Button
                        className="ms-auto"
                        onClick={() => {
                            setShowSuccessModal(false);
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

export default Register;
