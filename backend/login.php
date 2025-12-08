<?php
// === CORS-Header ===
// Erlaubt Zugriff von der lokalen Entwicklungsumgebung auf Port 3000
header("Access-Control-Allow-Origin: http://localhost:3000");

// Erlaubte HTTP-Methoden für Cross-Origin-Anfragen
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

// Aktiviert die Übertragung von Cookies und Sitzungsinformationen bei Cross-Origin-Anfragen
header("Access-Control-Allow-Credentials: true");

// Erlaubt das Senden bestimmter Header, z.B. Content-Type
header("Access-Control-Allow-Headers: Content-Type");

// Behandelt Preflight OPTIONS-Anfragen für CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Setzt den Content-Type auf JSON für die API-Antwort
header("Content-Type: application/json");

// Startet die Session, um den Login-Zustand des Benutzers zu verwalten
session_start();

// Bindet die Datenbankverbindung ein (PDO)
require "db.php";

try {
    // Liest JSON-Daten von der UI-Form
    $input = json_decode(file_get_contents("php://input"), true);

    // Null-Sicherheit: Setzt Standardwerte, falls E-Mail oder Passwort fehlen
    $email = $input['email'] ?? '';
    $password = $input['password'] ?? '';

    // Validiert die Eingaben
    if (!$email || !$password) {
        echo json_encode([
            "success" => false,
            "message" => "Email oder Passwort fehlt oder ist ungültig"
        ]);
        exit;
    }

    // Bereitet die SQL-Abfrage vor, um den Benutzer anhand der E-Mail zu finden
    $PdoStatement = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $PdoStatement->execute([$email]);

    // Holt die Benutzerdaten als assoziatives Array
    $user = $PdoStatement->fetch(PDO::FETCH_ASSOC);

    // Prüft, ob der Benutzer existiert und ob das Passwort korrekt ist
    if (!$user || !password_verify($password, $user['password_hash'])) {
        echo json_encode([
            "success" => false,
            "message" => "Email oder Passwort ist falsch"
        ]);
        exit;
    }

    // Login erfolgreich: Speichert die Benutzer-ID in der Session
    $_SESSION['user_id'] = $user["id"];

    // Sendet die erfolgreiche Login-Antwort zurück
    echo json_encode([
        "success" => true,
        "message" => "Login erfolgreich",
        "user_id" => $user["id"]
    ]);
    exit;
} catch (Exception $e) {
    // Allgemeiner Fehlerfall: keine detaillierte Fehleranzeige für Sicherheit
    echo json_encode([
        "success" => false,
        "message" => "Email oder Passwort ist falsch"
    ]);
    exit;
}
