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
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-dark text-white">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Mi E-commerce
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-controls="navbarNav"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse${menuOpen ? " show" : ""}`}
            id="navbarNav"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/about"
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/products"
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Productos
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/contact"
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Contacto
                </Link>
              </li>
              {user && user.username === "admin" && (
                <li className="nav-item">
                  <Link
                    to="/admin"
                    className="nav-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    Admin
                  </Link>
                </li>
              )}
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-item me-2">
                <button
                  className="btn btn-outline-light position-relative"
                  onClick={() => setCartOpen(true)}
                >
                  <i className="fa-solid fa-cart-shopping"></i>
                  {cart.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cart.length}
                    </span>
                  )}
                </button>
                <Cart
                  delProduct={deleteFromCart}
                  cartItems={cart}
                  isOpen={isCartOpen}
                  onClose={() => setCartOpen(false)}
                />
              </li>
              <li className="nav-item">
                {user ? (
                  <>
                    <span className="me-2">Hola, {user.username}</span>
                    <button
                      className="btn btn-sm btn-outline-light"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="btn btn-sm btn-outline-light">
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
