import React from "react";
import BotonRedirigir from "../components/BotonRedirigir";

const AdminMenu = ({ profesores }) => {
  return (
    <div className="admin-container">
      <h1 className="welcome-title">Bienvenido Admin</h1>

      <div className="section">
        <h2>Gestión de materias</h2>
        <div className="button-row">
          <BotonRedirigir textoBoton="Agregar Materia" ruta="/alta-materia" className="btn-agregar-materia" />
          <BotonRedirigir textoBoton="Eliminar Materia" ruta="/baja-materia" className="btn-eliminar-materia" />
        </div>
      </div>

      <div className="section">
        <h2>Gestión de profesores</h2>
        <div className="button-row">
          <BotonRedirigir textoBoton="Agregar Profesor" ruta="/alta-profesor" className="btn-agregar-profesor" />
          <BotonRedirigir textoBoton="Eliminar Profesor" ruta="/baja-profesor" className="btn-eliminar-profesor" />
        </div>
      </div>

      <div className="section">
        <h2>Gestión de cursos</h2>
        <div className="button-row">
          <BotonRedirigir textoBoton="Agregar Curso" ruta="/alta-curso" className="btn-agregar-curso" />
          <BotonRedirigir textoBoton="Eliminar Curso" ruta="/baja-curso" className="btn-eliminar-curso" />
        </div>
      </div>

      <div className="section">
        <h3>Lista de profesores</h3>
        <ul className="user-list">
          {profesores.map((profesor) => (
            <li key={profesor.id}>
              {profesor.nombre} {profesor.apellido} ({profesor.email})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminMenu;
