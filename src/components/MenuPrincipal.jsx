import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; 
import { useProfesoresList } from "../hooks/useProfesoresList"; 
import { db } from "../firebase/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import "../index.css";
import BotonRedirigir from "../components/BotonRedirigir";
import '../css/MenuPrincipal.css';
import '../css/MenuProfe.css';

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

  // Cursos, materias y preceptores por defecto
  const cursosDefault = [
    { nombre: "1° 1°" },
    { nombre: "1° 2°" },
    { nombre: "2° 1°" },
    { nombre: "6° 1°" },
    { nombre: "6° 2°" },
  ];

  const materiasDefault = [
    { nombre: "Programación Web Dinamica" },
    { nombre: "Seguridad Informatica" },
    { nombre: "Tecnologia en redes" },
    { nombre: "Sistemas Operativos" },
    { nombre: "Inglés" },
  ];

  const preceptoresDefault = [
    { nombre: "Laura", apellido: "Gómez", email: "laura@escuela.edu", rol: "preceptor" },
    { nombre: "Carlos", apellido: "Pérez", email: "carlos@escuela.edu", rol: "preceptor" },
  ];

  // Inicializar datos base (cursos, materias, preceptores)
  useEffect(() => {
    const inicializarDatos = async () => {
      try {
        // --- Cargar cursos ---
        const cursosRef = collection(db, "cursos");
        const cursosSnap = await getDocs(cursosRef);
        if (cursosSnap.empty) {
          console.log("Creando colección 'cursos'...");
          for (const curso of cursosDefault) await addDoc(cursosRef, curso);
        }

        // --- Cargar materias ---
        const materiasRef = collection(db, "materias");
        const materiasSnap = await getDocs(materiasRef);
        if (materiasSnap.empty) {
          console.log("Creando colección 'materias'...");
          for (const mat of materiasDefault) await addDoc(materiasRef, mat);
        }

        // --- Cargar preceptores ---
        const preceptoresRef = collection(db, "preceptores");
        const preceptoresSnap = await getDocs(preceptoresRef);
        if (preceptoresSnap.empty) {
          console.log("Creando colección 'preceptores'...");
          for (const prec of preceptoresDefault) await addDoc(preceptoresRef, prec);
        }

        // --- Leer datos actualizados ---
        const nuevosCursos = (await getDocs(cursosRef)).docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        const nuevasMaterias = (await getDocs(materiasRef)).docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));

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

  if (authLoading || profesoresLoading || cargandoDatos)
    return <div>Cargando menú...</div>;

  if (!user) return <div>Por favor, inicia sesión para acceder.</div>;

  // === FUNCIONES DE ASISTENCIA ===

  // Guardar asistencia del profesor
  const guardarAsistencia = async () => {
    if (!cursoSeleccionado || !materiaSeleccionada) {
      alert("Debe seleccionar un curso y una materia");
      return;
    }

    const hoy = new Date().toISOString().split("T")[0];

    try {
      const q = query(
        collection(db, "asistencias"),
        where("profesorId", "==", user.uid),
        where("curso", "==", cursoSeleccionado),
        where("materia", "==", materiaSeleccionada),
        where("fecha", "==", hoy)
      );

      const existing = await getDocs(q);
      if (!existing.empty) {
        alert("Ya registraste asistencia hoy para esta materia y curso.");
        navigate(`/curso/${encodeURIComponent(cursoSeleccionado)}/${encodeURIComponent(materiaSeleccionada)}`);
        return;
      }

      await addDoc(collection(db, "asistencias"), {
        profesorId: user.uid,
        nombreProfesor: user.displayName || "Sin nombre",
        curso: cursoSeleccionado,
        materia: materiaSeleccionada,
        fecha: hoy,
        hora: new Date().toLocaleTimeString(),
        presente: true,
      });

      alert("Asistencia registrada correctamente.");
      navigate(`/curso/${encodeURIComponent(cursoSeleccionado)}/${encodeURIComponent(materiaSeleccionada)}`);
    } catch (error) {
      console.error("Error al guardar asistencia:", error);
      alert("Ocurrió un error al registrar la asistencia");
    }
  };

  // Guardar ausencia por preceptor
  const registrarAusencia = async () => {
    if (!profesorSeleccionado || !cursoSeleccionado || !materiaSeleccionada) {
      alert("Debe completar todos los campos");
      return;
    }

    const hoy = new Date().toISOString().split("T")[0];
    try {
      await addDoc(collection(db, "ausencias"), {
        profesorId: profesorSeleccionado,
        curso: cursoSeleccionado,
        materia: materiaSeleccionada,
        fecha: hoy,
        preceptorId: user.uid,
        preceptorNombre: user.displayName || "Preceptor",
      });
      alert("Ausencia registrada correctamente");
    } catch (error) {
      console.error("Error al registrar ausencia:", error);
      alert("Ocurrió un error al registrar la ausencia");
    }
  };

  // === RENDER ===

  return (
    <div className="menu-wrapper">
      <div className="menu-page">

        {/* --- ADMIN --- */}
        {userRole === "admin" ? (
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
        ) : userRole === "preceptor" ? (
          // --- PRECEPTOR ---
          <div className="preceptor-page">
    <div className="preceptor-box">
      <h1 className="preceptor-title">Bienvenido Preceptor</h1>
      <h2>Registrar ausencia de profesor:</h2>

      <div className="preceptor-form">
        <select
          value={profesorSeleccionado}
          onChange={(e) => setProfesorSeleccionado(e.target.value)}
        >
          <option value="">Seleccione un profesor</option>
          {profesores.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre} {p.apellido}
            </option>
          ))}
        </select>

        <select
          value={cursoSeleccionado}
          onChange={(e) => setCursoSeleccionado(e.target.value)}
        >
          <option value="">Seleccione un curso</option>
          {cursos.map((c) => (
            <option key={c.id} value={c.nombre}>{c.nombre}</option>
          ))}
        </select>

        <select
          value={materiaSeleccionada}
          onChange={(e) => setMateriaSeleccionada(e.target.value)}
        >
          <option value="">Seleccione una materia</option>
          {materias.map((m) => (
            <option key={m.id} value={m.nombre}>{m.nombre}</option>
          ))}
        </select>
      </div>

      <br />
      <button className="preceptor-button" onClick={registrarAusencia}>
        Confirmar ausencia
      </button>
    </div>
  </div>

        ) : (
          // --- PROFESOR ---
          <div className="profe-wrapper">
            <div className="profe-container">
              <h1>Bienvenido Profe</h1>
              <h2 className="profe-subtitle">Seleccione su curso y materia:</h2>

              <div className="profe-menu">
                <label className="profe-label">CURSO:</label>
                <select
                  className="profe-select"
                  value={cursoSeleccionado}
                  onChange={(e) => setCursoSeleccionado(e.target.value)}
                >
                  <option value="">Seleccione un curso</option>
                  {cursos.map((curso) => (
                    <option key={curso.id} value={curso.nombre}>
                      {curso.nombre}
                    </option>
                  ))}
                </select>

                <label className="profe-label" style={{ marginLeft: 12 }}>MATERIA:</label>
                <select
                  className="profe-select"
                  value={materiaSeleccionada}
                  onChange={(e) => setMateriaSeleccionada(e.target.value)}
                >
                  <option value="">Seleccione una materia</option>
                  {materias.map((mat) => (
                    <option key={mat.id} value={mat.nombre}>
                      {mat.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <br />
              <button className="profe-button" onClick={guardarAsistencia}>
                Confirmar asistencia y continuar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPrincipal;
