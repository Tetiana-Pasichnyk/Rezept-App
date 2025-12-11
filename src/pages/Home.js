import { useContext, useEffect, useState } from "react";

import { SearchContext } from "../context/SearchContext";
import { FavoritesContext } from "../context/FavoritesContext";
import { API_BASE_URL } from "../config/Api"; 

import MealCard from "../components/MealCard/MealCard";
import Pagination from "../components/Pagination/Pagination";
import CategoryButton from "../components/CategoryButton/CategoryButton";
import Banner from "../components/Banner/Banner";

// ------------------------------
// Home-Komponente
// Anzeige der Startseite mit Banner, Kategorien, Mahlzeiten und Pagination
// ------------------------------
function Home() {
    // ------------------------------
    // Contexts
    // ------------------------------
    const { searchTerm, setSearchTerm } = useContext(SearchContext); // Suchbegriff global
    const { favorites, toggleFavorite } = useContext(FavoritesContext); // Favoriten global

    // ------------------------------
    // States
    // ------------------------------
    const [meals, setMeals] = useState([]); // Alle geladenen Mahlzeiten
    const [categories, setCategories] = useState([]); // Alle Kategorien
    const [currentPage, setCurrentPage] = useState(1); // Aktuelle Seite für Pagination
    const [selectedCategory, setSelectedCategory] = useState(null); // Ausgewählte Kategorie
    const itemsPerPage = 9; // Anzahl der Items pro Seite

    // ------------------------------
    // Laden von Mahlzeiten und Kategorien vom Backend
    // Abhängig von der ausgewählten Kategorie
    // ------------------------------
    useEffect(() => {
        const url = selectedCategory
            ? `${API_BASE_URL}/get-meals.php?category=${selectedCategory}`
            : `${API_BASE_URL}/get-meals.php`;

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setCategories(data.categories); // Kategorien setzen
                setMeals(data.meals); // Mahlzeiten setzen
                setCurrentPage(1); // Zurücksetzen der Pagination
            })
            .catch((err) => console.error("Fehler beim Laden der Mahlzeiten/Kategorien:", err));
    }, [selectedCategory]);

    // ------------------------------
    // Filtern der Mahlzeiten basierend auf dem Suchbegriff
    // ------------------------------
    const filteredMeals = meals.filter((meal) => meal.name.toLowerCase().includes(searchTerm.toLowerCase()));

    // ------------------------------
    // Kategorieauswahl
    // Setzt die ausgewählte Kategorie und leert den Suchbegriff
    // ------------------------------
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setSearchTerm("");
    };

    // ------------------------------
    // Pagination-Logik
    // ------------------------------
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMeals = filteredMeals.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredMeals.length / itemsPerPage);

    // ------------------------------
    // JSX / Render
    // ------------------------------
    return (
        <div>
            <div className="container mt-4">
                {/* Banner-Komponente */}
                <Banner lines={["Your", "digital", "Сookbook"]} />

                {/* Kategorie-Auswahl */}
                <CategoryButton
                    categories={categories}
                    activeCategory={selectedCategory}
                    onCategorySelect={handleCategorySelect}
                />

                {/* Mahlzeitenliste */}
                <div className="row g-4">
                    {currentMeals.map((meal) => (
                        <div key={meal.id} className="col-12 col-sm-6 col-md-4 d-flex justify-content-center">
                            <MealCard
                                meal={meal}
                                isFavorite={favorites.some((m) => m.id === meal.id)} // Prüfen, ob Mahlzeit Favorit ist
                                toggleFavorite={() => toggleFavorite(meal)} // Favoriten-Toggle-Funktion
                            />
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPrev={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    onNext={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                />
            </div>
        </div>
    );
}

export default Home;
