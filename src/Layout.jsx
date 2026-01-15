
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from '@nextui-org/react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase.js';
import { signOut } from 'firebase/auth';

export default function Layout() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isBordered>
        <NavbarBrand>
          <Link to="/" className="font-bold text-inherit">Taller Mecánico Portales</Link>
        </NavbarBrand>

        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex items-center gap-4">
            {/* Ruta corregida a /booking */}
            <Link to="/booking">
              <Button color="primary" variant="flat">Agendar Cita</Button>
            </Link>
            {user && (
              <Link to="/admin">
                <Button color="secondary" variant="flat">Admin</Button>
              </Link>
            )}
          </NavbarItem>
          <NavbarItem>
            {user ? (
              <Button color="danger" variant="flat" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            ) : (
              <Button as={Link} color="primary" to="/login" variant="flat">
                Iniciar Sesión
              </Button>
            )}
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}
