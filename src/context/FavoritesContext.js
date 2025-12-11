import { createContext, useState } from "react";

// ------------------------------
// FavoritesContext
// Kontext zur globalen Verwaltung der Favoritenliste
// Ermöglicht allen Komponenten Zugriff auf die Favoriten und Funktionen zur Manipulation
// ------------------------------
export const FavoritesContext = createContext();

// ------------------------------
// FavoritesProvider-Komponente
// Stellt Favoritenliste und Toggle-Funktion für alle Kinder-Komponenten bereit
// ------------------------------
export function FavoritesProvider({ children }) {
    // ------------------------------
    // State-Initialisierung
    // Versucht, gespeicherte Favoriten aus localStorage zu laden
    // Wenn keine Daten vorhanden → leeres Array
    // Lazy-Initialisierung mit Funktion für bessere Performance
    // ------------------------------
    const [favorites, setFavorites] = useState(() => {
        const stored = localStorage.getItem("favorites");
        return stored ? JSON.parse(stored) : [];
    });

    // ------------------------------
    // toggleFavorite
    // Fügt ein Meal der Favoritenliste hinzu oder entfernt es (Toggle)
    // Synchronisiert die Änderungen direkt mit localStorage
    // ------------------------------
    const toggleFavorite = (meal) => {
        setFavorites((prev) => {
            const isFavorite = prev.find((m) => String(m.id) === String(meal.id));
            const updated = isFavorite
                ? prev.filter((m) => String(m.id) !== String(meal.id)) // Entfernen, wenn schon Favorit
                : [...prev, meal]; // Hinzufügen, wenn noch nicht Favorit

            // Persistierung im localStorage für zukünftige Besuche
            localStorage.setItem("favorites", JSON.stringify(updated));
            return updated;
        });
    };

    // ------------------------------
    // Context-Provider
    // value enthält sowohl die aktuelle Favoritenliste als auch die Toggle-Funktion
    // ------------------------------
    return <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>{children}</FavoritesContext.Provider>;
}
