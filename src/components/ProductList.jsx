import React, { useState } from "react";
import Products from "./Products";
import { FaTrash, FaEdit, FaSearch } from "react-icons/fa";

const ProductList = ({ products = [], isAdmin = false, onDelete, onEdit }) => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const safeProducts = Array.isArray(products) ? products : [];
  const filteredProducts = safeProducts.filter(
    (product) =>
      product.nombre.toLowerCase().includes(search.toLowerCase()) ||
      product.categoria.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIdx = (currentPage - 1) * productsPerPage;
  const endIdx = startIdx + productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIdx, endIdx);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </div>
      <div className="row">
        {paginatedProducts.length === 0 && (
          <div className="col-12 text-center text-muted py-5">
            No se encontraron productos.
          </div>
        )}
        {paginatedProducts.map((product) => (
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
      {totalPages > 1 && (
        <nav className="d-flex justify-content-center my-4">
          <ul className="pagination">
            <li className={`page-item${currentPage === 1 ? " disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &laquo;
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li
                key={i + 1}
                className={`page-item${currentPage === i + 1 ? " active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item${
                currentPage === totalPages ? " disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                &raquo;
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default ProductList;
