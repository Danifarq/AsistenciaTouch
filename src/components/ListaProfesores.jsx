// ListaProfesores.jsx
/**
 * Muestra lista de todos los profesores.
 * Funcionalidades:
 * - Enlaces a detalle de cada profesor.
 * - Muestra las materias y cursos asignados.
 * - Botones para agregar nuevo profesor o volver al menú.
 */

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProfesoresList } from "../hooks/useProfesoresList";

const ListaProfesores = () => {
  const { profesores, cargando } = useProfesoresList();
  const navigate = useNavigate();

  if (cargando) return <p>Cargando lista...</p>;

  if (profesores.length === 0)
    return (
      <div>
        <p>No hay profesores registrados.</p>
        <button onClick={() => navigate("/alta-profesor")}>
          Agregar un profesor
        </button>
      </div>
    );

  return (
    <div className="p-4">
      <h2>Lista de Profesores</h2>
      <ul>
        {profesores.map((prof) => (
          <li key={prof.id} className="profesor-item">
            <Link to={`/profesor/${prof.id}`}>
              <strong>{prof.nombre}</strong>
              {prof.apellido && ` ${prof.apellido}`}
            </Link>

            {prof.materias && prof.materias.length > 0 ? (
              <ul className="materias-lista">
                {prof.materias.map((m, i) => (
                  <li key={i}>
                    {m.materia} — <em>{m.curso}</em>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="sin-materias">No tiene materias registradas</p>
            )}
          </li>
        ))}
      </ul>

      <button onClick={() => navigate("/alta-profesor")}>
        Agregar nuevo profesor
      </button>
      <br />
      <button onClick={() => navigate("/menuprincipal")}>
        Volver al menú principal
      </button>
    </div>
  );
};

export default ListaProfesores;
