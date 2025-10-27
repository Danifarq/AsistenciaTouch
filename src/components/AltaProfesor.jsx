import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; 
import { useProfesores } from "../hooks/useProfesores";

const AltaProfesor = () => {
  const [nombre, setNombre] = useState("");
  const [materia, setMateria] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const { agregarProfesor } = useProfesores();
  const { user, userRole, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading) {
      // si el usuario no está logueado
      if (!user) {
        setMensaje("🔒 Debes iniciar sesión para acceder a esta sección.");
        const timer = setTimeout(() => navigate("/"), 2000);
        return () => clearTimeout(timer);
      }

      // si el usuario no es admin
      if (userRole !== "admin") {
        setMensaje("⚠️ No tenés permisos para acceder a esta sección.");
        const timer = setTimeout(() => navigate("/"), 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [authLoading, user, userRole, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre.trim() || !materia.trim() || !email.trim()) {
      setMensaje("Completa todos los campos");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setMensaje("Ingresá un correo válido");
      return;
    }

    try {
      const id = await agregarProfesor({ nombre, materia, email });
      setMensaje("Profesor agregado correctamente ✅");
      setNombre("");
      setMateria("");
      setEmail("");
      navigate(`/profesor/${id}`);
    } catch (error) {
      console.error(error);
      setMensaje("Error al guardar profesor ❌");
    }
  };

  // Mientras carga el auth
  if (authLoading) return <p>Cargando autenticación...</p>;

  // Si no hay usuario o no es admin, muestra mensaje (NO renderiza el formulario)
  if (!user || userRole !== "admin") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          textAlign: "center",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2>Redirigiendo...</h2>
        <p style={{ fontSize: "1.2rem" }}>{mensaje}</p>
      </div>
    );
  }

  // Render si es admin
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
        <button type="submit">Guardar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default AltaProfesor;
