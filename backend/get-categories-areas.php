<?php
// === CORS HEADERS ===
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");

// ------------------------------
// INCLUDE DATABASE CONNECTION
// ------------------------------
require_once "db.php";

try {
    // ------------------------------
    // FETCH CATEGORIES LIST
    // ------------------------------
    $stmtCat = $pdo->query("SELECT id, name FROM categories ORDER BY name");
    $categories = $stmtCat->fetchAll();

    // ------------------------------
    // FETCH AREAS LIST
    // ------------------------------
    $stmtArea = $pdo->query("SELECT id, name FROM areas ORDER BY name");
    $areas = $stmtArea->fetchAll();

    // ------------------------------
    // SUCCESS RESPONSE
    // ------------------------------
    echo json_encode([
        "categories" => $categories,
        "areas"      => $areas
    ]);
} catch (Exception $e) {
    // ------------------------------
    // ERROR RESPONSE
    // ------------------------------
    echo json_encode([
        "status"  => "error",
        "message" => $e->getMessage()
    ]);
}
