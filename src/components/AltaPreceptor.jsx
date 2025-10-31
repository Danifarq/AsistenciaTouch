import React, { useState } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import '../css/AdminMenu.css';

const AltaPreceptor = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !apellido || !email) {
      alert("Por favor completa todos los campos.");
      return;
    }

    try {
      await addDoc(collection(db, "usuarios"), {
        nombre,
        apellido,
        email,
        rol: "preceptor",
      });
      alert("Preceptor agregado correctamente.");
      setNombre("");
      setApellido("");
      setEmail("");
    } catch (error) {
      console.error("Error agregando preceptor:", error);
      alert("Ocurrió un error al agregar el preceptor.");
    }
  };

  return (
    <div className="admin-container">
      <h1>Alta de Preceptor</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="btn-verde">Agregar Preceptor</button>
      </form>
    </div>
  );
};

export default AltaPreceptor;
