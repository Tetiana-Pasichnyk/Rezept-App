import { createContext, useState, useEffect } from "react";

// ------------------------------
// Erstellung des Contexts für Favoriten
// Ermöglicht globalen Zugriff auf die Favoritenliste in der gesamten App
// ------------------------------
export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    // ------------------------------
    // State-Initialisierung
    // Der Zustand wird aus localStorage geladen, falls vorhanden
    // ------------------------------
    const [favorites, setFavorites] = useState(() => {
        const stored = localStorage.getItem("favorites");
        return stored ? JSON.parse(stored) : [];
    });

    // ------------------------------
    // Funktion zum Hinzufügen/Entfernen eines Meals in den Favoriten
    // Toggle-Logik: Wenn Meal bereits vorhanden → entfernen, sonst → hinzufügen
    // Aktualisierung erfolgt sowohl im State als auch in localStorage
    // ------------------------------
    const toggleFavorite = (meal) => {
        setFavorites((prev) => {
            const isFavorite = prev.find((m) => String(m.id) === String(meal.id));
            const updated = isFavorite ? prev.filter((m) => String(m.id) !== String(meal.id)) : [...prev, meal];

            // Synchronisierung mit localStorage
            localStorage.setItem("favorites", JSON.stringify(updated));
            return updated;
        });
    };

    // ------------------------------
    // Bereitstellung des Context-Werts für die gesamte Komponentenhierarchie
    // value enthält sowohl die Favoritenliste als auch die Toggle-Funktion
    // ------------------------------
    return <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>{children}</FavoritesContext.Provider>;
}