import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./Nav.css";

function Nav() {
  return (
    <div className="mx-5 nav-bar ">
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 ">
        <div className="container-fluid d-flex justify-content-center items-center mt-2">
          {/* nav-left */}
          <div className="navbar-brand d-none d-md-block">
            <i className="bi bi-book"></i> Super Rezept
          </div>

          {/* search bar */}
          <form className="d-flex justify-content-center flex-grow-1 mx-3 search-bar">
            <div
              className="position-relative"
              style={{ maxWidth: "500px", width: "100%" }}
            >
              <i
                className="bi bi-search position-absolute"
                style={{
                  left: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#888",
                }}
              ></i>
              <input
                type="text"
                className="form-control rounded-pill ps-5"
                placeholder="Search..."
              />
            </div>
          </form>

          {/* nav-right */}
          <div className="d-flex align-items-center nav-right">
            {/* menu drop-down */}
            <button
              className="navbar-toggler"
              type="button"
              style={{ fontSize: "0.8rem" }}
              data-bs-toggle="collapse"
              data-bs-target="#navMenu"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navMenu">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a
                    className="nav-link active text-dark"
                    aria-current="page"
                    href="#"
                  >
                    <i className="bi bi-house-door"></i> Home
                    &nbsp;&nbsp;&nbsp;|
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-dark" href="#">
                    <i className="bi bi-plus-circle"></i> neues Rezept
                    &nbsp;&nbsp;&nbsp;|
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-dark" href="#">
                    <i className="bi bi-person"></i> log-in
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* NAV Buttons */}
      <div id="buttonCarousel" className="d-block carousel slide ">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="d-flex flex-nowrap nav-buttons">
              <button
                type="button"
                className="btn btn-secondary btn-sm me-2 rounded-pill "
                style={{ backgroundColor: "#f94144" }}
              >
                Beef
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm  me-2 rounded-pill"
                style={{ backgroundColor: "#d2691e" }}
              >
                Breakfast
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm  me-2 rounded-pill"
                style={{ backgroundColor: "#f9c74f" }}
              >
                Chicken
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm  me-2 rounded-pill"
                style={{ backgroundColor: "#90be6d" }}
              >
                Dessert
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm  me-2 rounded-pill"
                style={{ backgroundColor: "#43aa8b" }}
              >
                Pasta
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm  me-2 rounded-pill"
                style={{ backgroundColor: "#4d908e" }}
              >
                Seafood
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm  me-2 rounded-pill"
                style={{ backgroundColor: "#577590" }}
              >
                Vegan
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm  me-2 rounded-pill"
                style={{ backgroundColor: "#db5375" }}
              >
                Goat
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm  me-2 rounded-pill"
                style={{ backgroundColor: "#ec9192" }}
              >
                Lamb
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm  me-2 rounded-pill"
                style={{ backgroundColor: "#dfbe99" }}
              >
                Miscellaneous
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm  me-2 rounded-pill"
                style={{ backgroundColor: "#b5bd89" }}
              >
                Pork
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm  me-2 rounded-pill"
                style={{ backgroundColor: "#729ea1" }}
              >
                Side
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm  me-2 rounded-pill"
                style={{ backgroundColor: "#13505b" }}
              >
                Starter
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm  me-2 rounded-pill"
                style={{ backgroundColor: "#d7d9ce" }}
              >
                Vegetarian
              </button>
            </div>
          </div>
        </div>

        {/* arrows */}
        <button
          className="carousel-control-prev custom-arrow"
          type="button"
          data-bs-target="#buttonCarousel"
          data-bs-slide="prev"
        >
          <i className="bi bi-chevron-left"></i>
        </button>
        <button
          className="carousel-control-next custom-arrow"
          type="button"
          data-bs-target="#buttonCarousel"
          data-bs-slide="next"
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>

      <hr className="border border-2 opacity-50 border-color"></hr>
    </div>
  );
}

export default Nav;
