// ======================================================
//  GUÍA PARA NUEVOS DESARROLLADORES - AltaProfesor.jsx
// ======================================================
//
//  Este componente permite al administrador registrar un nuevo profesor.
// Incluye validaciones de autenticación y rol (solo accesible para admins).
// Los datos se guardan en Firestore a través del hook `useProfesores`.
//
//  DEPENDENCIAS PRINCIPALES:
// - React: manejo del estado, renderizado y efectos.
// - React Router: navegación y redirección (`useNavigate`).
// - useAuth: hook personalizado que gestiona la sesión del usuario actual.
// - useProfesores: hook que encapsula la lógica para agregar profesores.
// - BotonRedirigir: botón reutilizable para volver al panel admin.
// - CSS: define los estilos visuales de la página.
//
// ======================================================

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useProfesores } from "../hooks/useProfesores";
import BotonRedirigir from "../components/BotonRedirigir";
import "../css/AltaProfesor.css";

const AltaProfesor = () => {
  // ----------------------------------------------
  //  Estados locales:
  // - nombre, materia, email → datos del formulario.
  // - mensaje → feedback para el usuario (errores o confirmaciones).
  // ----------------------------------------------
  const [nombre, setNombre] = useState("");
  const [materia, setMateria] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Hooks personalizados y navegación:
  const { agregarProfesor } = useProfesores(); // Agrega profesores a Firestore
  const { user, userRole, loading: authLoading } = useAuth(); // Controla autenticación y rol
  const navigate = useNavigate();

  // ----------------------------------------------
  // useEffect: Verificación de autenticación y rol
  // - Si no hay sesión → redirige al login.
  // - Si el usuario no es admin → redirige a inicio.
  // - Se muestra un mensaje temporal antes de redirigir.
  // ----------------------------------------------
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

  // ----------------------------------------------
  //  handleSubmit:
  // Maneja el envío del formulario de alta.
  // 1️⃣ Valida campos vacíos y formato del email.
  // 2️⃣ Llama a `agregarProfesor` del hook `useProfesores`.
  // 3️⃣ Limpia el formulario y redirige a la página del nuevo profesor.
  // ----------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nombre.trim() || materia.trim() || email.trim() == setProfesores(lista) ) {
      try{ activarProfesor(id); // Activar en "profesores"
      setMensaje("Profesor activado correctamente ✅");
    } catch (error) {
      console.error("Error al activar profesor:", error);
    }
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
      navigate(`/profesor/${id}`); // Redirige al perfil del nuevo profesor
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al guardar el profesor");
    }
  };
}

  // ----------------------------------------------
  // Renderizado condicional:
  // - Si se está verificando la autenticación → muestra mensaje de carga.
  // - Si no hay usuario o no es admin → muestra mensaje de redirección.
  // ----------------------------------------------
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

  // ----------------------------------------------
  // Render principal:
  // Muestra el formulario de alta de profesor y un botón
  // para volver al panel administrativo.
  // ----------------------------------------------
  return (
    <div className="alta-profesor-page">
      <div className="alta-profesor-box">
        <h1 className="alta-profesor-title">Alta de profesor</h1>

        {/* Formulario de registro de profesor */}
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

        {/* Mensaje de validación o confirmación */}
        {mensaje && <p className="mensaje">{mensaje}</p>}

        {/*  Botón para volver al panel admin */}
        <div className="volver-panel">
          <BotonRedirigir textoBoton="Ir a Panel Admin" ruta="/menuprincipal" />
        </div>
      </div>
    </div>
  );
};

export default AltaProfesor;

// ======================================================
//  RESUMEN:
// Este componente está destinado al alta (registro) de profesores.
// Valida la sesión, restringe acceso solo a administradores,
// realiza validaciones de formulario y utiliza el hook `useProfesores`
// para guardar los datos en Firestore.
//
//  Archivos relacionados:
// - useProfesores.js → lógica para crear profesores.
// - useAuth.js → controla login, rol y permisos.
// - BotonRedirigir.jsx → navegación reutilizable.
// - AltaProfesor.css → estilos de esta vista.
//
// ======================================================
