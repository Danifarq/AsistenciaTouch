import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; 
import { useProfesoresList } from "../hooks/useProfesoresList"; 
import { db } from "../firebase/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import "../index.css";
import BotonRedirigir from "../components/BotonRedirigir";

const MenuPrincipal = () => {
  const navigate = useNavigate();
  const [cursoSeleccionado, setCursoSeleccionado] = useState("");
  const [materiaSeleccionada, setMateriaSeleccionada] = useState("");
  const [cursos, setCursos] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [cargandoDatos, setCargandoDatos] = useState(true);

  const { user, userRole, loading: authLoading } = useAuth();
  const { profesores, loading: profesoresLoading } = useProfesoresList();

  //  Cursos y materias por defecto
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

  // Cargar o crear las colecciones
  useEffect(() => {
    const inicializarDatos = async () => {
      try {
        // --- Cargar cursos ---
        const cursosRef = collection(db, "cursos");
        const cursosSnap = await getDocs(cursosRef);

        if (cursosSnap.empty) {
          console.log("Creando colección 'cursos' con valores por defecto...");
          for (const curso of cursosDefault) {
            await addDoc(cursosRef, curso);
          }
        }

        // --- Cargar materias ---
        const materiasRef = collection(db, "materias");
        const materiasSnap = await getDocs(materiasRef);

        if (materiasSnap.empty) {
          console.log("Creando colección 'materias' con valores por defecto...");
          for (const mat of materiasDefault) {
            await addDoc(materiasRef, mat);
          }
        }

        // --- Volver a leer para mostrar ---
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

  // Guardar asistencia profesor + curso + materia
  const guardarAsistencia = async () => {
    if (!cursoSeleccionado || !materiaSeleccionada) {
      alert("Debe seleccionar un curso y una materia");
      return;
    }

    const hoy = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

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
        alert("Ya registraste asistencia hoy para esta materia y curso ");
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

      alert("Asistencia registrada correctamente ");
      navigate(`/curso/${encodeURIComponent(cursoSeleccionado)}/${encodeURIComponent(materiaSeleccionada)}`);
    } catch (error) {
      console.error("Error al guardar asistencia:", error);
      alert("Ocurrió un error al registrar la asistencia");
    }
  };

  return (
    <div className="menu-wrapper">
      <div className="menu-page">
        {userRole === "admin" ? (
          <div className="admin-container">
            <h1 className="welcome-title">Bienvenido Administrador</h1>

            <div style={{ marginBottom: 8 }}>
              <BotonRedirigir textoBoton="Agregar un nuevo profesor" ruta="/alta-profesor" />
            </div>
            <div style={{ marginBottom: 8 }}>
              <BotonRedirigir textoBoton="Eliminar un profe" ruta="/baja-profesor" />
            </div>
            <h2>Gestión de Materias</h2>
            <div style={{ marginBottom: 8 }}>
              <BotonRedirigir textoBoton="Agregar Materia" ruta="/alta-materia" />
            </div>
            <div style={{ marginBottom: 8 }}>
              <BotonRedirigir textoBoton="Eliminar Materia" ruta="/baja-materia" />
            </div>
            <h2>Gestión de Cursos</h2>
               <BotonRedirigir textoBoton="Agregar Curso" ruta="/alta-curso"/>
               <BotonRedirigir textoBoton="Eliminar Curso" ruta="/baja-curso"/>

            <h3>Lista de Profesores</h3>
            <ul className="user-list">
              {profesores.map((profesor) => (
                <li key={profesor.id}>
                  {profesor.nombre} {profesor.apellido} ({profesor.email})
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="student-container">
            <h1>Bienvenido Profe</h1>
            <h2 className="welcome-subtitle">Seleccione su curso y materia:</h2>

            <div className="menu-principal-container">
              <label className="curso-label">CURSO:</label>
              <select
                className="curso-select"
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

              <label className="materia-label" style={{ marginLeft: 12 }}>
                MATERIA:
              </label>
              <select
                className="materia-select"
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
            <button className="next-button" onClick={guardarAsistencia}>
              Confirmar asistencia y continuar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPrincipal;
