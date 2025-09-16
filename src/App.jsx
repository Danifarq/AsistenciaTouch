import './index.css';
import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import Approute from './pages/routes/Approute';
import { AuthProvider } from './hooks/useAuth'; 
const App = () => {
  return (
     <Router>
      <AuthProvider>
      <Approute />
      </AuthProvider>
    </Router>
  );
}
export default App;
