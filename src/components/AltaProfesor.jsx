import React, { useState } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; 
import { useAuth } from "../hooks/useAuth";

const AltaProfesor = () => {
  const { user, userRole, loading } = useAuth();
  const [nombre, setNombre] = useState("");
  const [materia, setMateria] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [guardando, setGuardando] = useState(false);
  const navigate = useNavigate();

  if (loading) return <div>Cargando...</div>;
  if (!user || userRole !== 'admin') return <div>No tenés permiso para ver esta página.</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !materia || !email) {
      setMensaje("Por favor, completá todos los campos.");
      return;
    }
    try {
      setGuardando(true);
      const docRef = await addDoc(collection(db, "profesores"), {
        nombre,
        materia,
        email,
      });

      setMensaje("Profesor agregado con éxito.");
      setNombre("");
      setMateria("");
      setEmail("");

      setTimeout(() => {
        navigate(`/profesor/${docRef.id}`);
      }, 1000);
    } catch (error) {
      console.error("Error al guardar profesor:", error);
      setMensaje("Ocurrió un error al guardar los datos.");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="p-4">
      <h2>Alta de Profesor</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
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

        <button type="submit" disabled={guardando}>
          {guardando ? "Guardando..." : "Guardar"}
        </button>

        <button type="button" onClick={() => navigate("/lista-profesores")}>
          Volver a la lista
        </button>
      </form>

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default AltaProfesor;
