
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; 
import { useProfesoresList } from "../hooks/useProfesoresList"; 
import "../index.css";
import BotonRedirigir from '../components/BotonRedirigir';
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
          
        </div>
        {userRole === 'admin' && (
          <div className="admin-container">
            <h1 className="welcome-title">Bienvenido Administrador</h1>
            
<div>
       <BotonRedirigir 
                    textoBoton="Agregar un nuevo profesor" 
                    ruta="/alta-profesor"
                />
   </div>
 <div >
                 <BotonRedirigir 
                    textoBoton="Eliminar un profe" 
                    ruta="/menuprincipal" 
                /></div>

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
            <h1>Bienvenido Profe</h1>
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

              <br />
              <button
              className="next-button"
              onClick={() => {
                if(cursoSeleccionado) navigate(`/curso/${cursoSeleccionado}`);
                else alert("Seleccione un curso primero");
              }}
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPrincipal;