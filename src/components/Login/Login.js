import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Login.css";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost/rezept/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // -> <input value={email} />
        body: JSON.stringify({ email, password }),
      });

      // http status
      if (!res.ok) {
        throw new Error(`HTTP错误: ${res.status}`);
      }

      const data = await res.json();

      // echo json_encode(["success" => false, "message" => "Email or password incorrect"]);
      setMsg(data.message); // show the message from login.php,

      if (data.success) {
        alert("You have logged in！");
        localStorage.setItem("loggedIn", "true");
        window.location.href = "http://localhost:3000/";
      }
    } catch (err) {
      console.error("Fetch request failed:", err);
      setMsg(`Connection error: ${err.message}`); // fetch error show in UI
    }
  };

  return (
    <div className="row">
      <div className="col-6 p-0 left-wrapper">
        <div className="m-5 content-box">
          <div className="d-flex flex-column mt-5 login-content">
            <a
              className="d-flex flex-row text-decoration-none"
              href="http://localhost:3000/"
              style={{ color: "black" }}
            >
              <i
                className="bi bi-house-door"
                style={{ fontSize: 30, color: "#d2691e" }}
              ></i>
              <h1 className="text-nowrap">&nbsp; Super Recipe </h1>
            </a>
            {/* ------------- */}
            <p style={{ color: "red" }}>{msg}</p>
            {/* ------------- */}
            <h2>Login</h2>
            <form id="login-form">
              <input
                className="form-control underline-input"
                type="text"
                placeholder="E-mail Address"
                // for blind person
                aria-label="Registed E-mail Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <input
                className="form-control underline-input"
                type="text"
                placeholder="Password"
                aria-label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </form>
            <h6 className="text-nowrap mt-1">Forget your password?</h6>
            <button
              form="login-form"
              type="button"
              className="btn mt-5 login-button"
              onClick={handleLogin}
            >
              LOGIN
            </button>
            <a
              role="button"
              href="http://localhost:3000/register"
              className="btn btn-outline-dark mt-2 mb-5"
            >
              REGISTER
            </a>
            <h5>Log in with</h5>
            <button
              type="button"
              className="btn btn-outline-dark mt-1 text-nowrap"
            >
              <img
                src="/images/icons8-google-48.png"
                alt="google"
                width="18"
                height="18"
              />
              &nbsp; LOG IN WITH GOOGLE
            </button>
            <button
              type="button"
              className="btn btn-outline-dark mt-2 text-nowrap"
            >
              <i className="bi bi-apple"></i>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LOG IN WITH APPLE
            </button>
          </div>
        </div>
      </div>
      <div className="col-6 right-pic ">
        <img src="images/spices-klein.png" alt="spices" className="img-fluid" />
      </div>
    </div>
  );
}

export default Login;
