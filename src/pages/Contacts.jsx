import React from "react";
import Header from "../components/static/Header";
import Footer from "../components/static/Footer";

const Contacts = ({ cart }) => {
  return (
    <>
      <Header cartItems={cart} />
      <h1>Contactos</h1>
      <Footer />
    </>
  );
};

export default Contacts;
