import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProteccionRutas = ({ children, roleRequired }) => {
  const { user, userRole, loading } = useAuth();
  const [mensaje, setMensaje] = useState("");
  const [redirigir, setRedirigir] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        setMensaje("🔒 Debes iniciar sesión para acceder.");
        setTimeout(() => setRedirigir(true), 2000);
      } else if (roleRequired && userRole !== roleRequired) {
        setMensaje("⚠️ No tenés permisos para acceder a esta sección.");
        setTimeout(() => setRedirigir(true), 2000);
      }
    }
  }, [user, userRole, roleRequired, loading]);

  if (loading) return <div>Cargando...</div>;

  // Muestra mensaje antes de redirigir
  if (mensaje && !redirigir) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2>Redirigiendo...</h2>
        <p style={{ fontSize: "1.2rem" }}>{mensaje}</p>
      </div>
    );
  }

  if (redirigir) {
    // Si no está logueado, va al login
    if (!user) return <Navigate to="/login" />;
    // Si está logueado pero sin permisos, va al inicio
    if (roleRequired && userRole !== roleRequired) return <Navigate to="/inicio" />;
  }

  // Si pasa todos los chequeos
  return children;
};

export default ProteccionRutas;
