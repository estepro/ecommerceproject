import React from "react";
import Header from "../components/static/Header";
import Footer from "../components/static/Footer";
import ProductList from "../components/ProductList";
import loadingImg from "../assets/loading.svg";

const ProductsGallery = ({ products, loading, error }) => {
  return (
    <>
      <Header />
      <h1>Galería de productos</h1>
      {error && <p style={{ color: "red" }}>Error al cargar los productos.</p>}
      {loading ? (
        <img src={loadingImg} alt="loading" className="spinner" />
      ) : (
        <ProductList products={products} />
      )}

      <Footer />
    </>
  );
};

export default ProductsGallery;
