
import { useState, useEffect } from 'react';
import { Input, Button, Select, SelectItem } from '@nextui-org/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase'; // Importar auth y db
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Booking() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  // Estado para el formulario
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    fecha: '',
    hora: '',
    servicio: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Precargar datos del usuario si está logueado
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        nombre: user.displayName || '',
        email: user.email || '',
      }));
    }
  }, [user]);

  // Lista de servicios ofrecidos
  const servicios = [
    "Cambio de Aceite",
    "Revisión de Frenos",
    "Alineación y Balanceo",
    "Diagnóstico General",
    "Reparación de Motor",
  ];

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Manejar cambio en el select
  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, servicio: value }));
  }

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsSubmitting(true);

    if (!formData.fecha || !formData.hora || !formData.servicio) {
      setError('Por favor, completa todos los campos obligatorios.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Añadir un nuevo documento a la colección "citas"
      await addDoc(collection(db, 'citas'), {
        ...formData,
        userId: user ? user.uid : null, // Guardar el ID del usuario
        timestamp: new Date(), // Guardar la fecha de creación
      });
      
      setSuccess(true);
      // Redirigir al dashboard después de 2 segundos
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (err) {
      setError('Hubo un error al agendar tu cita. Por favor, inténtalo de nuevo.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Agendar una Cita</h1>
      
      {success ? (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md">
          <p className="font-bold">¡Cita Agendada con Éxito!</p>
          <p>Gracias por tu confianza. Serás redirigido a tu panel de usuario en breve.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
          <Input 
            isRequired
            label="Nombre Completo"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
          <Input 
            isRequired
            type="email"
            label="Correo Electrónico"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input 
            label="Teléfono (Opcional)"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              isRequired
              type="date"
              label="Fecha de la Cita"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]} // No permitir fechas pasadas
            />
            <Input 
              isRequired
              type="time"
              label="Hora de la Cita"
              name="hora"
              value={formData.hora}
              onChange={handleChange}
            />
          </div>
          <Select
            isRequired
            label="Selecciona el Servicio"
            selectedKeys={formData.servicio ? [formData.servicio] : []}
            onChange={(e) => handleSelectChange(e.target.value)}
          >
            {servicios.map((servicio) => (
              <SelectItem key={servicio} value={servicio}>
                {servicio}
              </SelectItem>
            ))}
          </Select>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">
              <p>{error}</p>
            </div>
          )}
          
          <Button 
            type="submit" 
            color="primary" 
            size="lg" 
            fullWidth
            isLoading={isSubmitting}
          >
            {isSubmitting ? 'Agendando...' : 'Confirmar Cita'}
          </Button>
        </form>
      )}
    </div>
  );
}

