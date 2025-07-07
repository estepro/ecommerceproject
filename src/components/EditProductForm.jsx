import React, { useState } from "react";

const EditProductForm = ({ product, onCancel, onSave }) => {
  const [form, setForm] = useState({ ...product });
  const [error, setError] = useState("");
  const [loadingAction, setLoadingAction] = useState(false);

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
    setLoadingAction(true);
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      setLoadingAction(false);
      return;
    }
    setError("");

    try {
      const { id, ...body } = form;
      const response = await fetch(
        `https://686af2f6e559eba9087136fe.mockapi.io/api/v1/products/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      if (!response.ok) throw new Error("Error al editar producto");
      onSave();
    } catch (err) {
      console.error("Error al editar producto:", err);
      setError("No se pudo editar el producto.");
    }
    setLoadingAction(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Editar Producto</h2>
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
      <button type="submit" disabled={loadingAction}>
        {loadingAction ? "Guardando..." : "Guardar cambios"}
      </button>
      <button type="button" onClick={onCancel} style={{ marginLeft: 10 }}>
        Cancelar
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default EditProductForm;
