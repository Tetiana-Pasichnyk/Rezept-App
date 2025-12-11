import TextPage from "../components/TextPage/TextPage";
import { impressumContent } from "../config/TextPagesConfig";

/**
 * Impressum-Komponente
 * --------------------------------------------------------------
 * Wrapper-Komponente für die Anzeige des Impressums.
 *
 * - Verwendet die generische TextPage-Komponente für Layout und Struktur.
 * - Inhalte stammen aus einer zentralen Konfigurationsdatei (TextPagesConfig.js),
 *   sodass Aktualisierungen einfach und konsistent erfolgen.
 *
 * Props:
 * - Keine eigenen Props erforderlich, alle Inhalte werden aus der Config bezogen.
 *
 * Einsatz:
 * - Einfache Einbindung auf der /impressum Route.
 * --------------------------------------------------------------
 */
function Impressum() {
    return (
        <TextPage
            title={impressumContent.title} // Titel der Seite
            sections={impressumContent.sections} // Array von Abschnitten mit Überschrift & Text
        />
    );
}

export default Impressum;
