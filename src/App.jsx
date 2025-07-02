import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import ProductsGallery from "./pages/ProductsGallery";
import Contacts from "./pages/Contacts";
import NotFound from "./pages/NotFound";
import { CartProvider } from "./context/CartContext";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/data/data.json")
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          setProducts(data);
          setLoading(false);
        }, 2000);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
        setLoading(false);
        setError(true);
      });
  }, []);

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                products={products}
                loading={loading}
                error={error}
              />
            }
          />
          <Route
            path="/about"
            element={<About />}
          />
          <Route
            path="/products"
            element={
              <ProductsGallery
                products={products}
                loading={loading}
                error={error}
              />
            }
          />
          <Route
            path="/contact"
            element={<Contacts />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
