import { collection, getDocs} from "firebase/firestore";

const col= collection(db, "materias");
const snap = await getDocs(col);
const dataMaterias = snap.docs.map((doc) => ({ id: doc.id, ...doc.dataMaterias() }));
console.log(dataMaterias);