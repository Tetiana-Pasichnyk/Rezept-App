import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MealPage.css";

export default function MealPage() {
    const { id } = useParams();
    const [meal, setMeal] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8888/rezept-plattform/backend/get-meal.php?id=${id}`)
            .then((res) => res.json())
            .then((data) => setMeal(data));
    }, [id]);

    if (!meal) return <div>Loading...</div>;

    return (
        <div className="meal-page">
            <div className="meal-left">
                <img src={meal.thumbnail} alt={meal.name} />
            </div>
            <div className="meal-right">
                <h1>{meal.name}</h1>
                <h2>Приготовление</h2>
                <p className="instructions">{meal.instructions}</p>
                <h2>Ингредиенты</h2>
                <ul className="ingredients">
                    {meal.ingredients.map((item, index) => (
                        <li key={index}>
                            {item.ingredient} — {item.measure}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
