import React from "react";
import "./styleCart.css";

const Cart = ({ cartItems, isOpen, onClose, delProduct }) => {
  return (
    <div className={`cart-drawer ${isOpen ? "open" : ""}`}>
      <div className="cart-header">
        <h2 style={{ color: "black" }}>Carrito de Compras</h2>
        <button onClick={onClose} className="close-button">
          X
        </button>
      </div>
      <div className="cart-content">
        {cartItems.length === 0 ? (
          <p style={{ color: "red" }}>El carrito esta vacío</p>
        ) : (
          <ul className="cart-item">
            {cartItems.map((item) => (
              <li key={item.id} style={{ color: "black" }}>
                {item.nombre} - {item.precio}
                <button onClick={() => delProduct(item)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Cart;
