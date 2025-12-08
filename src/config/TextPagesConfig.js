// ---------------------------
// Kontaktinformationen
// Diese Daten werden auf allen Seiten der Website verwendet
// ---------------------------
export const contactInfo = {
    name: "Can She Code", // Name des Unternehmens/Projekts
    address: "123 Main Street, Berlin", // Physische Geschäftsadresse
    email: "kontakt@example.com", // Kontakt-E-Mail-Adresse
    phone: "+49 123 456789", // Telefonnummer für Kundenanfragen
    ustid: null, // Umsatzsteuer-ID für Impressum, falls vorhanden
};

// ---------------------------
// Datenschutzerklärung
// Enthält alle relevanten Informationen zur DSGVO-konformen Datenverarbeitung
// ---------------------------
export const datenschutzContent = {
    title: "Datenschutzerklärung", // Haupttitel der Datenschutzseite
    sections: [
        {
            title: "1. Verantwortliche Stelle",
            content: [{ type: "address" }], // Platzhalter für Kontaktinformationen
        },
        {
            title: "2. Erhobene Daten und Zwecke der Verarbeitung",
            content: [
                {
                    subtitle: "2.1 Daten bei Registrierung und Login",
                    text: [
                        "Bei der Erstellung eines Benutzerkontos verarbeiten wir:",
                        {
                            type: "list",
                            items: ["E-Mail-Adresse", "Benutzername", "Passwort (verschlüsselt)"], // Liste der erhobenen personenbezogenen Daten
                        },
                        "Zweck ist die Bereitstellung eines persönlichen Profils und die Nutzung der Rezeptfunktionen.",
                    ],
                },
                {
                    subtitle: "2.2 Nutzergenerierte Inhalte (Uploads)",
                    text: [
                        "Wenn Nutzer Bilder hochladen, verarbeiten wir die Dateien, um sie mit dem Rezept zu verknüpfen.",
                        "Der Nutzer ist dafür verantwortlich, dass keine Urheberrechte Dritter verletzt werden.",
                    ],
                },
                {
                    subtitle: "2.3 Allgemeine Nutzungsdaten",
                    text: [
                        "Zur technischen Bereitstellung der Website werden automatisch erhoben:",
                        {
                            type: "list",
                            items: [
                                "IP-Adresse (gekürzt/temporär gespeichert)",
                                "Browsertyp und Browserversion",
                                "Datum und Uhrzeit des Zugriffs",
                            ],
                        },
                        "Diese Daten dienen der Stabilität und Sicherheit des Webservers.",
                    ],
                },
            ],
        },
        {
            title: "3. Cookies",
            content: [
                "Wir verwenden Cookies, die für die grundlegende Funktionalität der Website erforderlich sind, insbesondere für Login, Sitzungen und Benutzereinstellungen.",
                "Wir verwenden keine Tracking- oder Analyse-Cookies und keinerlei Werbe- oder Profilingmethoden.",
            ],
        },
        {
            title: "4. Rechtsgrundlagen",
            content: [
                {
                    type: "list",
                    items: [
                        "Art. 6 Abs. 1 lit. b DSGVO – Vertragserfüllung (Registrierung, Login, Rezeptverwaltung)",
                        "Art. 6 Abs. 1 lit. f DSGVO – berechtigtes Interesse (Websitebetrieb, Sicherheit)",
                        "Art. 6 Abs. 1 lit. a DSGVO – Einwilligung (sofern freiwillige Uploads stattfinden)",
                    ],
                },
            ],
        },
        {
            title: "5. Speicherdauer",
            content: [
                "Personenbezogene Daten werden nur so lange gespeichert, wie dies für die Bereitstellung des Benutzerkontos und der Webfunktionen erforderlich ist.",
                "Nutzer können jederzeit die Löschung ihres Kontos sowie ihrer hochgeladenen Inhalte beantragen.",
            ],
        },
        {
            title: "6. Weitergabe von Daten",
            content: [
                "Eine Weitergabe an Dritte erfolgt nur, wenn:",
                {
                    type: "list",
                    items: [
                        "eine gesetzliche Verpflichtung besteht, oder",
                        "ein Dienstleister im Rahmen einer Auftragsverarbeitung eingesetzt wird (z. B. Hosting-Anbieter)",
                    ],
                },
            ],
        },
        {
            title: "7. Datensicherheit",
            content: [
                {
                    type: "list",
                    items: [
                        "verschlüsselte Passwortspeicherung",
                        "SSL-Verschlüsselung der gesamten Website",
                        "Serverstandort in der EU (je nach Hosting)",
                        "Zugriffsbeschränkungen für Admin-Bereiche",
                    ],
                },
            ],
        },
        {
            title: "8. Rechte der Nutzer",
            content: [
                {
                    type: "list",
                    items: [
                        "Recht auf Auskunft",
                        "Recht auf Berichtigung",
                        "Recht auf Löschung (Recht auf Vergessenwerden)",
                        "Recht auf Einschränkung der Verarbeitung",
                        "Recht auf Datenübertragbarkeit",
                        "Recht auf Widerruf erteilter Einwilligungen",
                        "Recht auf Beschwerde bei einer Aufsichtsbehörde",
                    ],
                },
            ],
        },
        {
            title: "9. Kontakt",
            content: [{ type: "address" }], // Nutzung der allgemeinen Kontaktinformationen
        },
    ],
};

// ---------------------------
// Impressum
// Rechtliche Pflichtinformationen gemäß deutschem Telemediengesetz (TMG)
// ---------------------------
export const impressumContent = {
    title: "Impressum",
    sections: [
        {
            title: "Angaben gemäß § 5 TMG",
            content: [{ type: "addressWithUStId" }], // Enthält optional die Umsatzsteuer-ID
        },
        {
            title: "Haftung für Inhalte",
            content: [
                "Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.",
                "Wir weisen darauf hin, dass bei Rezepten, Nährwertangaben oder gesundheitlichen Hinweisen keine Garantie auf Vollständigkeit oder Richtigkeit besteht. Diese Website stellt keine Ernährungs- oder Gesundheitsberatung dar.",
            ],
        },
        {
            title: "Haftung für Links",
            content: [
                "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich.",
            ],
        },
        {
            title: "Urheberrecht",
            content: [
                "Die auf dieser Website veröffentlichten Inhalte, Rezepte, Texte und Bilder unterliegen dem deutschen Urheberrecht. Eine Vervielfältigung, Bearbeitung, Verbreitung oder Nutzung außerhalb der Grenzen des Urheberrechts ist ohne schriftliche Zustimmung nicht gestattet.",
                "Eigene Bilder und Fotos sind urheberrechtlich geschützt. Bei hochgeladenen Bildern durch Nutzer sind diese selbst verantwortlich sicherzustellen, dass keine Rechte Dritter verletzt werden.",
            ],
        },
        {
            title: "EU-Streitschlichtung",
            content: [
                "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: ",
                {
                    type: "link",
                    href: "https://ec.europa.eu/consumers/odr",
                    text: "https://ec.europa.eu/consumers/odr",
                },
                "Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
            ],
        },
    ],
};

// ---------------------------
// Footer-Konfiguration
// Definiert Kontaktinformationen, wichtige Links und Über-uns-Sektion für den Footer
// ---------------------------
export const footerConfig = {
    contact: {
        phone: "+49 171 333 3333", // Telefonnummer für Footer-Anzeige
        workingHours: "Mon–Sat : 7 a.m.–11 p.m. (except on public holidays)", // Öffnungszeiten
    },
    links: [
        { label: "Impressum", url: "/impressum" }, // Link zur Impressum-Seite
        { label: "Data Protection", url: "/data-protection" }, // Link zur Datenschutzerklärung
    ],
    about: {
        title: "ABOUT US:", // Überschrift für die About-Sektion
        image: "/images/our-team.png", // Team-Bild
        text: `We are a team dedicated to modern web and app development. Our
           focus is on clear design, high user-friendliness, and
           efficient workflows. With creativity and a methodical
           approach, we create solutions that foster international
           collaboration and deliver sustainable results.`, // Beschreibung des Teams
    },
};
