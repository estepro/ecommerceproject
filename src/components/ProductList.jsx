import React from "react";
import Products from "./Products";

const ProductList = ({ products = [] }) => {
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
          <Products key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductList;
