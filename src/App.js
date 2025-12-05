import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import MealPage from "./pages/MealPages/MealPage";
import Nav from "./components/Nav/Nav";
// <-- импортируем Navbar
import "@fontsource/happy-monkey";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Footer from "./components/Footer/Footer";
import Impressum from "./components/Footer/Impressum";
import Datenshutz from "./components/Footer/Datenshutz";

function App() {
  // -------------------------
  const location = useLocation();
  const hideNav =
    location.pathname.toLowerCase() === "/login" ||
    location.pathname.toLowerCase() === "/register";

  // ---------------------------

  return (
    <>
      {/* ------move <BrowserRouter>  add <></> */}
      {!hideNav && <Nav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meal/:id" element={<MealPage />} />
        {/* new add------------------------ */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/data-protection" element={<Datenshutz />} />

        {/* -------------------------------*/}
      </Routes>
      {!hideNav && <Footer />}
    </>
  );
}

export default App;
