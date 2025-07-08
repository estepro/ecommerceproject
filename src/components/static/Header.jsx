import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./stylestatic.css";
import Cart from "../Cart";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const [isCartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-dark text-white shadow-sm sticky-top">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand fs-4 fw-bold" to="/">
            <span className="text-primary">Tech</span>Store
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
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Inicio
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/about"
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Sobre Nosotros
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/products"
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Productos
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/contact"
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Contacto
                </NavLink>
              </li>
              {user && user.username === "admin" && (
                <li className="nav-item">
                  <NavLink
                    to="/admin"
                    className="nav-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    Admin
                  </NavLink>
                </li>
              )}
            </ul>
            <div className="d-flex align-items-center">
              <button
                className="btn btn-outline-primary position-relative me-3"
                onClick={() => setCartOpen(true)}
              >
                <i className="fa-solid fa-cart-shopping"></i>
                {cart.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cart.length}
                    <span className="visually-hidden">items in cart</span>
                  </span>
                )}
              </button>
              <Cart isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
              {user ? (
                <div className="d-flex align-items-center">
                  <span className="navbar-text me-2">
                    Hola, {user.username}
                  </span>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" className="btn btn-sm btn-primary">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
