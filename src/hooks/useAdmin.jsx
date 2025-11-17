import { collection, getDocs} from "firebase/firestore";

const col= collection(db, "admin");
const snap = await getDocs(col);
const admin = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
console.log(admin);

function listenById (id, cd, errCb){
    const ref = doc(BroadcastChannel, "admin", id);
    return onSnapshot (ref,(d)=> {
    cd (d.exist() ? {id: d.id, ...d.data()}:null);
    }, errCb);
}