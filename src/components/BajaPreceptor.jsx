import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import '../css/AdminMenu.css';
import BotonRedirigir from "../components/BotonRedirigir";

const BajaPreceptor = () => {
  const [preceptores, setPreceptores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPreceptores = async () => {
      try {
        const q = query(collection(db, "usuarios"), where("rol", "==", "preceptor"));
        const snapshot = await getDocs(q);
        const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPreceptores(lista);
        setLoading(false);
      } catch (error) {
        console.error("Error obteniendo preceptores:", error);
        setLoading(false);
      }
    };
    fetchPreceptores();
  }, []);

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este preceptor?")) return;

    try {
      // 1️⃣ Eliminar de la colección "usuarios"
      await deleteDoc(doc(db, "usuarios", id));

      // 2️⃣ Buscar y eliminar de la colección "preceptores"
      const preceptoresRef = collection(db, "preceptores");
      const q = query(preceptoresRef, where("id", "==", id));
      const snapshot = await getDocs(q);
      snapshot.forEach(async (docSnap) => {
        await deleteDoc(doc(db, "preceptores", docSnap.id));
      });

      // Actualizar estado local
      setPreceptores(preceptores.filter((p) => p.id !== id));

      alert("Preceptor eliminado de ambas colecciones.");
    } catch (error) {
      console.error("Error eliminando preceptor:", error);
      alert("Ocurrió un error al eliminar el preceptor.");
    }
  };

  if (loading) return <p>Cargando preceptores...</p>;

  return (
    <div className="admin-container">
      <h1>Baja de Preceptor</h1>
      {preceptores.length === 0 ? (
        <p>No hay preceptores registrados.</p>
      ) : (
        <ul className="user-list">
          {preceptores.map((p) => (
            <li key={p.id} style={{ marginBottom: 8 }}>
              {p.nombre} {p.apellido} ({p.email})
              <button
                className="btn-rojo"
                style={{ marginLeft: 10 }}
                onClick={() => handleEliminar(p.id)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="volver-panel">
        <BotonRedirigir textoBoton="ir a Panel Admin" ruta="/menuprincipal" />
      </div>
    </div>
  );
};

export default BajaPreceptor;
