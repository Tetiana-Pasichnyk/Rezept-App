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

function App() {
  const location = useLocation();
  const hideNav =
    location.pathname.toLowerCase() === "/login" ||
    location.pathname.toLowerCase() === "/register";

  return (
    <AuthProvider>
      <SearchProvider>
        {/* ------move <BrowserRouter>  add <></> */}
        {!hideNav && <NavBar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meal/:id" element={<MealPage />} />
          <Route path="/add-meal" element={<AddMeal />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/data-protection" element={<Datenshutz />} />
        </Routes>
        {!hideNav && <Footer />}
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;
