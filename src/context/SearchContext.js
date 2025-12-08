import { createContext, useState } from "react";

/**
 * @context SearchContext
 * Globaler Kontext für die Suche in der App.
 * Verantwortlich für:
 * - Speicherung des aktuellen Suchbegriffs
 * - Bereitstellung von Setter-Funktion für andere Komponenten
 */
export const SearchContext = createContext();

/**
 * @component SearchProvider
 * Kontext-Provider für die gesamte Anwendung.
 * Stellt den aktuellen Suchbegriff und die Setter-Funktion bereit.
 */
export const SearchProvider = ({ children }) => {
  // -------------------------
  // State für Suchbegriff
  // -------------------------
  const [searchTerm, setSearchTerm] = useState(""); // Aktueller Suchbegriff

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};
