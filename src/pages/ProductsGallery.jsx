import React from "react";
import Header from "../components/static/Header";
import Footer from "../components/static/Footer";
import ProductList from "../components/ProductList";
import loadingsvg from "../assets/loading.svg";

const ProductsGallery = ({
  cart,
  products,
  loading,
  addToCart,
  delProduct,
}) => {
  return (
    <>
      <Header delProduct={delProduct} cartItems={cart} />
      <h1>Galeria de productos</h1>
      {loading ? (
        <img src={loadingsvg} alt="loading" className="spinner" />
      ) : (
        <ProductList addToCart={addToCart} products={products} />
      )}

      <Footer />
    </>
  );
};

export default ProductsGallery;
