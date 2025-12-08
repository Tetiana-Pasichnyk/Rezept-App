<?php
// === CORS- und JSON-Header ===
// Erlaubt Cross-Origin Requests von der lokalen Entwicklungsumgebung
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Behandelt Preflight OPTIONS-Anfragen für CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// -------------------------
// SESSION BEENDEN / LOGOUT
// -------------------------
// Startet die Session, falls noch nicht gestartet
session_start();

// Löscht alle Session-Daten
session_destroy();

// Entfernt das Session-Cookie im Browser
setcookie(session_name(), "", time() - 3600, "/");

// -------------------------
// ERFOLGSANTWORT
// -------------------------
echo json_encode(["success" => true]);
exit;
