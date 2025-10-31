// ======================================================
// 🧭 GUÍA PARA NUEVOS DESARROLLADORES - AdminMenu.jsx
// ======================================================
//
// 📌 Este componente muestra el panel principal del administrador.
// Desde aquí se gestionan materias, cursos, profesores, preceptores
// y los roles de los usuarios.
//
// 🔗 DEPENDENCIAS PRINCIPALES:
// - React: para manejar el estado y el renderizado del componente.
// - Firebase Firestore: para actualizar roles de usuarios.
// - BotonRedirigir: componente reutilizable para navegar entre páginas.
// - CSS: estilos del menú de administración.
//
// ======================================================

import React, { useState, useEffect } from "react";
import BotonRedirigir from "../components/BotonRedirigir";
import { db } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import '../css/AdminMenu.css';

const AdminMenu = ({ usuarios = [] }) => {
  // ----------------------------------------------
  // Estado local para almacenar los roles
  // roles = { userId: "rol" }
  // ----------------------------------------------
  const [roles, setRoles] = useState({});

  // ----------------------------------------------
  // useEffect:
  // Cuando se cargan los usuarios, inicializa los roles
  // Si un usuario no tiene rol definido, se le asigna "profe" por defecto.
  // ----------------------------------------------
  useEffect(() => {
    if (!usuarios || usuarios.length === 0) return;

    const initialRoles = usuarios.reduce((acc, user) => {
      acc[user.id] = user.rol || "profe";
      return acc;
    }, {});

    setRoles(initialRoles);
  }, [usuarios]);

  // ----------------------------------------------
  // handleRoleChange:
  // Se ejecuta cuando el admin cambia el rol desde el select.
  // Actualiza el estado local de roles.
  // ----------------------------------------------
  const handleRoleChange = (userId, nuevoRol) => {
    setRoles((prev) => ({ ...prev, [userId]: nuevoRol }));
  };

  // ----------------------------------------------
  // guardarRoles:
  // Recorre todos los usuarios y compara si el rol cambió.
  // Si hay cambios, los actualiza en Firestore.
  // Muestra alertas en caso de éxito o error.
  // ----------------------------------------------
  const guardarRoles = async () => {
    try {
      for (const user of usuarios) {
        const nuevoRol = roles[user.id];
        if (nuevoRol !== user.rol) {
          const userRef = doc(db, "usuarios", user.id);
          await updateDoc(userRef, { rol: nuevoRol });
        }
      }
      alert("Roles actualizados correctamente.");
    } catch (error) {
      console.error("Error actualizando roles:", error);
      alert("Ocurrió un error al actualizar roles.");
    }
  };

  // ----------------------------------------------
  //  Renderizado principal:
  // Estructura visual del menú admin.
  // Se divide en secciones:
  // 1️⃣ Gestión de materias
  // 2️⃣ Gestión de profesores y preceptores
  // 3️⃣ Gestión de cursos
  // 4️⃣ Lista de usuarios y roles
  // ----------------------------------------------
  return (
    <div className="admin-container">
      <h1 className="welcome-title">Bienvenido Admin</h1>

      {/* ------------------------------------------ */}
      {/* SECCIÓN: Gestión de Materias */}
      {/* ------------------------------------------ */}
      <div className="section">
        <h2>Gestión de materias</h2>
        <div className="button-row">
          <BotonRedirigir textoBoton="Agregar Materia" ruta="/alta-materia" className="btn-verde" />
          <BotonRedirigir textoBoton="Eliminar Materia" ruta="/baja-materia" className="btn-rojo" />
        </div>
      </div>

      {/* ------------------------------------------ */}
      {/* SECCIÓN: Gestión de Profesores y Preceptores */}
      {/* ------------------------------------------ */}
      <div className="section">
        <h2>Gestión de profesores y preceptores</h2>
        <div className="button-row">
          <BotonRedirigir textoBoton="Agregar Profesor" ruta="/alta-profesor" className="btn-verde" />
          <BotonRedirigir textoBoton="Eliminar Profesor" ruta="/baja-profesor" className="btn-rojo" />
          <BotonRedirigir textoBoton="Agregar Preceptor" ruta="/alta-preceptor" className="btn-verde" />
          <BotonRedirigir textoBoton="Eliminar Preceptor" ruta="/baja-preceptor" className="btn-rojo" />
        </div>
      </div>

      {/* ------------------------------------------ */}
      {/* SECCIÓN: Gestión de Cursos */}
      {/* ------------------------------------------ */}
      <div className="section">
        <h2>Gestión de cursos</h2>
        <div className="button-row">
          <BotonRedirigir textoBoton="Agregar Curso" ruta="/alta-curso" className="btn-verde" />
          <BotonRedirigir textoBoton="Eliminar Curso" ruta="/baja-curso" className="btn-rojo" />
        </div>
      </div>

      {/* ------------------------------------------ */}
      {/* SECCIÓN: Lista de Usuarios y Roles */}
      {/* ------------------------------------------ */}
      <div className="section">
        <h3>Lista de usuarios y roles</h3>
        <ul className="user-list">
          {usuarios.map((user) => (
            <li key={user.id} style={{ marginBottom: 8 }}>
              {user.nombre} {user.apellido} ({user.email})
              <select
                value={roles[user.id] || "profesor"}
                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                style={{ marginLeft: 8 }}
              >
                <option value="profesor">Profesor</option>
                <option value="preceptor">Preceptor</option>
                <option value="admin">Admin</option>
              </select>
            </li>
          ))}
        </ul>
        <button className="btn-verde" onClick={guardarRoles}>
          Guardar cambios
        </button>
      </div>
    </div>
  );
};

export default AdminMenu;

// ======================================================
//  RESUMEN:
// Este componente es el núcleo del panel de administración.
// Permite gestionar la estructura académica (materias, cursos)
// y los permisos de usuarios (roles). Cualquier cambio en roles
// se guarda directamente en Firestore.
//
//  Archivo relacionado:
// - BotonRedirigir.jsx: para los botones de navegación.
// - firebase.js: conexión con Firestore.
// - AdminMenu.css: estilos de la interfaz.
//
// ======================================================
