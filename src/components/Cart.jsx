import React from "react";
import "./styleCart.css";
import { useCart } from "../context/CartContext";

const Cart = ({ isOpen, onClose }) => {
  const { cart, deleteFromCart, clearCart } = useCart();

  return (
    <div className={`cart-drawer ${isOpen ? "open" : ""}`}>
      <div className="cart-header">
        <h2 style={{ color: "black" }}>Carrito de Compras</h2>
        <button onClick={onClose} className="close-button">
          X
        </button>
      </div>
      <div className="cart-content">
        {cart.length === 0 ? (
          <p style={{ color: "red" }}>El carrito esta vacío</p>
        ) : (
          <>
          <ul className="cart-item">
            {cart.map((item) => (
              <li key={item.id} style={{ color: "black" }}>
                {item.nombre} - {item.precio} x {item.quantity}
                <button onClick={() => deleteFromCart(item)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
              </li>
            ))}
          </ul>
          <button className="clear-cart-btn" onClick={clearCart}>
              Vaciar carrito
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
