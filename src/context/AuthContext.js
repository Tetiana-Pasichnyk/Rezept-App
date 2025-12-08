import { createContext, useEffect, useState } from "react";

// ---------------------------
// AuthContext
// Kontext zur Verwaltung des Authentifizierungsstatus der Nutzer
// ---------------------------
export const AuthContext = createContext();

// ---------------------------
// AuthProvider-Komponente
// Stellt den Authentifizierungsstatus und Setter-Funktion allen Kind-Komponenten bereit
// ---------------------------
export function AuthProvider({ children }) {
    // State: Speichert, ob der Nutzer eingeloggt ist oder nicht
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // useEffect: Prüft beim initialen Laden, ob der Nutzer bereits eingeloggt ist
    useEffect(() => {
        fetch("http://localhost:8888/rezept-plattform/backend/check-login.php", {
            credentials: "include", // Sorgt dafür, dass Cookies (Session) mitgesendet werden
        })
            .then((res) => res.json()) // Antwort als JSON parsen
            .then((data) => setIsLoggedIn(data.loggedIn)) // Setzt den State basierend auf Backend-Antwort
            .catch((err) => {
                console.error("Fehler beim Überprüfen des Login-Status:", err);
                setIsLoggedIn(false); // Im Fehlerfall Logout erzwingen
            });
    }, []); // Leeres Dependency-Array → läuft nur einmal beim Mounten

    // Provider: Stellt den Authentifizierungsstatus und Setter allen Kindern bereit
    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
}
