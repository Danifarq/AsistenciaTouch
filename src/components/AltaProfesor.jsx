import React, { useState } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
const AltaProfesor = () => {
  const [nombre, setNombre] = useState("");
  const [materia, setMateria] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !materia || !email) {
      setMensaje("Por favor, completá todos los campos.");
      return;
    }
      try {
      await addDoc(collection(db, "profesores"), {
        nombre,
        materia,
        email,
      });
      setMensaje("Profesor agregado con éxito");
      setNombre("");
      setMateria("");
      setEmail("");
    } catch (error) {
      console.error("Error al guardar profesor:", error);
      setMensaje("Ocurrió un error al guardar los datos");
    }
  };
  return (
    <div>
      <h2>Alta de Profesor</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Materia"
          value={materia}
          onChange={(e) => setMateria(e.target.value)}
        />
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Guardar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default AltaProfesor;