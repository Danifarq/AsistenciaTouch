import { collection, getDocs} from "firebase/firestore";

const col= collection(db, "admin");
const snap = await getDocs(col);
const admin = snap.docs.map((doc) => ({ id: doc.id, ...doc.admin() }));
console.log(admin);