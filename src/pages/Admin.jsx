import React, { useState, useEffect } from "react";
import Header from "../components/static/Header";
import Footer from "../components/static/Footer";
import AddProduct from "../components/AddProduct";
import ProductList from "../components/ProductList";
import EditProductForm from "../components/EditProductForm";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editProduct, setEditProduct] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const fetchProducts = () => {
    fetch("https://686af2f6e559eba9087136fe.mockapi.io/api/v1/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    setError("");
    setSuccess("");
    setLoadingDelete(true);
    try {
      const res = await fetch(
        `https://686af2f6e559eba9087136fe.mockapi.io/api/v1/products/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("Error deleting product");
      setSuccess("Producto eliminado correctamente.");
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
      setError("No se pudo eliminar el producto.");
    }
    setDeleteId(null);
    setLoadingDelete(false);
  };

  return (
    <>
      <Header />
      <AddProduct onProductAdded={fetchProducts} />
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(128,128,128,0.2)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="text-center">
            <div
              className="spinner-border text-primary"
              role="status"
              style={{ width: 60, height: 60 }}
            >
              <span className="visually-hidden">Cargando...</span>
            </div>
            <div className="mt-3 text-dark fs-5">Cargando productos...</div>
          </div>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      {!loading && !error && (
        <ProductList
          products={products}
          loading={loading}
          isAdmin={true}
          onDelete={(id) => setDeleteId(id)}
          onEdit={(product) => setEditProduct(product)}
        />
      )}
      {deleteId && (
        <div className="modal">
          <div className="modal-content">
            <p>¿Seguro que deseas eliminar este producto?</p>
            <button
              onClick={() => handleDelete(deleteId)}
              disabled={loadingDelete}
            >
              {loadingDelete ? "Eliminando..." : "Sí, eliminar"}
            </button>
            <button onClick={() => setDeleteId(null)}>Cancelar</button>
          </div>
        </div>
      )}
      {editProduct && (
        <div className="modal">
          <div className="modal-content">
            <EditProductForm
              product={editProduct}
              onCancel={() => setEditProduct(null)}
              onSave={() => {
                setEditProduct(null);
                fetchProducts();
              }}
            />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Admin;
