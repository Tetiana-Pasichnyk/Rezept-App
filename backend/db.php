<?php
// ------------------------------
// DATABASE CONNECTION
// ------------------------------

ini_set('display_errors', 1);
error_reporting(E_ALL);

try {
    $pdo = new PDO(
        "mysql:host=localhost;port=8888;dbname=rezept_db;charset=utf8",
        "root",
        "root",
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]
    );
} catch (PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => "DB connection failed: " . $e->getMessage()
    ]);
    exit;
}
