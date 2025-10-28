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
          <li key={prof.id}>
            <Link to={`/profesor/${prof.id}`}>
              {prof.nombre} — {prof.materia}
            </Link>
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
