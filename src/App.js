import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MealPage from "./pages/MealPages/MealPage";
import Nav from "./components/Nav/Nav";
// <-- импортируем Navbar
import "@fontsource/happy-monkey";

function App() {
    return (
        <BrowserRouter>
            <Nav /> {/* <-- добавляем Navbar здесь, вне Routes */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/meal/:id" element={<MealPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
