import React from "react";
import "@fontsource/happy-monkey";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import MealPage from "./pages/MealPages/MealPage";
import NavBar from "./components/Nav/NavBar";
import AddMeal from "./pages/AddMeal/AddMeal";
import { SearchProvider } from "./context/SearchContext";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Footer from "./components/Footer/Footer";
import Impressum from "./components/Footer/Impressum";
import Datenshutz from "./components/Footer/Datenshutz";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import FavoritesPage from "./pages/FavoritesPage";
import MyRecipesPage from "./pages/MyRecipesPage";

// ------------------------------
// Haupt-App-Komponente
// Enthält globale Provider, Routing und Layout-Komponenten (NavBar/Footer)
// ------------------------------
function App() {
    // ------------------------------
    // useLocation-Hook
    // Bestimmt aktuellen Pfad, um NavBar/Footer auf bestimmten Seiten auszublenden
    // ------------------------------
    const location = useLocation();
    const hideNav = location.pathname.toLowerCase() === "/login" || location.pathname.toLowerCase() === "/register";

    return (
        // ------------------------------
        // Globale Context-Provider
        // AuthProvider: Authentifizierung & Login-State
        // SearchProvider: Suchbegriff global
        // FavoritesProvider: Favoritenliste global
        // ------------------------------
        <AuthProvider>
            <SearchProvider>
                <FavoritesProvider>
                    {/* Navigation nur anzeigen, wenn nicht auf Login/Register-Seite */}
                    {!hideNav && <NavBar />}

                    {/* ------------------------------
                        Routing der Seiten
                        ------------------------------ */}
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

                    {/* Footer nur anzeigen, wenn nicht auf Login/Register-Seite */}
                    {!hideNav && <Footer />}
                </FavoritesProvider>
            </SearchProvider>
        </AuthProvider>
    );
}

export default App;
