
import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, addDoc, doc, deleteDoc } from 'firebase/firestore';

function ServiceManager() {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ name: '', description: '', cost: '', duration: '' });
  const [loading, setLoading] = useState(true);

  const servicesCollectionRef = collection(db, 'services');

  const getServices = async () => {
    setLoading(true);
    const data = await getDocs(servicesCollectionRef);
    setServices(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setLoading(false);
  };

  useEffect(() => {
    getServices();
  }, []);

  const handleCreateService = async (e) => {
    e.preventDefault();
    if (!newService.name || !newService.cost || !newService.duration) {
      alert('Por favor, completa nombre, costo y duración.');
      return;
    }
    await addDoc(servicesCollectionRef, { 
        name: newService.name, 
        description: newService.description, 
        cost: Number(newService.cost), 
        duration: Number(newService.duration) 
    });
    getServices(); // Refresh list
    setNewService({ name: '', description: '', cost: '', duration: '' }); // Reset form
  };

  const handleDeleteService = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este servicio?")) {
      const serviceDoc = doc(db, 'services', id);
      await deleteDoc(serviceDoc);
      getServices(); // Refresh list
    }
  };
  
  if (loading && services.length === 0) {
    return <p>Cargando servicios...</p>;
  }

  return (
    <div className="bg-white shadow-xl rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Gestionar Servicios</h2>
      
      {/* Formulario para añadir servicio */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">Añadir Nuevo Servicio</h3>
        <form onSubmit={handleCreateService} className="space-y-4">
          <input
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Nombre del Servicio"
            value={newService.name}
            onChange={(e) => setNewService({ ...newService, name: e.target.value })}
          />
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Descripción (opcional)"
            rows="3"
            value={newService.description}
            onChange={(e) => setNewService({ ...newService, description: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Costo ($)"
              value={newService.cost}
              onChange={(e) => setNewService({ ...newService, cost: e.target.value })}
            />
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Duración (minutos)"
              value={newService.duration}
              onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
            />
          </div>
          <button type="submit" className="w-full p-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition-colors">Añadir Servicio</button>
        </form>
      </div>

      {/* Lista de servicios existentes */}
      <div>
        <h3 className="text-xl font-semibold mb-3 text-gray-700">Servicios Existentes</h3>
        {services.length === 0 ? (
          <p className="text-gray-500">No hay servicios creados todavía.</p>
        ) : (
          <ul className="space-y-3">
            {services.map((service) => (
              <li key={service.id} className="bg-gray-100 p-3 rounded-md flex justify-between items-center border border-gray-200">
                <div>
                  <p className="font-bold text-gray-800">{service.name}</p>
                  <p className="text-sm text-gray-600">{service.description}</p>
                  <p className="text-sm font-medium text-blue-600">${service.cost} - {service.duration} min</p>
                </div>
                <button onClick={() => handleDeleteService(service.id)} className="px-3 py-1 bg-red-600 text-white text-sm font-semibold rounded-md hover:bg-red-700 transition-colors">Eliminar</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ServiceManager;
