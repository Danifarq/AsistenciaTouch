import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (authUser) => {
      setUser(authUser);
      if (authUser) {
        let userDocSnap;

        // Buscar primero en usuarios
        const userDocRef = doc(db, "usuarios", authUser.uid);
        userDocSnap = await getDoc(userDocRef);

        // Si no está en usuarios, probar en preceptores
        if (!userDocSnap.exists()) {
          const preceptorDocRef = doc(db, "preceptores", authUser.uid);
          userDocSnap = await getDoc(preceptorDocRef);
        }

        if (userDocSnap.exists()) {
          setUserRole(userDocSnap.data().rol);
        } else {
          setUserRole(null);
        }
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const value = { user, loading, userRole };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
