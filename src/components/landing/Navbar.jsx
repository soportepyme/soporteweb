
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="text-xl font-bold">Mecánica Portales</div>
      <div>
        <Link to="/" className="px-4">Home</Link>
        <Link to="/#services" className="px-4">Services</Link>
        <Link to="/#about" className="px-4">About Us</Link>
        <Link to="/booking" className="px-4 py-2 bg-blue-600 rounded">Book Appointment</Link>
      </div>
    </nav>
  );
}

export default Navbar;
