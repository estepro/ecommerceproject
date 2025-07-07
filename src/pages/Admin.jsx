import React, { useState, useEffect } from "react";
import Header from "../components/static/Header";
import Footer from "../components/static/Footer";
import AddProduct from "../components/AddProduct";
import ProductList from "../components/ProductList";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      <Header />
      <AddProduct onProductAdded={fetchProducts} />
      <ProductList products={products} loading={loading} />
      <Footer />
    </>
  );
};

export default Admin;
