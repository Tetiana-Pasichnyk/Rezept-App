import TextPage from "../components/TextPage/TextPage";
import { datenschutzContent } from "../config/TextPagesConfig";
/**
 * Datenschutzerklärung-Komponente
 * --------------------------------------------------------------
 * Wrapper-Komponente, die die Datenschutzerklärung anzeigt.
 *
 * - Verwendet die generische TextPage-Komponente für Layout und Struktur.
 * - Daten werden aus einer zentralen Konfigurationsdatei geladen (TextPagesConfig.js),
 *   sodass Inhalte leicht aktualisiert oder internationalisiert werden können.
 *
 * Props:
 * - Keine eigenen Props erforderlich, alles wird aus der Config bezogen.
 *
 * Einsatz:
 * - Einfache Einbindung auf /datenschutz Route.
 * --------------------------------------------------------------
 */
function Datenschutz() {
    return (
        <TextPage 
            title={datenschutzContent.title}          // Titel der Seite
            sections={datenschutzContent.sections}   // Inhalt: Array von Überschriften & Texten
        />
    );
}

export default Datenschutz;
