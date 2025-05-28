import React from "react";
import Products from "./Products";

const ProductList = ({ products = [], addToCart }) => {
  const safeProducts = Array.isArray(products) ? products : [];
  return (
    <>
      <h2>Galería de Productos</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {safeProducts.map((product) => (
          <Products key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </>
  );
};

export default ProductList;
