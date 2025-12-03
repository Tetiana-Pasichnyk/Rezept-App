import { useEffect, useState } from "react";
import MealCard from "../components/MealCard/MealCard";
import Pagination from "../components/Pagination/Pagination";
import CategoryButton from "../components/CategoryButton/CategoryButton";
import Banner from "../components/Banner/Banner";

function Home() {
    const [meals, setMeals] = useState([]);
    const [categories, setCategories] = useState([]);
    const [favorites, setFavorites] = useState([]);
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
            .catch((err) => console.error("Ошибка загрузки блюд и категорий:", err));
    }, [selectedCategory]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMeals = meals.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(meals.length / itemsPerPage);

    const toggleFavorite = (mealId) => {
        setFavorites((prev) => (prev.includes(mealId) ? prev.filter((id) => id !== mealId) : [...prev, mealId]));
    };

    return (
        <div>
            <CategoryButton
                categories={categories}
                activeCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
            />

            <div className="container mt-4">
                <Banner />
                <div className="row g-4">
                    {currentMeals.map((meal) => (
                        <div key={meal.id} className="col-12 col-sm-6 col-md-4 d-flex justify-content-center">
                            <MealCard
                                meal={meal}
                                isFavorite={favorites.includes(meal.id)}
                                toggleFavorite={toggleFavorite}
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
