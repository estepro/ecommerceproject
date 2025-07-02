import React from "react";
import Header from "../components/static/Header";
import Footer from "../components/static/Footer";
import loadingsvg from "../assets/loading.svg";
import ProductList from "../components/ProductList";

const Home = ({ products, loading, error }) => {
  return (
    <>
      <Header />
      <main>
        <h1>Bienvenidos a mi Tienda</h1>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
          voluptate illum molestias, voluptates dolorem rerum. Alias tempore ut
          nisi eum, harum natus velit veritatis ea iste illum facere, ipsam
          modi!
        </p>
        {error && <p style={{ color: "red" }}>Error al cargar los productos.</p>}
        {loading ? (
          <img src={loadingsvg} alt="loading" className="spinner" />
        ) : (
          <ProductList products={products} />
        )}
      </main>

      <Footer />
    </>
  );
};

export default Home;
