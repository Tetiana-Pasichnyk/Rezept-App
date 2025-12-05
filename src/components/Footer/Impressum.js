import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TextPages.css";

const impressum = {
  name: "Can She Code",
  address: "123 Main Street, Berlin",
  email: "kontakt@example.com",
  phone: "+49 123 456789",
  ustid: null, // Nur wenn vorhanden
};

function Impressum() {
  return (
    <div className="container my-5">
      <h1 className="display-4 mb-4">Impressum</h1>

      <section className="mb-4">
        <h2 className="h3">Angaben gemäß § 5 TMG</h2>
        <address>
          <strong>{impressum.name}</strong>
          <br />
          {impressum.address}
          <br />
          E-Mail: <a href={`mailto:${impressum.email}`}>{impressum.email}</a>
          <br />
          {impressum.phone && <>Telefon: {impressum.phone}</>}
          <br />
          {impressum.ustid && <>Umsatzsteuer-ID: {impressum.ustid}</>}
        </address>
      </section>

      <section className="mb-4">
        <h2 className="h3">Haftung für Inhalte</h2>
        <p>
          Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für
          die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir
          jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7
          Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen
          Gesetzen verantwortlich.
        </p>
        <p>
          Wir weisen darauf hin, dass bei Rezepten, Nährwertangaben oder
          gesundheitlichen Hinweisen keine Garantie auf Vollständigkeit oder
          Richtigkeit besteht. Diese Website stellt keine Ernährungs- oder
          Gesundheitsberatung dar.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="h3">Haftung für Links</h2>
        <p>
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren
          Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
          fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
          verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
          verantwortlich.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="h3">Urheberrecht</h2>
        <p>
          Die auf dieser Website veröffentlichten Inhalte, Rezepte, Texte und
          Bilder unterliegen dem deutschen Urheberrecht. Eine Vervielfältigung,
          Bearbeitung, Verbreitung oder Nutzung außerhalb der Grenzen des
          Urheberrechts ist ohne schriftliche Zustimmung nicht gestattet.
        </p>
        <p>
          Eigene Bilder und Fotos sind urheberrechtlich geschützt. Bei
          hochgeladenen Bildern durch Nutzer sind diese selbst verantwortlich
          sicherzustellen, dass keine Rechte Dritter verletzt werden.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="h3">EU-Streitschlichtung</h2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur
          Online-Streitbeilegung (OS) bereit:
          {"\u00A0"}
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noreferrer"
          >
            https://ec.europa.eu/consumers/odr
          </a>
          .
        </p>
        <p>
          Wir sind nicht verpflichtet und nicht bereit, an
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen.
        </p>
      </section>
    </div>
  );
}

export default Impressum;
