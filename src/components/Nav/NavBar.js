import { Navbar, Nav, Container, Form, Button } from "react-bootstrap";
import "./NavBar.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Kategorienliste mit zugehörigen Akzentfarben
// Diese Liste wird zur Generierung der Kategorie-Badges im Scrollbereich genutzt
const categories = [
  { name: "Beef", color: "#f94144" },
  { name: "Breakfast", color: "#d2691e" },
  { name: "Chicken", color: "#f9c74f" },
  { name: "Dessert", color: "#90be6d" },
  { name: "Pasta", color: "#43aa8b" },
  { name: "Seafood", color: "#4d908e" },
  { name: "Vegan", color: "#577590" },
  { name: "Goat", color: "#db5375" },
  { name: "Lamb", color: "#ec9192" },
  { name: "Miscellaneous", color: "#dfbe99" },
  { name: "Pork", color: "#b5bd89" },
  { name: "Side", color: "#729ea1" },
  { name: "Starter", color: "#13505b" },
  { name: "Vegetarian", color: "#d7d9ce" },
];

function NavBar() {
  return (
    <>
      {/* Haupt-Navigationsleiste */}
      <Navbar expand="lg" bg="light" className="px-3 shadow-sm">
        <Container
          fluid
          className="navbar-container d-flex align-items-center justify-content-between"
        >
          {/* Logo / Markenname */}
          <Navbar.Brand className="navbar-logo fw-bold">
            <i className="bi bi-book" /> Super Rezept
          </Navbar.Brand>

          {/* Suchfeld – mittig positioniert, unterstützt schnelle Rezeptsuche */}
          <div className="search-wrapper">
            <Form>
              <div className="position-relative">
                {/* Such-Icon als visuelle Unterstützung */}
                <i
                  className="bi bi-search position-absolute"
                  style={{
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#777",
                  }}
                />
                <Form.Control
                  type="text"
                  placeholder="Search..."
                  className="rounded-pill ps-5"
                />
              </div>
            </Form>
          </div>

          {/* Hamburger-Menü für mobile Darstellung */}
          <Navbar.Toggle aria-controls="main-nav" />

          {/* Navigationslinks (zentriert im ausgeklappten Zustand) */}
          <Navbar.Collapse id="main-nav" className="justify-content-center">
            <Nav className="text-center">
              <Nav.Link href="#">
                <i className="bi bi-house-door" /> Home
              </Nav.Link>
              <Nav.Link href="#">
                <i className="bi bi-plus-circle" /> Neues Rezept
              </Nav.Link>
              <Nav.Link href="#">
                <i className="bi bi-person" /> Log-in
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Horizontaler Kategorien-Slider zur schnellen Filterung von Rezepten */}
      <div className="category-container py-2">
        <div className="category-scroll d-flex overflow-auto">
          {categories.map((cat, index) => (
            <Button
              key={index}
              className="category-pill me-2 text-white"
              style={{ backgroundColor: cat.color }}
            >
              {cat.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Trennlinie für visuelle Strukturierung */}
      <hr className="opacity-50" />
    </>
  );
}

export default NavBar;
