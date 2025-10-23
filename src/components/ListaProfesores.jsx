import React, { useEffect, useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

const ListaProfesores = () => {
  const [profesores, setProfesores] = useState([]);
   const [cargando, setCargando] = useState(true);
   const navigate = useNavigate();

    useEffect(() => {
    const obtenerProfesores = async () => {
      const querySnapshot = await getDocs(collection(db, "profesores"));
      const lista = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProfesores(lista);
        setCargando(false);
    };
    obtenerProfesores();
  }, []);
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
    <div>
      <h2>Lista de Profesores</h2>
      <ul>
        {profesores.map((prof) => (
          <li key={prof.id}>
            <Link to={`/profesor/${prof.id}`}>
              {prof.nombre} - {prof.materia}
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