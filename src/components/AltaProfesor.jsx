import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useProfesores } from "../hooks/useProfesores";
import BotonRedirigir from "../components/BotonRedirigir";
import "../css/AltaProfesor.css";

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
      if (!user) {
        setMensaje("🔒 Debes iniciar sesión para acceder a esta sección.");
        const timer = setTimeout(() => navigate("/"), 2000);
        return () => clearTimeout(timer);
      }

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
      setMensaje("⚠️ Completa todos los campos");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setMensaje("⚠️ Ingresá un correo válido");
      return;
    }

    try {
      const id = await agregarProfesor({ nombre, materia, email });
      setMensaje("✅ Profesor agregado correctamente");
      setNombre("");
      setMateria("");
      setEmail("");
      navigate(`/profesor/${id}`);
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al guardar el profesor");
    }
  };

  if (authLoading)
    return <p className="mensaje-cargando">Cargando autenticación...</p>;

  if (!user || userRole !== "admin") {
    return (
      <div className="mensaje-redirigiendo">
        <h2>Redirigiendo...</h2>
        <p>{mensaje}</p>
      </div>
    );
  }

  return (
    <div className="alta-profesor-page">
      <div className="alta-profesor-box">
        <h1 className="alta-profesor-title">Alta de profesor</h1>
        <form onSubmit={handleSubmit} className="alta-profesor-form">
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

        {mensaje && <p className="mensaje">{mensaje}</p>}

        <div className="volver-panel">
          <BotonRedirigir textoBoton="Ir a Panel Admin" ruta="/menuprincipal" />
        </div>
      </div>
    </div>
  );
};

export default AltaProfesor;
