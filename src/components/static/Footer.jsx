import React from "react";
import "./stylestatic.css";

const Footer = () => {
  <footer className="bg-dark text-white py-3 mt-5">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-12 col-md-6 text-center text-md-start mb-2 mb-md-0">
          &copy; {new Date().getFullYear()} Mi E-commerce
        </div>
        <div className="col-12 col-md-6 text-center text-md-end">
          <a
            href="https://github.com/"
            className="text-white me-3"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a href="mailto:info@mi-ecommerce.com" className="text-white">
            Contacto
          </a>
        </div>
      </div>
    </div>
  </footer>;
};

export default Footer;
