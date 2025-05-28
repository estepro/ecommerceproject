import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import ProductsGallery from "./pages/ProductsGallery";
import Contacts from "./pages/Contacts";
import NotFound from "./pages/NotFound";

function App() {
  const [cart, setCart] = useState([]);
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

  const handleAddToCart = (product) => {
    const productInCart = cart.find((item) => item.id === product.id);
    if (productInCart) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleDeleteFromCart = (product) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === product.id) {
            if (item.quantity > 1) {
              return { ...item, quantity: item.quantity - 1 };
            } else {
              return null; // Si quantity es 1, marcamos para eliminar
            }
          } else {
            return item; // Si no es el producto, lo dejamos igual
          }
        })
        .filter((item) => item !== null); // Quitamos los productos nulos
    });
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              delProduct={handleDeleteFromCart}
              addToCart={handleAddToCart}
              cart={cart}
              products={products}
              loading={loading}
              error={error}
            />
          }
        />

        <Route
          path="/about"
          element={<About delProduct={handleDeleteFromCart} cart={cart} />}
        />

        <Route
          path="/products"
          element={
            <ProductsGallery
              delProduct={handleDeleteFromCart}
              addToCart={handleAddToCart}
              cart={cart}
              products={products}
              loading={loading}
              error={error}
            />
          }
        />

        <Route
          path="/contact"
          element={<Contacts delProduct={handleDeleteFromCart} cart={cart} />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
