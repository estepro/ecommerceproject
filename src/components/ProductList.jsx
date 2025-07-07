import React from "react";
import Products from "./Products";

const ProductList = ({ products = [], isAdmin = false, onDelete, onEdit }) => {
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
          <div key={product.id} style={{ position: "relative" }}>
            <Products product={product} />
            {isAdmin && (
              <>
                <button
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    background: "#e74c3c",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "4px 8px",
                    cursor: "pointer",
                    marginLeft: "4px",
                  }}
                  onClick={() => onDelete(product.id)}
                >
                  Eliminar
                </button>
                <button
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 70,
                    background: "#2980b9",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "4px 8px",
                    cursor: "pointer",
                  }}
                  onClick={() => onEdit(product)}
                >
                  Editar
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductList;
