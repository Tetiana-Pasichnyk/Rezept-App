<?php
// === CORS- und JSON-Header ===
// Erlaubt Cross-Origin Requests und Cookies von der lokalen Entwicklungsumgebung
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");

// -------------------------
// SESSION START
// -------------------------
// Startet die Session, um eingeloggte Benutzer zu identifizieren
session_start();

// Bindet die PDO-Datenbankverbindung ein
require_once "db.php";

// -------------------------
// LOGIN-STATUS PRÜFEN
// -------------------------
// Überprüft, ob der Benutzer eingeloggt ist
if (!isset($_SESSION['user_id'])) {
    echo json_encode([
        "status" => "error",
        "message" => "Benutzer ist nicht eingeloggt."
    ]);
    exit;
}

$user_id = $_SESSION['user_id'];

try {
    // -------------------------
    // ALLE MAHLZEITEN DES BENUTZERS ABRUFEN
    // -------------------------
    $sql = "
        SELECT 
            m.id,
            m.name,
            m.thumbnail,
            m.instructions,
            c.name AS category_name,
            a.name AS area_name
        FROM meals m
        LEFT JOIN categories c ON m.category_id = c.id
        LEFT JOIN areas a ON m.area_id = a.id
        WHERE m.user_id = :user_id
        ORDER BY m.created_at DESC
    ";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(["user_id" => $user_id]);
    $meals = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // -------------------------
    // INGREDIENTEN FÜR JEDES MAHLZEIT ABRUFEN
    // -------------------------
    foreach ($meals as &$meal) {
        $sqlIng = "
            SELECT 
                i.name AS ingredient,
                mi.measure
            FROM meal_ingredients mi
            JOIN ingredients i ON mi.ingredient_id = i.id
            WHERE mi.meal_id = :meal_id
        ";
        $stmtIng = $pdo->prepare($sqlIng);
        $stmtIng->execute(["meal_id" => $meal['id']]);
        $meal['ingredients'] = $stmtIng->fetchAll(PDO::FETCH_ASSOC);

        // Setzt ein Standard-Thumbnail-Bild
        $meal['thumbnail'] = "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.1.0";
    }

    // -------------------------
    // ERFOLGSANTWORT
    // -------------------------
    echo json_encode([
        "status" => "success",
        "meals" => $meals
    ]);
} catch (PDOException $e) {
    // -------------------------
    // FEHLERHANDHABUNG
    // -------------------------
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
