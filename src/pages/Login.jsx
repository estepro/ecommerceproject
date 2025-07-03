import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/static/Header";
import Footer from "../components/static/Footer";

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      navigate("/"); // Redirige al home después de login
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <>
      <Header />
      <main>
        <h1>Login</h1>
        <form
          onSubmit={handleSubmit}
          style={{ maxWidth: 300, margin: "0 auto" }}
        >
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ display: "block", width: "100%", marginBottom: 10 }}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ display: "block", width: "100%", marginBottom: 10 }}
          />
          <button type="submit" style={{ width: "100%" }}>
            Ingresar
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </main>
      <Footer />
    </>
  );
};

export default Login;
