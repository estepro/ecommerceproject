import React from "react";
import Header from "../components/static/Header";
import Footer from "../components/static/Footer";
import ProductBrowser from "../components/ProductBrowser";
import loadingImg from "../assets/loading.svg";

const ProductsGallery = ({ products, loading, error }) => {
  return (
    <>
      <Header />
      <main>
        <section className="bg-primary text-white py-5 mb-4">
          <div className="container text-center">
            <h1 className="display-5 fw-bold mb-3">Galería de Productos</h1>
            <p className="lead mb-0">
              Descubrí nuestra selección de hardware, componentes y periféricos
              de las mejores marcas. ¡Todo lo que tu PC necesita, en un solo
              lugar!
            </p>
          </div>
        </section>
        <section>
          <div className="container">
            {error && (
              <p className="text-danger text-center fs-5">
                Error al cargar los productos.
              </p>
            )}
            {loading ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: 200 }}
              >
                <img
                  src={loadingImg}
                  alt="loading"
                  className="spinner"
                  style={{ width: 64, height: 64 }}
                />
              </div>
            ) : (
              <ProductBrowser products={products} />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ProductsGallery;
