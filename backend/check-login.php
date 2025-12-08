<?php
// === CORS- und JSON-Header ===
// Erlaubt Cross-Origin Requests von der lokalen Entwicklungsumgebung
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Behandelt Preflight OPTIONS-Anfragen für CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// -------------------------
// SESSION START
// -------------------------
// Startet die Session, um den Login-Status des Benutzers zu prüfen
session_start();

// -------------------------
// LOGIN-STATUS PRÜFEN
// -------------------------
if (isset($_SESSION['user_id'])) {
    // Benutzer ist eingeloggt: user_id zurückgeben
    echo json_encode([
        "loggedIn" => true,
        "user_id"  => $_SESSION['user_id']
    ]);
} else {
    // Benutzer ist nicht eingeloggt
    echo json_encode([
        "loggedIn" => false
    ]);
}
