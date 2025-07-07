import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import ProductsGallery from "./pages/ProductsGallery";
import Contacts from "./pages/Contacts";
import NotFound from "./pages/NotFound";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import AddProductPage from "./pages/AddProductPage";
import Admin from "./pages/Admin";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://686af2f6e559eba9087136fe.mockapi.io/api/v1/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <Home products={products} loading={loading} error={error} />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
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
            <Route path="/contact" element={<Contacts />} />
            <Route path="/add-product" element={<AddProductPage />} />
            <Route
              path="/admin"
              element={
                <PrivateRoute onlyAdmin>
                  <Admin />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
