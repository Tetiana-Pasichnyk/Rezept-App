import "bootstrap/dist/css/bootstrap.min.css";
import "./TextPages.css";

const contactInfo = {
  name: "Can She Code",
  address: "123 Main Street, Berlin",
  email: "kontakt@example.com",
  phone: "+49 123 456789",
};

function Datenschutz() {
  return (
    <div className="container my-5">
      <h1 className="display-4 mb-4">Datenschutzerklärung</h1>

      <section className="mb-4">
        <h2 className="h3">1. Verantwortliche Stelle</h2>
        <p>Verantwortlich für die Verarbeitung personenbezogener Daten ist:</p>
        <address>
          <strong>{contactInfo.name}</strong>
          <br />
          {contactInfo.address}
          <br />
          E-Mail:{" "}
          <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
          <br />
          {contactInfo.phone && <>Telefon: {contactInfo.phone}</>}
        </address>
      </section>

      <section className="mb-4">
        <h2 className="h3">2. Erhobene Daten und Zwecke der Verarbeitung</h2>

        <h3 className="h5 mt-3">2.1 Daten bei Registrierung und Login</h3>
        <p>Bei der Erstellung eines Benutzerkontos verarbeiten wir:</p>
        <ul className="list-group list-group-flush mb-3">
          <li className="list-group-item">E-Mail-Adresse</li>
          <li className="list-group-item">Benutzername</li>
          <li className="list-group-item">Passwort (verschlüsselt)</li>
        </ul>
        <p>
          Zweck ist die Bereitstellung eines persönlichen Profils und die
          Nutzung der Rezeptfunktionen.
        </p>

        <h3 className="h5 mt-3">2.2 Nutzergenerierte Inhalte (Uploads)</h3>
        <p>
          Wenn Nutzer Bilder hochladen, verarbeiten wir die Dateien, um sie mit
          dem Rezept zu verknüpfen.
        </p>
        <p>
          Der Nutzer ist dafür verantwortlich, dass keine Urheberrechte Dritter
          verletzt werden.
        </p>

        <h3 className="h5 mt-3">2.3 Allgemeine Nutzungsdaten</h3>
        <p>
          Zur technischen Bereitstellung der Website werden automatisch erhoben:
        </p>
        <ul className="list-group list-group-flush mb-3">
          <li className="list-group-item">
            IP-Adresse (gekürzt/temporär gespeichert)
          </li>
          <li className="list-group-item">Browsertyp und Browserversion</li>
          <li className="list-group-item">Datum und Uhrzeit des Zugriffs</li>
        </ul>
        <p>Diese Daten dienen der Stabilität und Sicherheit des Webservers.</p>
      </section>

      <section className="mb-4">
        <h2 className="h3">3. Cookies</h2>
        <p>
          Wir verwenden Cookies, die für die grundlegende Funktionalität der
          Website erforderlich sind, insbesondere für Login, Sitzungen und
          Benutzereinstellungen.
        </p>
        <p>
          Wir verwenden <strong>keine Tracking- oder Analyse-Cookies</strong>{" "}
          und keinerlei Werbe- oder Profilingmethoden.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="h3">4. Rechtsgrundlagen</h2>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            Art. 6 Abs. 1 lit. b DSGVO – Vertragserfüllung (Registrierung,
            Login, Rezeptverwaltung)
          </li>
          <li className="list-group-item">
            Art. 6 Abs. 1 lit. f DSGVO – berechtigtes Interesse (Websitebetrieb,
            Sicherheit)
          </li>
          <li className="list-group-item">
            Art. 6 Abs. 1 lit. a DSGVO – Einwilligung (sofern freiwillige
            Uploads stattfinden)
          </li>
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="h3">5. Speicherdauer</h2>
        <p>
          Personenbezogene Daten werden nur so lange gespeichert, wie dies für
          die Bereitstellung des Benutzerkontos und der Webfunktionen
          erforderlich ist.
        </p>
        <p>
          Nutzer können jederzeit die Löschung ihres Kontos sowie ihrer
          hochgeladenen Inhalte beantragen.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="h3">6. Weitergabe von Daten</h2>
        <p>Eine Weitergabe an Dritte erfolgt nur, wenn:</p>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            eine gesetzliche Verpflichtung besteht, oder
          </li>
          <li className="list-group-item">
            ein Dienstleister im Rahmen einer Auftragsverarbeitung eingesetzt
            wird (z. B. Hosting-Anbieter)
          </li>
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="h3">7. Datensicherheit</h2>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            verschlüsselte Passwortspeicherung
          </li>
          <li className="list-group-item">
            SSL-Verschlüsselung der gesamten Website
          </li>
          <li className="list-group-item">
            Serverstandort in der EU (je nach Hosting)
          </li>
          <li className="list-group-item">
            Zugriffsbeschränkungen für Admin-Bereiche
          </li>
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="h3">8. Rechte der Nutzer</h2>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Recht auf Auskunft</li>
          <li className="list-group-item">Recht auf Berichtigung</li>
          <li className="list-group-item">
            Recht auf Löschung (Recht auf Vergessenwerden)
          </li>
          <li className="list-group-item">
            Recht auf Einschränkung der Verarbeitung
          </li>
          <li className="list-group-item">Recht auf Datenübertragbarkeit</li>
          <li className="list-group-item">
            Recht auf Widerruf erteilter Einwilligungen
          </li>
          <li className="list-group-item">
            Recht auf Beschwerde bei einer Aufsichtsbehörde
          </li>
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="h3">9. Kontakt</h2>
        <p>Bei Fragen zur Datenverarbeitung kontaktieren Sie bitte:</p>
        <address>
          <strong>{contactInfo.name}</strong>
          <br />
          {contactInfo.address}
          <br />
          E-Mail:{" "}
          <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
          <br />
          {contactInfo.phone && <>Telefon: {contactInfo.phone}</>}
        </address>
      </section>
    </div>
  );
}

export default Datenschutz;
