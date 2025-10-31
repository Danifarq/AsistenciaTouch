import React, { useState } from "react";
import BotonRedirigir from "../components/BotonRedirigir";
import { db } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import '../css/AdminMenu.css';

const AdminMenu = ({ profesores }) => {
  const [roles, setRoles] = useState(
    profesores.reduce((acc, prof) => {
      acc[prof.id] = prof.rol || "profe";
      return acc;
    }, {})
  );

  const handleRoleChange = (profId, nuevoRol) => {
    setRoles((prev) => ({ ...prev, [profId]: nuevoRol }));
  };

  const guardarRoles = async () => {
    try {
      for (const prof of profesores) {
        const nuevoRol = roles[prof.id];
        if (nuevoRol !== prof.rol) {
          const profRef = doc(db, "usuarios", prof.id);
          await updateDoc(profRef, { rol: nuevoRol });
        }
      }
      alert("Roles actualizados correctamente.");
    } catch (error) {
      console.error("Error actualizando roles:", error);
      alert("Ocurrió un error al actualizar roles.");
    }
  };

  return (
    <div className="admin-container">
      <h1 className="welcome-title">Bienvenido Admin</h1>

      {/* Gestión de Materias */}
      <div className="section">
        <h2>Gestión de materias</h2>
        <div className="button-row">
          <BotonRedirigir textoBoton="Agregar Materia" ruta="/alta-materia" className="btn-verde" />
          <BotonRedirigir textoBoton="Eliminar Materia" ruta="/baja-materia" className="btn-rojo" />
        </div>
      </div>

      {/* Gestión de Profesores */}
      <div className="section">
        <h2>Gestión de profesores y preceptores</h2>
        <div className="button-row">
          <BotonRedirigir textoBoton="Agregar Profesor" ruta="/alta-profesor" className="btn-verde" />
          <BotonRedirigir textoBoton="Eliminar Profesor" ruta="/baja-profesor" className="btn-rojo" />
          <BotonRedirigir textoBoton="Agregar Preceptor" ruta="/alta-preceptor" className="btn-verde" />
          <BotonRedirigir textoBoton="Eliminar Preceptor" ruta="/baja-preceptor" className="btn-rojo" />
        </div>
      </div>

      {/* Gestión de Cursos */}
      <div className="section">
        <h2>Gestión de cursos</h2>
        <div className="button-row">
          <BotonRedirigir textoBoton="Agregar Curso" ruta="/alta-curso" className="btn-verde" />
          <BotonRedirigir textoBoton="Eliminar Curso" ruta="/baja-curso" className="btn-rojo" />
        </div>
      </div>

      {/* Lista de Profesores/Preceptores */}
      <div className="section">
        <h3>Lista de profesores y roles</h3>
        <ul className="user-list">
          {profesores.map((profesor) => (
            <li key={profesor.id} style={{ marginBottom: 8 }}>
              {profesor.nombre} {profesor.apellido} ({profesor.email}) 
              <select
                value={roles[profesor.id]}
                onChange={(e) => handleRoleChange(profesor.id, e.target.value)}
                style={{ marginLeft: 8 }}
              >
                <option value="profe">Profesor</option>
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
