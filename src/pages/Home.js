import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import MealCard from "../components/MealCard/MealCard";
import Pagination from "../components/Pagination/Pagination";
import CategoryButton from "../components/CategoryButton/CategoryButton";
import Banner from "../components/Banner/Banner";
// import { FavoriteContext } from "../context/FavoriteContext";
/**
 * @component Home
 * Hauptseite der App. Verantwortlich für:
 * - Anzeige von Mahlzeiten
 * - Kategorie-Filter
 * - Suche
 * - Favoritenverwaltung
 * - Pagination
 */
function Home() {
  // -------------------------
  // Kontext & States
  // -------------------------
  const { searchTerm, setSearchTerm } = useContext(SearchContext); // Suchbegriff aus globalem Kontext
  const [meals, setMeals] = useState([]); // Alle geladenen Mahlzeiten
  const [categories, setCategories] = useState([]); // Kategorien vom Backend
  const [favorites, setFavorites] = useState([]); // Favoritenliste

  const [currentPage, setCurrentPage] = useState(1); // Aktuelle Pagination-Seite
  const [selectedCategory, setSelectedCategory] = useState(null); // Ausgewählte Kategorie
  const itemsPerPage = 9; // Anzahl der Items pro Seite

  // -------------------------
  // Mahlzeiten und Kategorien vom Backend laden
  // -------------------------
  useEffect(() => {
    const url = selectedCategory
      ? `http://localhost/rezept/get-meals.php?category=${selectedCategory}`
      : "http://localhost/rezept/get-meals.php";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories); // Kategorien aktualisieren
        setMeals(data.meals); // Mahlzeiten aktualisieren
        setCurrentPage(1); // Pagination zurücksetzen
      })
      .catch((err) =>
        console.error("Error loading meals and categories:", err)
      );
  }, [selectedCategory]);

  // -------------------------
  // Suche filtern
  // -------------------------
  const filteredMeals = meals.filter((meal) =>
    meal.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // -------------------------
  // Kategorie auswählen und Suchfeld zurücksetzen
  // -------------------------
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSearchTerm(""); // Reset search term
  };

  // -------------------------
  // Pagination Berechnungen
  // -------------------------
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMeals = filteredMeals.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMeals.length / itemsPerPage);

  // -------------------------
  // Favoritenverwaltung
  // -------------------------
  const toggleFavorite = (mealId) => {
    setFavorites((prev) =>
      prev.includes(mealId)
        ? prev.filter((id) => id !== mealId)
        : [...prev, mealId]
    );
  };

  return (
    <div>
      {/* Kategorie-Auswahl */}
      <CategoryButton
        categories={categories}
        activeCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />

      <div className="container mt-4">
        {/* Banner-Komponente */}
        <Banner />

        {/* Mahlzeitenkarten */}
        <div className="row g-4">
          {currentMeals.map((meal) => (
            <div
              key={meal.id}
              className="col-12 col-sm-6 col-md-4 d-flex justify-content-center"
            >
              <MealCard
                meal={meal}
                isFavorite={favorites.includes(meal.id)}
                toggleFavorite={toggleFavorite}
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
