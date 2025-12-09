# 📚 Super Recipe

Autoren:
Tetiana, Mangjun, Alona
Datum: 09.12.2025

Ein einfaches Rezept-Verwaltungsprojekt.
Ermöglicht das Erstellen, Anzeigen und Löschen von Rezepten direkt im Browser.

## 🚀 Projektübersicht

📝 Neues Rezept hinzufügen (inkl. Zutaten & Kategorie)
👀 Rezeptdetails anzeigen
🗑️ Eigene Rezepte löschen
💾 Benutzerregistrierung & Login
🔄 Öffentliche Rezepte durchsuchen

## 🛠️ Technologien

PHP 8 | MySQL | PDO | Sessions | JavaScript | Bootstrap 5

## 📦 Installation & Start

git clone
cd super-recipe

Backend starten
php -S localhost:8888

Frontend starten
cd frontend
npm install
npm start

## 🧩 Projektstruktur

PROJECT
│
├── BACKEND
│ ├── add-meal.php
│ ├── check-login.php
│ ├── db.php
│ ├── get-categories-areas.php
│ ├── get-meal.php
│ ├── get-meals.php
│ ├── get-my-recipes.php
│ ├── login.php
│ ├── logout.php
│ └── registration.php
│
├── FRONTEND
│ ├── public/
│ │ └── Image/
│ │
│ ├── src/
│ │
│ ├── components/
│ │ ├── Banner/
│ │ │ ├── Banner.js
│ │ │ └── Banner.css
│ │ ├── CategoryButton/
│ │ │ ├── CategoryButton.js
│ │ │ └── CategoryButton.css
│ │ ├── Footer/
│ │ │ ├── Footer.js
│ │ │ └── Footer.css
│ │ ├── MealCard/
│ │ │ ├── MealCard.js
│ │ │ └── MealCard.css
│ │ ├── Nav/
│ │ │ ├── Nav.js
│ │ │ └── Nav.css
│ │ ├── Pagination/
│ │ │ ├── Pagination.js
│ │ │ └── Pagination.css
│ │ └── TextPage/
│ │ ├── TextPage.js
│ │ └── TextPage.css
│ │
│ ├── config/
│ │ ├── Api.js
│ │ └── TextPagesConfig.js
│ │
│ ├── context/
│ │ ├── AuthContext.js
│ │ ├── FavoritesContext.js
│ │ └── SearchContext.js
│ │
│ └── pages/
│ ├── AddMeal/
│ │ ├── AddMeal.js
│ │ └── AddMeal.css
│ ├── Login/
│ │ ├── Login.js
│ │ └── Login.css
│ ├── MealPages/
│ │ ├── MealPages.js
│ │ └── MealPages.css
│ ├── Register/
│ │ ├── Register.js
│ │ └── Register.css
│ ├── Datenschutz/
│ │ ├── Datenschutz.js
│ │ └── Datenschutz.css
│ ├── FavoritesPage/
│ │ ├── FavoritesPage.js
│ │ └── FavoritesPage.css
│ ├── Home/
│ │ ├── Home.js
│ │ └── Home.css
│ ├── Impressum/
│ │ ├── Impressum.js
│ │ └── Impressum.css
│ └── MyRecipesPage/
│ ├── MyRecipesPage.js
│ └── MyRecipesPage.css
│
├── App.js
├── index.js
├── index.css
├── reportWebVitals.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md

## ⚡ Hauptfunktionen

addMeal()
Neues Rezept hinzufügen
getMeals()
Öffentliche Rezepte laden
getUserMeals()
Eigene Rezepte laden
getMealDetail()
Details eines Rezepts anzeigen
deleteMeal()
Eigenes Rezept löschen
registerUser()
Benutzer registrieren
loginUser()
Benutzer einloggen
logoutUser()
Benutzer ausloggen
Bootstrap 5
Styling & responsive Layout
