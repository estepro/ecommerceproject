import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./stylestatic.css";
import Cart from "../Cart";
import { useCart } from "../../context/CartContext";

const Header = () => {
  const { cart, deleteFromCart } = useCart();
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
              {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
            </button>
            <Cart
              delProduct={deleteFromCart}
              cartItems={cart}
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
