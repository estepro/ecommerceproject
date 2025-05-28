import React, { useState } from "react";
import "./styleProducts.css";

const Products = ({ product, addToCart }) => {
  const [cantidad, setCantidad] = useState(1);

  const increase = () =>
    setCantidad((prev) => (prev < product.stock ? prev + 1 : prev));
  const decrease = () => setCantidad((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <section className="card">
      <div className="imageContainer">
        <img src={product.imagen} alt="" className="image" />
      </div>

      <h3 className="name">{product.nombre}</h3>
      <p className="prize">${product.precio}</p>
      <p className="stock">{product.stock}</p>

      <div className="qtyContainer">
        <button className="qtyButton" onClick={decrease}>
          -
        </button>
        <span>{cantidad}</span>
        <button className="qtyButton" onClick={increase}>
          +
        </button>
      </div>

      <button onClick={() => addToCart(product)}>Agregar al carrito</button>
    </section>
  );
};

export default Products;
