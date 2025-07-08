import React from "react";
import "./styleCart.css";
import { useCart } from "../context/CartContext";
import { BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";

const Cart = ({ isOpen, onClose }) => {
  const { cart, deleteFromCart, clearCart } = useCart();

  // Agrupa productos y cuenta las cantidades
  const processedCart = cart.reduce((acc, product) => {
    const existingProduct = acc.find((p) => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      acc.push({ ...product, quantity: 1 });
    }
    return acc;
  }, []);

  const total = processedCart.reduce(
    (sum, item) => sum + item.precio * item.quantity,
    0
  );

  const handleFinalizePurchase = () => {
    toast.success("¡Compra finalizada con éxito! Gracias por elegirnos.");
    clearCart();
    onClose();
  };

  return (
    <>
      <div
        className={`cart-overlay ${isOpen ? "open" : ""}`}
        onClick={onClose}
      ></div>
      <div className={`cart-drawer ${isOpen ? "open" : ""} text-dark`}>
        <div className="cart-header">
          <h4 className="mb-0">Carrito de Compras</h4>
          <button onClick={onClose} className="btn-close"></button>
        </div>
        <div className="cart-content">
          {processedCart.length === 0 ? (
            <div className="text-center p-5 d-flex flex-column justify-content-center h-100">
              <p className="lead mb-3">El carrito está vacío.</p>
              <button className="btn btn-primary" onClick={onClose}>
                Seguir comprando
              </button>
            </div>
          ) : (
            <ul className="list-group list-group-flush">
              {processedCart.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex align-items-center"
                >
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    className="cart-item-img me-3"
                  />
                  <div className="flex-grow-1">
                    <h6 className="my-0 small">{item.nombre}</h6>
                    <small className="text-muted">
                      {item.quantity} &times; ${item.precio}
                    </small>
                  </div>
                  <span className="fw-bold me-3">
                    ${(item.precio * item.quantity).toFixed(2)}
                  </span>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => deleteFromCart(item)}
                  >
                    <BsTrash />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {processedCart.length > 0 && (
          <div className="cart-footer">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Total:</h5>
              <h5 className="mb-0 fw-bold">${total.toFixed(2)}</h5>
            </div>
            <div className="d-grid gap-2">
              <button
                className="btn btn-primary"
                onClick={handleFinalizePurchase}
              >
                Finalizar Compra
              </button>
              <button className="btn btn-outline-secondary" onClick={clearCart}>
                Vaciar Carrito
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
