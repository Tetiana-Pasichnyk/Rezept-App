import { useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import MealCard from "../components/MealCard/MealCard";
import Pagination from "../components/Pagination/Pagination";


function Home() {
    const [meals, setMeals] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    useEffect(() => {
        fetch("http://localhost:8888/rezept-plattform/backend/get-meals.php")
            .then((res) => res.json())
            .then((data) => setMeals(data))
            .catch((err) => console.error(err));
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMeals = meals.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(meals.length / itemsPerPage);

    const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
    const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

    const toggleFavorite = (mealId) => {
        setFavorites((prev) => (prev.includes(mealId) ? prev.filter((id) => id !== mealId) : [...prev, mealId]));
    };

    return (
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
            <Pagination currentPage={currentPage} totalPages={totalPages} onPrev={handlePrev} onNext={handleNext} />
        </div>
    );
}

export default Home;
