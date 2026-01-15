
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import { auth } from '../../firebase.js';

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Cargando...</div>; // O un spinner de carga
  }

  if (!user) {
    // Si no hay usuario, redirige a la página de login
    return <Navigate to="/login" />;
  }

  // Si hay un usuario, muestra el contenido protegido
  return children;
};

export default ProtectedRoute;
