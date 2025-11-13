import { collection, getDocs} from "firebase/firestore";

const col= collection(db, "preceptores");
const snap = await getDocs(col);
const preceptores = snap.docs.map((doc) => ({ id: doc.id, ...doc.preceptores() }));
console.log(preceptores);

export const usePreceptores = () => {
  const [preceptores, setPreceptores] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerPreceptores = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "preceptores"));
      const lista = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPreceptores(lista);
    } catch (error) {
      console.error("Error al obtener preceptores:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerPreceptores();
  }, []);

  return { preceptores, cargando };
};
const agregarPreceptor = async (nuevoPreceptor) => {
  try {
    const docRef = await addDoc(collection(db, "preceptores"), nuevoPreceptor);
    setPreceptores([...preceptores, { id: docRef.id, ...nuevoPreceptor }]);
    return docRef.id; 
  } catch (error) {
    console.error("Error al agregar preceptor:", error);
    throw error;
  }
};
const activarPreceptor = async (id) => {
  try{
    const preceptorRef = doc(db, "preceptores", id);
    await updateDoc(preceptorRef, { activo: true });
  } catch (error) {
    console.error("Error al activar preceptor:", error);
  }
}
const desactivarPreceptor = async (id) => {
  try{
    const preceptorRef = doc(db, "preceptores", id);
    await updateDoc(preceptorRef, { activo: false });
  } catch (error) {
    console.error("Error al desactivar preceptor:", error);
  }
}
return { preceptores, cargando, agregarPreceptor, activarPreceptor, desactivarPreceptor };