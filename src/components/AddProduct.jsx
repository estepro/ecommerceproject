import React, { useState } from "react";

const initialState = {
  nombre: "",
  precio: "",
  descripcion: "",
  stock: "",
  imagen: "",
  categoria: "",
};

const AddProduct = ({ onProductAdded }) => {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    if (!form.nombre.trim()) return "El nombre es obligatorio.";
    if (Number(form.precio) <= 0) return "El precio debe ser mayor a 0.";
    if (form.descripcion.trim().length < 10)
      return "La descripción debe tener al menos 10 caracteres.";
    if (Number(form.stock) < 0) return "El stock no puede ser negativo.";
    if (!form.imagen.trim()) return "La URL de la imagen es obligatoria.";
    if (!form.categoria.trim()) return "La categoría es obligatoria.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");

    const url = "https://686af2f6e559eba9087136fe.mockapi.io/api/v1/products";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.nombre,
          precio: Number(form.precio),
          descripcion: form.descripcion,
          stock: Number(form.stock),
          imagen: form.imagen,
          categoria: form.categoria,
        }),
      });
      if (!response.ok) throw new Error("Error al agregar producto");
      setForm(initialState);
      if (onProductAdded) onProductAdded();
      alert("Producto agregado correctamente");
    } catch (err) {
      console.error("Error al agregar producto:", err);
      setError("No se pudo agregar el producto.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: 400, margin: "2rem auto" }}
    >
      <h2>Agregar Producto</h2>
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={handleChange}
        required
        style={{ display: "block", width: "100%", marginBottom: 10 }}
      />
      <input
        type="number"
        name="precio"
        placeholder="Precio"
        value={form.precio}
        onChange={handleChange}
        required
        min={1}
        style={{ display: "block", width: "100%", marginBottom: 10 }}
      />
      <textarea
        name="descripcion"
        placeholder="Descripción"
        value={form.descripcion}
        onChange={handleChange}
        required
        minLength={10}
        style={{ display: "block", width: "100%", marginBottom: 10 }}
      />
      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={form.stock}
        onChange={handleChange}
        required
        min={0}
        style={{ display: "block", width: "100%", marginBottom: 10 }}
      />
      <input
        type="text"
        name="imagen"
        placeholder="URL de la imagen"
        value={form.imagen}
        onChange={handleChange}
        required
        style={{ display: "block", width: "100%", marginBottom: 10 }}
      />
      <input
        type="text"
        name="categoria"
        placeholder="Categoría"
        value={form.categoria}
        onChange={handleChange}
        required
        style={{ display: "block", width: "100%", marginBottom: 10 }}
      />
      <button type="submit">Agregar</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default AddProduct;
