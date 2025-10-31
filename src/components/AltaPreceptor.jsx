import React, { useState } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

import BotonRedirigir from "../components/BotonRedirigir";
import "../css/AltaPreceptor.css";
const AltaPreceptor = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setExito("");

    if (!nombre || !apellido || !email) {
      setError("Por favor completa todos los campos.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "usuarios"), {
        nombre,
        apellido,
        email,
        rol: "preceptor",
      });

      await addDoc(collection(db, "preceptores"), {
        id: docRef.id,
        nombre,
        apellido,
        email,
      });

      setExito("Preceptor agregado correctamente.");
      setNombre("");
      setApellido("");
      setEmail("");
    } catch (error) {
      console.error("Error agregando preceptor:", error);
      setError("Ocurrió un error al agregar el preceptor.");
    }
  };

  return (
    <div className="registro-container">
      <form onSubmit={handleSubmit}>
        <h1>Alta de Preceptor</h1>

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

        <button type="submit" className="btn-registrar">
          Agregar Preceptor
        </button>

        {error && <p className="mensaje-error">{error}</p>}
        {exito && <p className="mensaje-exito">{exito}</p>}

        <div className="volver-panel">
          <BotonRedirigir textoBoton="Ir a Panel Admin" ruta="/menuprincipal" />
        </div>
      </form>
    </div>
  );
};

export default AltaPreceptor;
