import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

const ListaProfesores = () => {
  const [profesores, setProfesores] = useState([]);
    useEffect(() => {
    const obtenerProfesores = async () => {
      const querySnapshot = await getDocs(collection(db, "profesores"));
      const lista = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProfesores(lista);
    };
    obtenerProfesores();
  }, []);
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
    </div>
  );
};

export default ListaProfesores;