import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./stylestatic.css";
import Cart from "../Cart";

const Header = ({ cartItems, delProduct }) => {
  const [isCartOpen, setCartOpen] = useState(false);
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/" className="link">
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/about" className="link">
              Sobre Nosotros
            </Link>
          </li>
          <li>
            <Link to="/products" className="link">
              Productos
            </Link>
          </li>
          <li>
            <Link to="/contact" className="link">
              Contacto
            </Link>
          </li>
          <li className="cartnav">
            <button className="btnCart" onClick={() => setCartOpen(true)}>
              <i className="fa-solid fa-cart-shopping"></i>
            </button>
            <Cart
              delProduct={delProduct}
              cartItems={cartItems}
              isOpen={isCartOpen}
              onClose={() => setCartOpen(false)}
            />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
