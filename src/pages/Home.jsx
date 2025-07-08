import React from "react";
import Header from "../components/static/Header";
import Footer from "../components/static/Footer";
import loadingsvg from "../assets/loading.svg";
import ProductBrowser from "../components/ProductBrowser";

const Home = ({ products, loading, error }) => {
  return (
    <>
      <Header />
      <main>
        <section className="bg-dark text-white py-5 mb-5">
          <div className="container">
            <div className="row align-items-center flex-column-reverse flex-md-row">
              <div className="col-md-6 text-center text-md-start">
                <h1 className="display-4 fw-bold mb-3">
                  ¡Potenciá tu PC con los{" "}
                  <span className="text-primary">mejores componentes!</span>
                </h1>
                <p className="lead mb-4">
                  Placas de video, procesadores, memorias, almacenamiento y
                  mucho más. Todo lo que tu setup necesita, al mejor precio y
                  con envío a todo el país.
                </p>
                <a href="#productos" className="btn btn-primary btn-lg shadow">
                  Ver productos
                </a>
              </div>
              <div className="col-md-6 mb-4 mb-md-0 text-center">
                <img
                  src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80"
                  alt="Componentes de PC"
                  className="img-fluid rounded shadow"
                  style={{ maxHeight: 320, objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Productos */}
        <section id="productos" className="container py-5">
          <h2 className="text-center mb-4">Nuestros Productos Destacados</h2>
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
                src={loadingsvg}
                alt="loading"
                className="spinner"
                style={{ width: 64, height: 64 }}
              />
            </div>
          ) : (
            <ProductBrowser products={products} />
          )}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;
