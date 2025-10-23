
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; 
import { useProfesoresList } from "../hooks/useProfesoresList"; 
import "../index.css";

const MenuPrincipal = () => {
  const navigate = useNavigate();
  const [cursoSeleccionado, setCursoSeleccionado] = useState("");
  const cursos = ["6° 2°", "1° 3°", "1° 2°"];
  const { user, userRole, loading: authLoading } = useAuth();
  const { profesores, loading: profesoresLoading } = useProfesoresList();

  if (authLoading || profesoresLoading) { return <div>Cargando menú...</div>;}
   if (!user) { return <div>Por favor, inicia sesión para acceder.</div>;}

  return (
    <div className="menu-wrapper">
      <div className="menu-page">
        <div className="welcome-container">
          <h1 className="welcome-title">Bienvenido</h1>
        </div>
        {userRole === 'admin' && (
          <div className="admin-container">
            <h2>Panel de Administrador</h2>
            <button
              className="next-button"
              onClick={() => navigate('/alta-profesor')}
            >
              Dar de Alta un Profesor
            </button>
            <h3>Lista de Profesores</h3>
            <ul className="user-list">
              {profesores.map(profesor => (
                <li key={profesor.id}>
                  {profesor.nombre} {profesor.apellido} ({profesor.email})
                </li>
              ))}
            </ul>
          </div>
        )}
         {userRole !== 'admin' && (
          <div className="student-container">
            <h2 className="welcome-subtitle">Seleccione su curso:</h2>
            <div className="menu-principal-container">
              <label className="curso-label">CURSO:</label>
              <select
                className="curso-select"
                value={cursoSeleccionado}
                onChange={(e) => setCursoSeleccionado(e.target.value)}
              >
                <option value="">Seleccione un curso</option>
                {cursos.map((curso, index) => (
                  <option key={index} value={curso}>
                    {curso}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="next-button"
              onClick={() => {
                if(cursoSeleccionado) navigate(`/curso/${cursoSeleccionado}`);
                else alert("Seleccione un curso primero");
              }}
            >
              Siguiente
            </button>

            <button type="button" onClick={() => navigate("/lista-profesores")}>
              Ver lista de profesores
            </button>
            <br />
            <button type="button" onClick={() => navigate("/alta-profesor")}>
              Agregar nuevo profesor
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPrincipal;