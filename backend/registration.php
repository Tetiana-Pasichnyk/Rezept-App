<?php
// === CORS-Header ===
// Erlaubt Cross-Origin Requests von der lokalen Entwicklungsumgebung
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Behandelt Preflight OPTIONS-Anfragen für CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Setzt den Content-Type auf JSON für die API-Antwort
header("Content-Type: application/json");

// Bindet die PDO-Datenbankverbindung ein
require "db.php";

// -------------------------
// DATEN AUS JSON INPUT LESEN
// -------------------------
$data = json_decode(file_get_contents("php://input"), true);

// Eingabefelder säubern und abrufen
$first = trim($data["first_name"] ?? '');
$last  = trim($data["last_name"] ?? '');
$phone = trim($data["phone_number"] ?? '');
$email = trim($data["email"] ?? '');
$pass  = $data["password"] ?? '';
$pass2 = $data["password2"] ?? '';

// -------------------------
// VALIDIERUNG DER EINGABEN
// -------------------------
if (!$first || !$last || !$email || !$pass || !$pass2) {
    echo json_encode(["status" => "error", "message" => "Alle Felder sind erforderlich"]);
    exit;
}

if ($pass !== $pass2) {
    echo json_encode(["status" => "error", "message" => "Passwörter stimmen nicht überein"]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["status" => "error", "message" => "Ungültige E-Mail-Adresse"]);
    exit;
}

if (strlen($pass) < 6) {
    echo json_encode(["status" => "error", "message" => "Passwort zu kurz (mindestens 6 Zeichen)"]);
    exit;
}

// -------------------------
// ÜBERPRÜFUNG, OB EMAIL BEREITS REGISTRIERT IST
// -------------------------
$stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
$stmt->execute([$email]);
if ($stmt->rowCount() > 0) {
    echo json_encode(["status" => "error", "message" => "E-Mail ist bereits registriert"]);
    exit;
}

// -------------------------
// BENUTZER IN DATENBANK EINFÜGEN
// -------------------------
// Passwort hashen für sichere Speicherung
$hash = password_hash($pass, PASSWORD_BCRYPT);

$stmt = $pdo->prepare("
    INSERT INTO users (first_name, last_name, phone_number, email, password_hash)
    VALUES (?, ?, ?, ?, ?)
");

try {
    $stmt->execute([$first, $last, $phone, $email, $hash]);

    // -------------------------
    // ERFOLGSANTWORT
    // -------------------------
    echo json_encode(["status" => "success", "message" => "Registrierung erfolgreich ✅"]);
} catch (PDOException $e) {
    // Fehlerfall: Datenbankfehler zurückgeben (nur in Entwicklung)
    echo json_encode(["status" => "error", "message" => "Registrierung fehlgeschlagen: " . $e->getMessage()]);
}
