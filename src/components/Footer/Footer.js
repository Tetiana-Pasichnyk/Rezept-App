import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Footer.css";

function Footer() {
  return (
    <div>
      <hr className="border border-2 opacity-50 border-color"></hr>
      <div className="row  g-3 footer mb-5">
        {/* footer left */}
        <div className="col-sm-6 mb-3 mb-sm-0 p-0">
          <div className="card">
            <div className="card-body p-0">
              <h5 className="card-title text-decoration-underline mb-2">
                CONTACT:
              </h5>
              <p className="card-text">+49 171 333 3333</p>
              <p>
                Our customer service is available Mon–Sat : <br /> 7 a.m.–11
                p.m.
                <br />
                 (except on public holidays)
              </p>

              <a href="http://localhost:3000/impressum" className="btn ">
                Impressum
              </a>
              <a href="http://localhost:3000/data-protection" className="btn ">
                Data Protection
              </a>
            </div>
          </div>
        </div>

        {/* footer right */}
        <div className="col-sm-6">
          <div className="row g-5">
            <div className="col-md-4 footer-img-frame">
              <img src="/images/our-team.png" className="img-fluid" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title mb-2 text-decoration-underline">
                  ABOUT US:
                </h5>
                <p className="card-text">
                  We are a team dedicated to modern web and app development. Our
                  focus is on clear design, high user-friendliness, and
                  efficient workflows. With creativity and a methodical
                  approach, we create solutions that foster international
                  collaboration and deliver sustainable results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
