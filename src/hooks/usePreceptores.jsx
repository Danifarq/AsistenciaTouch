import { collection, getDocs} from "firebase/firestore";

const col= collection(db, "preceptores");
const snap = await getDocs(col);
const admin = snap.docs.map((doc) => ({ id: doc.id, ...doc.admin() }));
console.log(preceptores);