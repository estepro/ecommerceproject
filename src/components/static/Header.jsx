import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./stylestatic.css";
import Cart from "../Cart";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { cart, deleteFromCart } = useCart();
  const { user, logout } = useAuth();
  const [isCartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
              {cart.length > 0 && (
                <span className="cart-count">{cart.length}</span>
              )}
            </button>
            <Cart
              delProduct={deleteFromCart}
              cartItems={cart}
              isOpen={isCartOpen}
              onClose={() => setCartOpen(false)}
            />
          </li>
          <li>
            {user ? (
              <>
                <span className="user-info">Hola, {user.username}</span>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="link">
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
