import React from "react";
import Products from "./Products";

const ProductList = ({ products = [], isAdmin = false, onDelete, onEdit }) => {
  const safeProducts = Array.isArray(products) ? products : [];
  return (
    <div className="container">
      <h2 className="my-4 text-center">Galería de Productos</h2>
      <div className="row">
        {safeProducts.map((product) => (
          <div
            key={product.id}
            className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
          >
            <div className="position-relative h-100">
              <Products product={product} />
              {isAdmin && (
                <div style={{ position: "absolute", top: 8, right: 8 }}>
                  <button
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => onDelete(product.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => onEdit(product)}
                  >
                    Editar
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
