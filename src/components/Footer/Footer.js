import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Footer.css";
import { footerConfig } from "../../config/TextPagesConfig";

/**
 * Footer-Komponente
 * --------------------------------------------------------------
 * Dynamischer Footer, der Inhalte aus einer zentralen Konfigurationsdatei
 * lädt. Ermöglicht einfache Anpassung von Kontaktdaten, Links und "Über uns"-Text.
 *
 * Struktur:
 * - Horizontale Trennlinie
 * - Zwei Spalten (Bootstrap Grid):
 *   1. Kontaktinformationen & Links
 *   2. Über uns + Bild
 *
 * Vorteile:
 * - Inhalte können in footerConfig zentral gepflegt werden
 * - Reaktionsfähiges Layout via Bootstrap
 * --------------------------------------------------------------
 */
function Footer() {
    // Destructuring der Footer-Konfiguration
    const { contact, links, about } = footerConfig;

    return (
        <div>
            {/* Horizontale Trennlinie */}
            <hr className="border border-2 opacity-50 border-color" />

            {/* Footer-Container mit Bootstrap Grid */}
            <div className="row g-3 footer mb-5">
                {/* -----------------------
                    Linke Spalte: Kontakt & Links
                   ----------------------- */}
                <div className="col-sm-6 mb-3 mb-sm-0 p-0">
                    <div className="card">
                        <div className="card-body p-0">
                            <h5 className="card-title text-decoration-underline mb-2">CONTACT:</h5>
                            <p className="card-text">{contact.phone}</p>
                            <p>{contact.workingHours}</p>

                            {/* Dynamische Links aus der Konfiguration */}
                            {links.map((link) => (
                                <a key={link.label} href={link.url} className="btn">
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* -----------------------
                    Rechte Spalte: Über uns
                   ----------------------- */}
                <div className="col-sm-6">
                    <div className="row g-5">
                        {/* Team-Bild */}
                        <div className="col-md-4 footer-img-frame">
                            <img src={about.image} className="img-fluid" alt="Team" />
                        </div>

                        {/* Text über das Team */}
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title mb-2 text-decoration-underline">{about.title}</h5>
                                <p className="card-text">{about.text}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
