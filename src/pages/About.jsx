import React from "react";
import Header from "../components/static/Header";
import Footer from "../components/static/Footer";

const About = ({ cart }) => {
  return (
    <>
      <Header cartItems={cart} />
      <h1>Acerca De</h1>
      <Footer />
    </>
  );
};

export default About;
