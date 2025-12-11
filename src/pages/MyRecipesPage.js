import { useContext, useEffect, useState } from "react";

import { SearchContext } from "../context/SearchContext";
import MealCard from "../components/MealCard/MealCard";
import Pagination from "../components/Pagination/Pagination";
import Banner from "../components/Banner/Banner";

// ------------------------------
// MyRecipesPage-Komponente
// Zeigt die vom Benutzer hinzugefügten Rezepte
// Inklusive Suche und Pagination
// ------------------------------
function MyRecipesPage() {
    // ------------------------------
    // Zugriff auf globalen SearchContext
    // ------------------------------
    const { searchTerm } = useContext(SearchContext);

    // ------------------------------
    // Lokaler State
    // ------------------------------
    const [myRecipes, setMyRecipes] = useState([]); // Alle eigenen Rezepte des Nutzers
    const [currentPage, setCurrentPage] = useState(1); // Pagination-Page
    const itemsPerPage = 9; // Anzahl der Rezepte pro Seite

    // ------------------------------
    // Laden der eigenen Rezepte vom Backend
    // ------------------------------
    useEffect(() => {
        fetch("http://localhost:8888/rezept-plattform/backend/get-my-recipes.php", {
            credentials: "include", // Sitzung des Benutzers erhalten
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === "success") {
                    setMyRecipes(data.meals || []); // Rezepte setzen, wie vom PHP-Backend zurückgegeben
                } else {
                    console.error("Fehler beim Laden der Rezepte:", data.message);
                    setMyRecipes([]);
                }
            })
            .catch((err) => {
                console.error("Fehler beim Abrufen der eigenen Rezepte:", err);
                setMyRecipes([]);
            });
    }, []);

    // ------------------------------
    // Filtern der Rezepte basierend auf Suchbegriff
    // Groß-/Kleinschreibung wird ignoriert
    // ------------------------------
    const filteredRecipes = myRecipes.filter((meal) =>
        meal.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // ------------------------------
    // Pagination-Logik
    // Berechnung von Start- und Endindex für die aktuelle Seite
    // ------------------------------
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentRecipes = filteredRecipes.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);

    // ------------------------------
    // JSX / Render
    // Banner, MealCards und Pagination
    // ------------------------------
    return (
        <div className="container mt-4">
            {/* Banner-Komponente */}
            <Banner lines={["Your", "personal", "recipes"]} />

            <div className="row g-4 mt-4">
                {/* Hinweis, falls keine Rezepte vorhanden sind */}
                {currentRecipes.length === 0 && (
                    <p style={{ textAlign: "center", color: "#b65a18", fontSize: "1.2rem", marginTop: "2rem" }}>
                        You have not added any recipes yet!
                    </p>
                )}

                {/* Anzeige der aktuellen Seite mit MealCards */}
                {currentRecipes.map((meal) => (
                    <div key={meal.id} className="col-12 col-sm-6 col-md-4 d-flex justify-content-center">
                        <MealCard
                            meal={{
                                ...meal,
                                thumbnail:
                                    "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Platzhalterbild
                            }}
                            showFavorite={false} // Eigene Rezepte haben keine Favoritenfunktion
                        />
                    </div>
                ))}
            </div>

            {/* Pagination nur anzeigen, wenn Rezepte vorhanden */}
            {currentRecipes.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPrev={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    onNext={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                />
            )}
        </div>
    );
}

export default MyRecipesPage;
