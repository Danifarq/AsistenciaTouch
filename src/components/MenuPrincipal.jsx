import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; 
import { useProfesoresList } from "../hooks/useProfesoresList"; 
import { db } from "../firebase/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import "../css/MenuPrincipal.css";
import "../css/MenuProfe.css";

import AdminMenu from "./AdminMenu";
import PreceptorMenu from "./PreceptorMenu";
import ProfeMenu from "./ProfeMenu";

const MenuPrincipal = () => {
  const navigate = useNavigate();
  const [cursoSeleccionado, setCursoSeleccionado] = useState("");
  const [materiaSeleccionada, setMateriaSeleccionada] = useState("");
  const [profesorSeleccionado, setProfesorSeleccionado] = useState("");
  const [cursos, setCursos] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [cargandoDatos, setCargandoDatos] = useState(true);

  const { user, userRole, loading: authLoading } = useAuth();
  const { profesores, loading: profesoresLoading } = useProfesoresList();


  useEffect(() => {
    const inicializarDatos = async () => {
      try {
        const cursosRef = collection(db, "cursos");
        const materiasRef = collection(db, "materias");
        const preceptoresRef = collection(db, "preceptores");

        const cursosSnap = await getDocs(cursosRef);
        const materiasSnap = await getDocs(materiasRef);
        const preceptoresSnap = await getDocs(preceptoresRef);

       
        if (cursosSnap.empty) {
          const cursosDefault = [
            { nombre: "1° 1°" }, { nombre: "1° 2°" }, { nombre: "2° 1°" }, { nombre: "6° 1°" }, { nombre: "6° 2°" }
          ];
          for (const c of cursosDefault) await addDoc(cursosRef, c);
        }
        if (materiasSnap.empty) {
          const materiasDefault = [
            { nombre: "Programación Web Dinamica" }, { nombre: "Seguridad Informatica" },
            { nombre: "Tecnologia en redes" }, { nombre: "Sistemas Operativos" }, { nombre: "Inglés" }
          ];
          for (const m of materiasDefault) await addDoc(materiasRef, m);
        }
        if (preceptoresSnap.empty) {
          const preceptoresDefault = [
            { nombre: "Laura", apellido: "Gómez", email: "laura@escuela.edu", rol: "preceptor" },
            { nombre: "Carlos", apellido: "Pérez", email: "carlos@escuela.edu", rol: "preceptor" }
          ];
          for (const p of preceptoresDefault) await addDoc(preceptoresRef, p);
        }

        const nuevosCursos = (await getDocs(cursosRef)).docs.map(d => ({ id: d.id, ...d.data() }));
        const nuevasMaterias = (await getDocs(materiasRef)).docs.map(d => ({ id: d.id, ...d.data() }));

        setCursos(nuevosCursos);
        setMaterias(nuevasMaterias);
      } catch (error) {
        console.error("Error inicializando datos:", error);
      } finally {
        setCargandoDatos(false);
      }
    };

    inicializarDatos();
  }, []);

  if (authLoading || profesoresLoading || cargandoDatos) return <div>Cargando menú...</div>;
  if (!user) return <div>Por favor, inicia sesión para acceder.</div>;

  const guardarAsistencia = async () => {  };
  const registrarAusencia = async () => {  };

  return (
    <div className="menu-wrapper">
      <div className="menu-page">
        {userRole === "admin" && <AdminMenu profesores={profesores} />}
        {userRole === "preceptor" && (
          <PreceptorMenu
            profesores={profesores}
            cursoSeleccionado={cursoSeleccionado}
            setCursoSeleccionado={setCursoSeleccionado}
            materiaSeleccionada={materiaSeleccionada}
            setMateriaSeleccionada={setMateriaSeleccionada}
            profesorSeleccionado={profesorSeleccionado}
            setProfesorSeleccionado={setProfesorSeleccionado}
            cursos={cursos}
            materias={materias}
            registrarAusencia={registrarAusencia}
          />
        )}
        {userRole === "profesor" && (
          <ProfeMenu
            cursoSeleccionado={cursoSeleccionado}
            setCursoSeleccionado={setCursoSeleccionado}
            materiaSeleccionada={materiaSeleccionada}
            setMateriaSeleccionada={setMateriaSeleccionada}
            cursos={cursos}
            materias={materias}
            guardarAsistencia={guardarAsistencia}
          />
        )}
      </div>
    </div>
  );
};

export default MenuPrincipal;
