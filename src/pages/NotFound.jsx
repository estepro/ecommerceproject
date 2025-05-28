import React from "react";
import Header from "../components/static/Header";
import Footer from "../components/static/Footer";
import { Link } from "react-router-dom";

const NotFound = ({ cart }) => {
  return (
    <>
      <Header cartItems={cart} />
      <h1>404</h1>
      <button>
        <Link to="/">Volver al inicio</Link>
      </button>
      <Footer />
    </>
  );
};

export default NotFound;
