import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "./static/stylestatic.css";

const ProductCard = ({ product, isAdmin, onEdit, onDelete }) => {
  const { addToCart } = useCart();
  const [cantidad, setCantidad] = useState(1);

  const increase = () => {
    if (cantidad < product.stock) {
      setCantidad(cantidad + 1);
    } else {
      toast.warn("No hay más stock disponible.");
    }
  };

  const decrease = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < cantidad; i++) {
      addToCart(product);
    }
    toast.success(`${cantidad} x ${product.nombre} agregado(s) al carrito!`);
    setCantidad(1);
  };

  return (
    <div className="col">
      <div className="card h-100 shadow-sm product-card">
        <div className="product-card-img-container">
          <img
            src={product.imagen}
            className="card-img-top product-card-img"
            alt={product.nombre}
          />
          {isAdmin && (
            <div className="admin-buttons-overlay">
              <button
                className="btn btn-light btn-sm"
                onClick={() => onEdit(product)}
                title="Editar Producto"
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(product.id)}
                title="Eliminar Producto"
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          )}
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title fw-bold">{product.nombre}</h5>
          <p className="card-text text-muted flex-grow-1">
            {product.descripcion.substring(0, 60)}...
          </p>
          <p className="card-text fs-4 fw-bolder text-primary mb-2">
            ${product.precio}
          </p>
          <p className="text-muted small mb-3">Stock: {product.stock}</p>

          {isAdmin ? (
            <div className="mt-auto text-center text-muted small fst-italic">
              Modo Administrador
            </div>
          ) : (
            <div className="mt-auto">
              <div className="d-flex justify-content-center align-items-center mb-3">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={decrease}
                  disabled={cantidad <= 1}
                >
                  -
                </button>
                <span className="mx-3 fw-bold fs-5">{cantidad}</span>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={increase}
                  disabled={cantidad >= product.stock}
                >
                  +
                </button>
              </div>
              <button
                className="btn btn-outline-primary w-100"
                onClick={handleAddToCart}
              >
                <i className="fa-solid fa-cart-plus me-2"></i>
                Agregar al Carrito
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
