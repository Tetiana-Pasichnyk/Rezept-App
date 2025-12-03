import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MealPage from "./pages/MealPages/MealPage";
import NavBar from "./components/Nav/NavBar";
import AddMeal from "./pages/AddMeal/AddMeal";
import "@fontsource/happy-monkey";

function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/meal/:id" element={<MealPage />} />
                <Route path="/add-meal" element={<AddMeal />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
