// ======================================================
//  GUÍA PARA NUEVOS DESARROLLADORES - AltaProfesor.jsx
// ======================================================

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useProfesores } from "../hooks/useProfesores";
import BotonRedirigir from "../components/BotonRedirigir";
import "../css/AltaProfesor.css";

const AltaProfesor = () => {
  // Hook de profesores - ahora necesitamos también la lista completa
  const { profesores, agregarProfesor, activarProfesor } = useProfesores();

  // Estados locales
  const [nombre, setNombre] = useState("");
  const [materia, setMateria] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Autenticación
  const { user, userRole, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Verificación de rol y login
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        setMensaje("🔒 Debes iniciar sesión para acceder.");
        const timer = setTimeout(() => navigate("/"), 2000);
        return () => clearTimeout(timer);
      }

      if (userRole !== "admin") {
        setMensaje("⚠️ No tenés permisos para acceder.");
        const timer = setTimeout(() => navigate("/"), 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [authLoading, user, userRole, navigate]);

  // Enviar formulario con verificación de existencia
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!nombre.trim() || !materia.trim() || !email.trim()) {
      setMensaje("⚠️ Completa todos los campos");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setMensaje("⚠️ Ingresá un correo válido");
      return;
    }

    try {
      // 🔍 VERIFICACIÓN: Buscar si el profesor ya existe
      // Comparación por email (más confiable que por nombre)
      const profesorExistente = profesores.find(
        (prof) => prof.email.toLowerCase() === email.trim().toLowerCase()
      );

      if (profesorExistente) {
        // El profesor ya existe en la base de datos
        if (!profesorExistente.activo) {
          // ✅ Caso 1: Existe pero está desactivado → ACTIVAR
          await activarProfesor(profesorExistente.id);
          setMensaje("✅ El profesor ya existía y ha sido activado nuevamente");
          
          // Limpiar campos
          setNombre("");
          setMateria("");
          setEmail("");
          
          // Redirigir al perfil del profesor reactivado
          setTimeout(() => {
            navigate(`/profesor/${profesorExistente.id}`);
          }, 1500);
        } else {
          // ⚠️ Caso 2: Ya existe y está activo
          setMensaje("⚠️ Este profesor ya existe y está activo");
        }
      } else {
        // 🆕 Caso 3: No existe → CREAR NUEVO
        const nuevoProfesor = {
          nombre: nombre.trim(),
          materia: materia.trim(),
          email: email.trim(),
          activo: true
        };
        
        const id = await agregarProfesor(nuevoProfesor);
        setMensaje("✅ Profesor agregado correctamente");

        // Limpiar campos
        setNombre("");
        setMateria("");
        setEmail("");

        // Redirigir al perfil del nuevo profesor
        setTimeout(() => {
          navigate(`/profesor/${id}`);
        }, 1500);
      }
    } catch (error) {
      console.error("Error en el proceso:", error);
      setMensaje("❌ Error al guardar el profesor");
    }
  };

  // Render condicional
  if (authLoading) return <p className="mensaje-cargando">Cargando autenticación...</p>;

  if (!user || userRole !== "admin") {
    return (
      <div className="mensaje-redirigiendo">
        <h2>Redirigiendo...</h2>
        <p>{mensaje}</p>
      </div>
    );
  }

  // Render principal
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

// ======================================================
// RESUMEN DE CAMBIOS:
// 
// 1. Se agregó `profesores` y `activarProfesor` al destructuring del hook
// 2. Se implementó verificación de existencia por email antes de crear
// 3. Lógica de casos:
//    - Si existe y está inactivo → activar
//    - Si existe y está activo → mostrar advertencia
//    - Si no existe → crear nuevo
// 4. Se agregó el campo `activo: true` al crear profesor nuevo
// 5. Redirección automática después de 1.5s en casos exitosos
// ======================================================