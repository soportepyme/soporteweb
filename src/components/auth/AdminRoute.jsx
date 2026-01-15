
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import { auth } from '../../firebase.js';
import { Spinner } from '@nextui-org/react';

// UID del administrador. ¡Cámbialo por el UID real de tu cuenta de administrador!
const ADMIN_UID = "REEMPLAZAR_CON_EL_UID_DEL_ADMIN"; 

const AdminRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <Spinner label="Verificando acceso..." className="flex justify-center items-center h-screen" />;
  }

  if (!user) {
    // Si no hay usuario, redirige al login
    return <Navigate to="/login" />;
  }

  if (user.uid !== ADMIN_UID) {
    // Si el usuario no es el admin, redirige a su panel de control o a la página de inicio
    return <Navigate to="/dashboard" />;
  }

  // Si el usuario es el admin, muestra el contenido protegido
  return children;
};

export default AdminRoute;
