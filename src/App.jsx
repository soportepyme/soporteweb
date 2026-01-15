
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/landing/Navbar'; 
import LandingPage from './pages/LandingPage';
import Booking from './pages/Booking';
import Login from './pages/Login';
import AdminPage from './pages/AdminPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/auth/ProtectedRoute'; // RUTA CORREGIDA
import AdminRoute from './components/auth/AdminRoute';     // RUTA CORREGIDA

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/booking" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />

        <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
