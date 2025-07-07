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
  };

  return (
    <>
      <Header />
      <AddProduct onProductAdded={fetchProducts} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <ProductList
        products={products}
        loading={loading}
        isAdmin={true}
        onDelete={(id) => setDeleteId(id)}
        onEdit={(product) => setEditProduct(product)}
      />
      {deleteId && (
        <div className="modal">
          <div className="modal-content">
            <p>¿Seguro que deseas eliminar este producto?</p>
            <button onClick={() => handleDelete(deleteId)}>Sí, eliminar</button>
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
