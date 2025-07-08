import React, { useState } from "react";
import Products from "./Products";
import { FaTrash, FaEdit, FaSearch } from "react-icons/fa";

const ProductList = ({ products = [], isAdmin = false, onDelete, onEdit }) => {
  const [search, setSearch] = useState("");
  const safeProducts = Array.isArray(products) ? products : [];
  const filteredProducts = safeProducts.filter(
    (product) =>
      product.nombre.toLowerCase().includes(search.toLowerCase()) ||
      product.categoria.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="container">
      <h2 className="my-4 text-center">Galería de Productos</h2>
      <div className="row mb-4">
        <div className="col-12 col-md-6 mx-auto">
          <div className="input-group">
            <span className="input-group-text">
              <FaSearch />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nombre o categoría..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="row">
        {filteredProducts.length === 0 && (
          <div className="col-12 text-center text-muted py-5">
            No se encontraron productos.
          </div>
        )}
        {filteredProducts.map((product) => (
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
                    title="Eliminar"
                  >
                    <FaTrash />
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => onEdit(product)}
                    title="Editar"
                  >
                    <FaEdit />
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
