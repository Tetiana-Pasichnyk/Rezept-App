import { useContext, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import { FavoritesContext } from "../context/FavoritesContext";
import MealCard from "../components/MealCard/MealCard";
import Pagination from "../components/Pagination/Pagination";
import Banner from "../components/Banner/Banner";

// ------------------------------
// FavoritesPage-Komponente
// Zeigt alle Favoriten des Nutzers mit Such- und Pagination-Funktionalität
// ------------------------------
function FavoritesPage() {
    // ------------------------------
    // Zugriff auf globale Contexts
    // SearchContext: enthält den aktuellen Suchbegriff
    // FavoritesContext: enthält Favoritenliste und Toggle-Funktion
    // ------------------------------
    const { searchTerm } = useContext(SearchContext);
    const { favorites, toggleFavorite } = useContext(FavoritesContext);

    // ------------------------------
    // Lokaler State für Pagination
    // ------------------------------
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9; // Anzahl der Elemente pro Seite

    // ------------------------------
    // Filtern der Favoriten basierend auf dem Suchbegriff
    // Groß-/Kleinschreibung wird ignoriert
    // ------------------------------
    const filteredMeals = favorites.filter(
        (meal) => meal.name?.toLowerCase().includes(searchTerm.toLowerCase()) // ?. für sichere Prüfung
    );

    // ------------------------------
    // Pagination-Logik
    // Berechnung der Start- und Endindizes für die aktuelle Seite
    // ------------------------------
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMeals = filteredMeals.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredMeals.length / itemsPerPage);

    // ------------------------------
    // JSX / Render
    // Banner, MealCards, Pagination
    // ------------------------------
    return (
        <div>
            <div className="container mt-4">
                {/* Banner-Komponente */}
                <Banner lines={["Your", "favorite", "recipes"]} />

                <div className="row g-4 mt-4">
                    {/* Hinweis, falls keine Favoriten vorhanden sind */}
                    {currentMeals.length === 0 && (
                        <p style={{ textAlign: "center", color: "#b65a18", fontSize: "1.2rem", marginTop: "2rem" }}>
                            No favorite meals yet!
                        </p>
                    )}

                    {/* Anzeige der aktuellen Seite mit MealCards */}
                    {currentMeals.map((meal) => (
                        <div key={meal.id} className="col-12 col-sm-6 col-md-4 d-flex justify-content-center">
                            <MealCard
                                meal={meal}
                                isFavorite={true} // Favoritenstatus ist immer true
                                toggleFavorite={toggleFavorite} // Favoriten-Toggle-Funktion
                            />
                        </div>
                    ))}
                </div>

                {/* Pagination nur anzeigen, wenn Elemente vorhanden */}
                {currentMeals.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPrev={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        onNext={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    />
                )}
            </div>
        </div>
    );
}

export default FavoritesPage;
