<?php
// === CORS- und JSON-Header ===
// Erlaubt Cross-Origin Requests von der lokalen Entwicklungsumgebung
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Behandelt Preflight OPTIONS-Anfragen für CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// -------------------------
// SESSION + DATENBANKVERBINDUNG
// -------------------------
// Startet die Session, um eingeloggte Benutzer zu identifizieren
session_start();

// Bindet die PDO-Datenbankverbindung ein
require "db.php";

// -------------------------
// LOGIN-STATUS PRÜFEN
// -------------------------
// Prüft, ob der Benutzer eingeloggt ist
if (!isset($_SESSION['user_id'])) {
    echo json_encode([
        "status" => "error",
        "message" => "Benutzer ist nicht eingeloggt."
    ]);
    exit;
}

$userId = $_SESSION['user_id'];

// -------------------------
// FORMULARDATEN AUSLESEN
// -------------------------
$name         = $_POST['name'] ?? '';
$instructions = $_POST['instructions'] ?? '';
$categoryId   = $_POST['category_id'] ?? null;
$areaId       = $_POST['area_id'] ?? null;

// Zutaten werden als JSON übermittelt und in ein Array dekodiert
$ingredients  = isset($_POST['ingredients']) ? json_decode($_POST['ingredients'], true) : [];

// -------------------------
// VALIDIERUNG DER EINGABEN
// -------------------------
$errors = [];
if (trim($name) === '') $errors[] = "Name ist erforderlich";
if (trim($instructions) === '') $errors[] = "Anleitung ist erforderlich";

if (!empty($errors)) {
    echo json_encode(["status" => "error", "message" => $errors]);
    exit;
}

// -------------------------
// FIXES THUMBNAIL-URL
// -------------------------
// Standardbild für das Gericht
$thumbnailPath = "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

// -------------------------
// MAHLZEIT IN DATENBANK EINFÜGEN
// -------------------------
try {
    $stmt = $pdo->prepare("
        INSERT INTO meals (name, instructions, thumbnail, category_id, area_id, user_id)
        VALUES (:name, :instructions, :thumbnail, :category_id, :area_id, :user_id)
    ");

    $stmt->execute([
        "name"         => $name,
        "instructions" => $instructions,
        "thumbnail"    => $thumbnailPath,
        "category_id"  => $categoryId,
        "area_id"      => $areaId,
        "user_id"      => $userId
    ]);

    $mealId = $pdo->lastInsertId();

    // -------------------------
    // ZUTATEN HINZUFÜGEN
    // -------------------------
    foreach ($ingredients as $item) {
        $ingredientName = trim($item['ingredient'] ?? '');
        $measure        = trim($item['measure'] ?? '');
        if ($ingredientName === '') continue;

        // Prüft, ob die Zutat bereits existiert, ansonsten neue Zutat anlegen
        $stmtIng = $pdo->prepare("SELECT id FROM ingredients WHERE name = :name");
        $stmtIng->execute(["name" => $ingredientName]);
        $ingredientId = $stmtIng->fetchColumn();

        if (!$ingredientId) {
            $stmtNewIng = $pdo->prepare("INSERT INTO ingredients (name) VALUES (:name)");
            $stmtNewIng->execute(["name" => $ingredientName]);
            $ingredientId = $pdo->lastInsertId();
        }

        // Verknüpft die Zutat mit der Mahlzeit
        $stmtMI = $pdo->prepare("
            INSERT INTO meal_ingredients (meal_id, ingredient_id, measure)
            VALUES (:meal_id, :ingredient_id, :measure)
        ");
        $stmtMI->execute([
            "meal_id"       => $mealId,
            "ingredient_id" => $ingredientId,
            "measure"       => $measure
        ]);
    }

    // -------------------------
    // ERFOLGSANTWORT
    // -------------------------
    echo json_encode([
        "status"    => "success",
        "message"   => "Mahlzeit erfolgreich hinzugefügt",
        "mealId"    => $mealId,
        "thumbnail" => $thumbnailPath
    ]);
} catch (PDOException $e) {
    // -------------------------
    // FEHLERHANDHABUNG
    // -------------------------
    echo json_encode([
        "status" => "error",
        "message" => "Datenbankfehler: " . $e->getMessage()
    ]);
}
