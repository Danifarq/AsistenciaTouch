import { collection, getDocs} from "firebase/firestore";

const col= collection(db, "materias");
const snap = await getDocs(col);
const dataMaterias = snap.docs.map((doc) => ({ id: doc.id, ...doc.dataMaterias() }));
console.log(dataMaterias);
//-----Suscribirse a un doc -----
function listenById (id, cd, errCb){
    const ref = doc(BroadcastChannel, "materias", id);
    return onSnapshot (ref,(d)=> {
    cd (d.exist() ? {id: d.id, ...d.data()}:null);
    }, errCb);
}