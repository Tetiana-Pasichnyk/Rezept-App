import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import { FavoritesContext } from "../context/FavoritesContext"; // <-- импортируем
import MealCard from "../components/MealCard/MealCard";
import Pagination from "../components/Pagination/Pagination";
import CategoryButton from "../components/CategoryButton/CategoryButton";
import Banner from "../components/Banner/Banner";

function Home() {
    const { searchTerm, setSearchTerm } = useContext(SearchContext);
    const { favorites, toggleFavorite } = useContext(FavoritesContext); // <-- используем глобальные фавориты

    const [meals, setMeals] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const itemsPerPage = 9;

    useEffect(() => {
        const url = selectedCategory
            ? `http://localhost:8888/rezept-plattform/backend/get-meals.php?category=${selectedCategory}`
            : "http://localhost:8888/rezept-plattform/backend/get-meals.php";

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setCategories(data.categories);
                setMeals(data.meals);
                setCurrentPage(1);
            })
            .catch((err) => console.error("Error loading meals and categories:", err));
    }, [selectedCategory]);

    const filteredMeals = meals.filter((meal) => meal.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setSearchTerm("");
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMeals = filteredMeals.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredMeals.length / itemsPerPage);

    return (
        <div>
            <CategoryButton
                categories={categories}
                activeCategory={selectedCategory}
                onCategorySelect={handleCategorySelect}
            />

            <div className="container mt-4">
                <Banner />

                <div className="row g-4">
                    {currentMeals.map((meal) => (
                        <div key={meal.id} className="col-12 col-sm-6 col-md-4 d-flex justify-content-center">
                            <MealCard
                                meal={meal}
                                isFavorite={favorites.some((m) => m.id === meal.id)} // проверка по контексту
                                toggleFavorite={() => toggleFavorite(meal)} // передаем весь meal
                            />
                        </div>
                    ))}
                </div>

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
