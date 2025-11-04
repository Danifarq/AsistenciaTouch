// Importar Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Configuración de Firebase 
const firebaseConfig = {
  apiKey: "AIzaSyB3g0p5Hcckf5O5T-qGTnzvsT2ezr6VBWk",
  authDomain: "aisitenciatouch.firebaseapp.com",
  projectId: "aisitenciatouch",
  storageBucket: "aisitenciatouch.firebasestorage.app",
  messagingSenderId: "951678999848",
  appId: "1:951678999848:web:98115fbd2fa173af3a841d",
  measurementId: "G-123D5L169M"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app); 
const googleProvider = new GoogleAuthProvider();
// Exportar la app para usarla en otros archivos
export { app, analytics, auth,db, googleProvider };