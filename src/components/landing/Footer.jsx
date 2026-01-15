
import { Link } from '@nextui-org/react';

// Social Icons
const FacebookIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
);

const WhatsAppIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
);

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white dark:bg-black">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Columna 1: Nombre y Copyright */}
          <div>
            <h3 className="text-xl font-bold mb-2">Taller Mecánico Portales</h3>
            <p className="text-gray-400">&copy; {new Date().getFullYear()} Todos los derechos reservados.</p>
          </div>
          
          {/* Columna 2: Horarios */}
          <div>
            <h4 className="font-semibold text-lg mb-2">Horario de Atención</h4>
            <p className="text-gray-400">Lunes a Viernes: 9:00 AM - 6:00 PM</p>
            <p className="text-gray-400">Sábados: 9:00 AM - 2:00 PM</p>
          </div>

          {/* Columna 3: Redes Sociales */}
          <div>
            <h4 className="font-semibold text-lg mb-2">Síguenos</h4>
            <div className="flex justify-center md:justify-start space-x-4">
              <Link href="#" isExternal className="text-gray-400 hover:text-white">
                <FacebookIcon />
              </Link>
              <Link href="#" isExternal className="text-gray-400 hover:text-white">
                <InstagramIcon />
              </Link>
              <Link href="#" isExternal className="text-gray-400 hover:text-white">
                <WhatsAppIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
