import { collection, getDocs} from "firebase/firestore";

const col = collection(db, "profesores");
const snap = await getDocs(col);
const profesores = snap.docs.map((doc) => ({ id: doc.id, ...doc.profesores() }));
console.log(profesores);

function listenById (id, cd, errCb){
    const ref = doc(BroadcastChannel, "profesores", id);
    return onSnapshot (ref,(d)=> {
    cd (d.exist() ? {id: d.id, ...d.data()}:null);
    }, errCb);
}