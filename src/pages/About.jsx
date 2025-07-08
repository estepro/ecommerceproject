import React from "react";
import Header from "../components/static/Header";
import Footer from "../components/static/Footer";

const About = () => {
  return (
    <>
      <Header />
      <main>
        <section className="bg-light py-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6 mb-4 mb-md-0">
                <img
                  src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80"
                  alt="Edificio empresa de tecnología"
                  className="img-fluid rounded shadow"
                  style={{ maxHeight: 340, objectFit: "cover" }}
                />
              </div>
              <div className="col-md-6">
                <h1 className="fw-bold mb-3">Sobre Nosotros</h1>
                <p className="lead">
                  Somos <strong>TechStore</strong>, una empresa argentina líder
                  en la venta de hardware y componentes para PC. Desde 2010, nos
                  especializamos en ofrecer productos de última generación,
                  asesoramiento personalizado y el mejor soporte post-venta para
                  entusiastas, gamers y profesionales de la tecnología.
                </p>
                <p>
                  Nuestro catálogo incluye placas de video, procesadores,
                  memorias, almacenamiento, periféricos y mucho más. Trabajamos
                  con las marcas más reconocidas del mercado y garantizamos
                  envíos a todo el país.
                </p>
                <p>
                  En <strong>TechStore</strong> creemos en la innovación, la
                  confianza y la pasión por la tecnología. ¡Gracias por
                  elegirnos para potenciar tu experiencia digital!
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
