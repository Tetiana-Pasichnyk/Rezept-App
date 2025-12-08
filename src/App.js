import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import MealPage from "./pages/MealPages/MealPage";
import NavBar from "./components/Nav/NavBar";
import AddMeal from "./pages/AddMeal/AddMeal";
import { SearchProvider } from "./context/SearchContext";
import "@fontsource/happy-monkey";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Footer from "./components/Footer/Footer";
import Impressum from "./components/Footer/Impressum";
import Datenshutz from "./components/Footer/Datenshutz";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import FavoritesPage from "./pages/FavoritesPage";
import MyRecipesPage from "./pages/MyRecipesPage";

function App() {
    const location = useLocation();
    const hideNav = location.pathname.toLowerCase() === "/login" || location.pathname.toLowerCase() === "/register";

    return (
        <AuthProvider>
            <SearchProvider>
                <FavoritesProvider>
                    {!hideNav && <NavBar />}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/meal/:id" element={<MealPage />} />
                        <Route path="/add-meal" element={<AddMeal />} />
                        <Route path="/favorites" element={<FavoritesPage />} /> 
                        <Route path="/my-recipes" element={<MyRecipesPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/impressum" element={<Impressum />} />
                        <Route path="/data-protection" element={<Datenshutz />} />
                    </Routes>
                    {!hideNav && <Footer />}
                </FavoritesProvider>
            </SearchProvider>
        </AuthProvider>
    );
}

export default App;
