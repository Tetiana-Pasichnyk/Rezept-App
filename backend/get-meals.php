<?php
// ============================================
// JSON + CORS
// ============================================
// Setzt den Content-Type auf JSON und erlaubt Cross-Origin Requests
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");

// ============================================
// DATENBANKVERBINDUNG
// ============================================
require_once "db.php";

// ============================================
// OPTIONALEN KATEGORIENFILTER AUSLESEN
// ============================================
$category = $_GET["category"] ?? null;

// ============================================
// ALLE KATEGORIEN LADEN
// ============================================
try {
    $stmtCat = $pdo->query("SELECT id, name FROM categories ORDER BY name");
    $categories = $stmtCat->fetchAll();

    // Farbzuweisung für Kategorien (Beispiel-UI)
    $colors = [
        "#f94144",
        "#f3722c",
        "#f8961e",
        "#f9844a",
        "#f9c74f",
        "#90be6d",
        "#43aa8b",
        "#4d908e",
        "#577590",
        "#277da1",
        "#b56576",
        "#6d597a",
        "#355070",
        "#a44a3f"
    ];

    foreach ($categories as &$c) {
        // Jede Kategorie bekommt eine Farbe basierend auf der ID
        $c["color"] = $colors[$c["id"] % count($colors)];
    }
} catch (PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => "Fehler beim Laden der Kategorien: " . $e->getMessage()
    ]);
    exit;
}

// ============================================
// MAHLZEITEN LADEN (nur user_id IS NULL)
// ============================================
$sql = "
    SELECT 
        m.id,
        m.name,
        m.thumbnail,
        m.category_id,
        c.name AS category_name,
        a.name AS area_name
    FROM meals m
    LEFT JOIN categories c ON m.category_id = c.id
    LEFT JOIN areas a ON m.area_id = a.id
    WHERE m.user_id IS NULL
";

$params = [];

if ($category) {
    // Optionaler Filter nach Kategorie
    $sql .= " AND c.name = :category";
    $params["category"] = $category;
}

try {
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $meals = $stmt->fetchAll();
} catch (PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => "Fehler beim Laden der Mahlzeiten: " . $e->getMessage()
    ]);
    exit;
}

// ============================================
// ERFOLGSANTWORT
// ============================================
echo json_encode(
    [
        "categories" => $categories,
        "meals" => $meals
    ],
    JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT
);
