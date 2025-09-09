import { collection, getDocs} from "firebase/firestore";

const col = collection(db, "profesores");
const snap = await getDocs(col);
const profesores = snap.docs.map((doc) => ({ id: doc.id, ...doc.profesores() }));
console.log(profesores);