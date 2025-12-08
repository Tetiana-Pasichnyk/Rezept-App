<?php
// === CORS HEADERS ===
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

// ------------------------------
// INCLUDE DATABASE CONNECTION
// ------------------------------
require_once "db.php";

// ------------------------------
// READ MEAL ID FROM QUERY PARAMS
// ------------------------------
$mealId = $_GET['id'] ?? null;

// If no id → return error
if (!$mealId) {
    echo json_encode([
        "status" => "error",
        "message" => "Meal ID is required"
    ]);
    exit;
}

try {
    // ------------------------------
    // FETCH MAIN MEAL DATA
    // ------------------------------
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
        WHERE m.id = :meal_id
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->execute(["meal_id" => $mealId]);
    $meal = $stmt->fetch();

    if (!$meal) {
        echo json_encode([
            "status" => "error",
            "message" => "Meal not found"
        ]);
        exit;
    }

    // ------------------------------
    // FETCH INGREDIENTS FOR THIS MEAL
    // ------------------------------
    $sqlIngredients = "
        SELECT 
            i.name AS ingredient,
            mi.measure
        FROM meal_ingredients mi
        JOIN ingredients i ON mi.ingredient_id = i.id
        WHERE mi.meal_id = :meal_id
    ";

    $stmt2 = $pdo->prepare($sqlIngredients);
    $stmt2->execute(["meal_id" => $mealId]);
    $ingredients = $stmt2->fetchAll();

    // Attach ingredients to meal
    $meal["ingredients"] = $ingredients;

    // ------------------------------
    // SUCCESS RESPONSE
    // ------------------------------
    echo json_encode($meal);
} catch (Exception $e) {
    // ------------------------------
    // ERROR RESPONSE
    // ------------------------------
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
