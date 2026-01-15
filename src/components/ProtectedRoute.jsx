
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext"; // Ruta corregida

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    // Puedes mostrar un spinner o un mensaje de carga aquí
    return <div>Cargando...</div>;
  }

  if (!user) {
    // Si no hay usuario, redirige a la página de login
    return <Navigate to="/login" replace />;
  }

  // Si hay un usuario, muestra el contenido protegido
  return children;
}
