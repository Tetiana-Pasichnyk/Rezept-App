import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../Register/Register.css";
import { useState } from "react";

function Register() {
    // --------------- Alona`s code
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        password: "",
        password2: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        //  phone number
        const sanitizedValue = name === "phone_number" ? value.replace(/\D/g, "") : value;

        setForm({ ...form, [name]: sanitizedValue });

        // Log only non-sensitive fields
        if (name !== "password" && name !== "password2") {
            console.log(`${name} changed:`, sanitizedValue);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Frontend validation
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

        try {
            const res = await fetch("http://localhost:8888/rezept-plattform/backend/registration.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            setMessage(data.message);

            if (data.status === "success") {
                setForm({
                    first_name: "",
                    last_name: "",
                    phone_number: "",
                    email: "",
                    password: "",
                    password2: "",
                });
                // Redirect to home after successful registration
                setTimeout(() => {
                    window.location.href = "/";
                }, 2000);
            }
        } catch (err) {
            console.error("API Error:", err);
            setMessage("Server error, please try again.");
        }
    };

    // -------------

    return (
        <div className="row">
            <div className="col-6 p-0 left-wrapper">
                <div className="mx-5 my-4 content-box">
                    <div className="d-flex flex-column register-content">
                        <a href="/" className="d-flex flex-row text-decoration-none" style={{ color: "black" }}>
                            <i className="bi bi-house-door" style={{ fontSize: 30, color: "#d2691e" }}></i>
                            <h1 className="text-nowrap">&nbsp; Super Recipe </h1>
                        </a>
                        <h4>User Information</h4>
                        <form id="register-form" onSubmit={handleSubmit}>
                            <input
                                className="form-control underline-input"
                                type="email"
                                placeholder="* E-Mail"
                                aria-label="E-Mail-Addresse"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                            ></input>
                            <input
                                className="form-control underline-input"
                                type="password"
                                placeholder="* Password"
                                aria-label="Password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                            ></input>
                            <input
                                className="form-control underline-input"
                                type="password"
                                placeholder="* Confirm Password"
                                aria-label="Confirm Password"
                                name="password2"
                                value={form.password2}
                                onChange={handleChange}
                            ></input>
                            <input
                                className="form-control underline-input"
                                type="text"
                                placeholder="* FIRST NAME"
                                aria-label="FIRST NAME"
                                name="first_name"
                                value={form.first_name}
                                onChange={handleChange}
                            ></input>
                            <input
                                className="form-control underline-input"
                                type="text"
                                placeholder="* LAST NAME"
                                aria-label="LAST NAME"
                                name="last_name"
                                value={form.last_name}
                                onChange={handleChange}
                            ></input>
                        </form>
                        <div className="d-flex flex-row gap-5 mt-0" id="last-input">
                            <div className="flex-grow-0" style={{ width: "100px" }}>
                                <label className="form-label">AREA CODE</label>
                                <input
                                    className="form-control underline-input"
                                    type="text"
                                    value="+49"
                                    readOnly
                                    aria-label="AREA CODE"
                                ></input>
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
                                ></input>
                            </div>
                        </div>
                        <p className="my-2">We will send you an SMS to verify your mobile number</p>
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
                        <button type="submit" form="register-form" className="btn mt-5 btn-outline-dark ">
                            REGISTER
                        </button>
                        <a role="button" href="/login" className="btn  mt-2 mb-5 login-button ">
                            LOG IN
                        </a>
                    </div>
                </div>
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

            {/* Right part of the page */}
            <div className="col-6 right-pic ">
                <img src="images/cake-klein.png" alt="spices" className="img-fluid" />
            </div>
        </div>
    );
}

export default Register;
