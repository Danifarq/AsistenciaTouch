
// MenuPrincipal.jsx
/**
 * Componente principal que actúa como "hub" según rol de usuario.
 * Funcionalidades:
 * - Detecta rol de usuario (admin, preceptor, profesor) y carga menú correspondiente.
 * - Inicializa datos por defecto: cursos, materias, preceptores y usuarios.
 * - Funciones para:
 *    - guardarAsistencia (profesores)
 *    - registrarAusencia (preceptores)
 *
 * Estado interno:
 * - cursoSeleccionado, materiaSeleccionada, profesorSeleccionado
 * - cursos, materias, usuarios
 * - cargandoDatos: controla la carga inicial.
 *
 * Notas:
 * - Usa hooks personalizados useAuth y useProfesoresList.
 * - AdminMenu recibe lista de usuarios para gestión de roles.
 */
import React, { useState, useEffect } from "react";

import { useAuth } from "../hooks/useAuth"; 
import { useProfesoresList } from "../hooks/useProfesoresList"; 
import { db } from "../firebase/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import "../css/MenuPrincipal.css";
import "../css/MenuProfe.css";

import AdminMenu from "./AdminMenu";
import PreceptorMenu from "./PreceptorMenu";
import ProfeMenu from "./ProfeMenu";

const MenuPrincipal = () => {

  const [cursoSeleccionado, setCursoSeleccionado] = useState("");
  const [materiaSeleccionada, setMateriaSeleccionada] = useState("");
  const [profesorSeleccionado, setProfesorSeleccionado] = useState("");
  const [cursos, setCursos] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [cargandoDatos, setCargandoDatos] = useState(true);
  const [usuarios, setUsuarios] = useState([]); 

  const { user, userRole, loading: authLoading } = useAuth();
  const { profesores, loading: profesoresLoading } = useProfesoresList();

  useEffect(() => {
    const inicializarDatos = async () => {
      try {
        const cursosRef = collection(db, "cursos");
        const materiasRef = collection(db, "materias");
        const preceptoresRef = collection(db, "preceptores");
        const usuariosRef = collection(db, "usuarios");

        const cursosSnap = await getDocs(cursosRef);
        const materiasSnap = await getDocs(materiasRef);
        const preceptoresSnap = await getDocs(preceptoresRef);
        const usuariosSnap = await getDocs(usuariosRef);

        // Crear documentos por defecto si no existen
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

        // Obtener documentos actualizados
        const nuevosCursos = (await getDocs(cursosRef)).docs.map(d => ({ id: d.id, ...d.data() }));
        const nuevasMaterias = (await getDocs(materiasRef)).docs.map(d => ({ id: d.id, ...d.data() }));
        const nuevosUsuarios = (await getDocs(usuariosRef)).docs.map(d => ({ id: d.id, ...d.data() }));

        setCursos(nuevosCursos);
        setMaterias(nuevasMaterias);
        setUsuarios(nuevosUsuarios);

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

  const guardarAsistencia = async () => {
  if (!cursoSeleccionado || !materiaSeleccionada) {
    alert("Por favor, seleccioná un curso y una materia antes de confirmar la asistencia.");
    return;
  }

  try {
    const asistenciaRef = collection(db, "asistencias");

    await addDoc(asistenciaRef, {
      profesor: user.displayName || user.email,
      curso: cursoSeleccionado,
      materia: materiaSeleccionada,
      fecha: new Date().toLocaleDateString("es-AR"),
      hora: new Date().toLocaleTimeString("es-AR"),
      estado: "presente"
    });
 <BotonRedirigir 
        textoBoton="Ir a inicio" 
        ruta="/inicio" 
      />
  } catch (error) {
    console.error("Error al guardar asistencia:", error);
    alert("❌ Hubo un error al registrar la asistencia.");
  }
};
const registrarAusencia = async () => {
  if (!profesorSeleccionado || !cursoSeleccionado || !materiaSeleccionada) {
    alert("Por favor, seleccioná profesor, curso y materia antes de registrar la ausencia.");
    return;
  }

  try {
    const asistenciaRef = collection(db, "asistencias");

    await addDoc(asistenciaRef, {
      profesor: profesorSeleccionado,
      curso: cursoSeleccionado,
      materia: materiaSeleccionada,
      fecha: new Date().toLocaleDateString("es-AR"),
      hora: new Date().toLocaleTimeString("es-AR"),
      estado: "ausente"
    });

    alert("Ausencia registrada correctamente.");

  

  } catch (error) {
    console.error("Error al registrar ausencia:", error);
    alert("❌ Ocurrió un error al registrar la ausencia.");
  }
};


  return (
    <div className="menu-wrapper">
      <div className="menu-page">
        {userRole === "admin" && <AdminMenu usuarios={usuarios} />}
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
