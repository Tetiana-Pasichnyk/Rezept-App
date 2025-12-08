// src/components/TextPage/TextPage.jsx
import React from "react";
import { contactInfo } from "../../config/TextPagesConfig";

/**
 * TextPage-Komponente
 * --------------------------------------------------------------
 * Universelle Komponente für textbasierte Seiten wie:
 * - Datenschutz
 * - Impressum
 * - FAQ
 *
 * Props:
 * - title: string — Hauptüberschrift der Seite
 * - sections: array — Array von Sektionen, jede mit:
 *   - title: string — Überschrift der Sektion
 *   - content: array — Array von Inhalten, z. B. Text, Listen, Adressen
 *
 * Unterstützte Content-Formate:
 * 1. string => einfache <p>-Tags
 * 2. { type: "list", items: [] } => geordnete oder ungeordnete Liste
 * 3. { type: "address" } => Kontaktinformationen aus config
 * 4. { type: "addressWithUStId" } => Impressum-spezifisch inkl. Umsatzsteuer-ID
 * 5. { type: "link", href, text } => externe Links
 * 6. { subtitle, text: [] } => Unterpunkte mit mehreren Textzeilen
 * --------------------------------------------------------------
 */
function TextPage({ title, sections }) {
  return (
    <div className="container my-5">
      {/* Haupttitel */}
      <h1 className="display-4 mb-4">{title}</h1>

      {/* Sektionen rendern */}
      {sections.map((section, i) => (
        <section className="mb-4" key={i}>
          {/* Titel der Sektion */}
          <h2 className="h3">{section.title}</h2>

          {/* Inhalt der Sektion */}
          {section.content.map((item, j) => {
            if (item.subtitle) {
              // Unterpunkt mit eigenem Titel + mehreren Texten
              return (
                <div key={j} className="mb-3">
                  <h3 className="h5 mt-3">{item.subtitle}</h3>
                  {item.text.map((t, k) => renderContentItem(t, k))}
                </div>
              );
            }
            // Einfaches Content-Item rendern
            return renderContentItem(item, j);
          })}
        </section>
      ))}
    </div>
  );
}

/**
 * Hilfsfunktion renderContentItem
 * -------------------------------
 * Rendert ein Content-Item abhängig vom Typ:
 * - string => <p>
 * - list => <ul><li>...</li></ul>
 * - address => Kontaktadresse
 * - addressWithUStId => Impressum inkl. Umsatzsteuer-ID
 * - link => anklickbarer Link
 */
function renderContentItem(item, key) {
  if (typeof item === "string") {
    return <p key={key}>{item}</p>;
  }

  switch (item.type) {
    case "list":
      return (
        <ul className="list-group list-group-flush mb-3" key={key}>
          {item.items.map((li, i) => (
            <li className="list-group-item" key={i}>
              {li}
            </li>
          ))}
        </ul>
      );

    case "address":
      return (
        <address key={key}>
          <strong>{contactInfo.name}</strong>
          <br />
          {contactInfo.address}
          <br />
          E-Mail: <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
          <br />
          {contactInfo.phone && <>Telefon: {contactInfo.phone}</>}
        </address>
      );

    case "addressWithUStId":
      return (
        <address key={key}>
          <strong>{contactInfo.name}</strong>
          <br />
          {contactInfo.address}
          <br />
          E-Mail: <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
          <br />
          {contactInfo.phone && <>Telefon: {contactInfo.phone}</>}
          <br />
          {contactInfo.ustid && <>Umsatzsteuer-ID: {contactInfo.ustid}</>}
        </address>
      );

    case "link":
      return (
        <p key={key}>
          <a href={item.href} target="_blank" rel="noreferrer">
            {item.text}
          </a>
        </p>
      );

    default:
      // Für unbekannte Typen nichts rendern
      return null;
  }
}

export default TextPage;
