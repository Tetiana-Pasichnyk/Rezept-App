import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import MealCard from "../components/MealCard/MealCard";
import Pagination from "../components/Pagination/Pagination";
import Banner from "../components/Banner/Banner";

function MyRecipesPage() {
    const { searchTerm } = useContext(SearchContext);
    const [myRecipes, setMyRecipes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    // ------------------------------
    // Fetch user's recipes from backend
    // ------------------------------
    useEffect(() => {
        fetch("http://localhost:8888/rezept-plattform/backend/get-my-recipes.php", {
            credentials: "include", // чтобы получить сессию пользователя
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === "success") {
                    setMyRecipes(data.meals || []); // <-- обращаемся к meals, как возвращает PHP
                } else {
                    console.error("Error fetching meals:", data.message);
                    setMyRecipes([]);
                }
            })
            .catch((err) => {
                console.error("Failed to fetch user's recipes:", err);
                setMyRecipes([]);
            });
    }, []);

    // ------------------------------
    // Filter recipes by search term
    // ------------------------------
    const filteredRecipes = myRecipes.filter((meal) => meal.name?.toLowerCase().includes(searchTerm.toLowerCase()));

    // ------------------------------
    // Pagination logic
    // ------------------------------
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentRecipes = filteredRecipes.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);

    return (
        <div className="container mt-4">
            <Banner lines={["Your", "personal", "recipes"]} />

            <div className="row g-4 mt-4">
                {currentRecipes.length === 0 && <p>You haven't added any recipes yet!</p>}

                {currentRecipes.map((meal) => (
                    <div key={meal.id} className="col-12 col-sm-6 col-md-4 d-flex justify-content-center">
                        <MealCard
                            meal={{
                                ...meal,
                                thumbnail:
                                    "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                            }}
                            showFavorite={false}
                        />
                    </div>
                ))}
            </div>

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
