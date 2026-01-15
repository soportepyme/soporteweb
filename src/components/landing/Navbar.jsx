
import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { AuthContext } from '../../AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.js'; // Ruta corregida

// Correo del administrador
const ADMIN_EMAIL = 'soportepyme.net@gmail.com';

export default function AppNavbar() {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const getInitials = (email) => {
    if (!email) return '';
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <Navbar isBordered>
      <NavbarBrand>
        <NavLink to="/" className="font-bold text-inherit">Taller Mecánico Portales</NavLink>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <NavLink to="/#services" className={({isActive}) => isActive ? "text-blue-500" : ""}>Servicios</NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink to="/#about" className={({isActive}) => isActive ? "text-blue-500" : ""}>Nosotros</NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink to="/#testimonials" className={({isActive}) => isActive ? "text-blue-500" : ""}>Testimonios</NavLink>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        {!user && !loading && (
          <>
            <NavbarItem className="hidden lg:flex">
              <Button as={NavLink} to="/login" variant="ghost" color="primary">Iniciar Sesión</Button>
            </NavbarItem>
            <NavbarItem>
              <Button as={NavLink} to="/register" color="primary" variant="flat">Registrarse</Button>
            </NavbarItem>
          </>
        )}

        {user && (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="primary"
                size="sm"
                name={getInitials(user.email)}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Sesión iniciada como</p>
                <p className="font-medium">{user.email}</p>
              </DropdownItem>
              <DropdownItem key="dashboard">
                <NavLink to="/dashboard">Mi Cuenta</NavLink>
              </DropdownItem>
              {user.email === ADMIN_EMAIL && (
                <DropdownItem key="admin_panel">
                  <NavLink to="/admin">Panel de Administrador</NavLink>
                </DropdownItem>
              )}
              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                Cerrar Sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>
    </Navbar>
  );
}
