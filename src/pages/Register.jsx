
import React, { useState } from 'react';

const Register = () => {
  // Estado para los datos del formulario principal
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
  });

  // Estado para la lista de vehículos
  const [vehicles, setVehicles] = useState([]);
  // Estado para el vehículo que se está agregando
  const [vehicle, setVehicle] = useState({ make: '', model: '', year: '' });

  // Manejador para actualizar los datos del formulario principal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejador para agregar un vehículo a la lista
  const handleAddVehicle = () => {
    if (vehicle.make && vehicle.model && vehicle.year) {
      setVehicles([...vehicles, vehicle]);
      setVehicle({ make: '', model: '', year: '' }); // Limpiar formulario de vehículo
    }
  };

  // Manejador para eliminar un vehículo de la lista
  const handleRemoveVehicle = (index) => {
    const newVehicles = [...vehicles];
    newVehicles.splice(index, 1);
    setVehicles(newVehicles);
  };
  
  // Manejador para el envío del formulario completo
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenir el comportamiento de recarga de la página
    // Aquí es donde procesarías los datos, por ejemplo, enviarlos a Firebase.
    // Por ahora, solo los mostraremos en la consola para verificar.
    console.log("Datos del usuario:", formData);
    console.log("Vehículos registrados:", vehicles);
    alert("¡Registro enviado! Revisa la consola del navegador para ver los datos.");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-900">Registro de Usuario</h1>
        <p className="text-center text-gray-600">
          Crea una cuenta para agendar tus citas de mantenimiento vehicular.
        </p>
        {/* Asociar el manejador de envío al formulario */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Juan"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                Apellido
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Pérez"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Teléfono
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="55-1234-5678"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="juan.perez@example.com"
                value={formData.email}
                onChange={handleChange}
              />
               <p className="mt-1 text-sm text-gray-500">
                Se enviará un correo de verificación para activar tu cuenta.
              </p>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Registro de Vehículos</h2>
            <p className="mt-2 text-sm text-gray-600">
              Agrega los vehículos que deseas registrar en tu cuenta.
            </p>

            <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-3">
              <div>
                <label htmlFor="make" className="text-sm font-medium text-gray-700">
                  Marca
                </label>
                <input
                  id="make"
                  name="make"
                  type="text"
                  value={vehicle.make}
                  onChange={(e) => setVehicle({ ...vehicle, make: e.target.value })}
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Toyota"
                />
              </div>
              <div>
                <label htmlFor="model" className="text-sm font-medium text-gray-700">
                  Modelo
                </label>
                <input
                  id="model"
                  name="model"
                  type="text"
                  value={vehicle.model}
                  onChange={(e) => setVehicle({ ...vehicle, model: e.target.value })}
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Corolla"
                />
              </div>
              <div>
                <label htmlFor="year" className="text-sm font-medium text-gray-700">
                  Año
                </label>
                <input
                  id="year"
                  name="year"
                  type="text"
                  value={vehicle.year}
                  onChange={(e) => setVehicle({ ...vehicle, year: e.target.value })}
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="2023"
                />
              </div>
            </div>

            <div className="mt-6 text-right">
              <button
                type="button"
                onClick={handleAddVehicle}
                className="px-6 py-2 text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Agregar Vehículo
              </button>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900">Vehículos Registrados</h3>
              {vehicles.length === 0 ? (
                <p className="mt-2 text-sm text-gray-500">No hay vehículos registrados.</p>
              ) : (
                <ul className="mt-4 space-y-4">
                  {vehicles.map((v, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-100 rounded-lg"
                    >
                      <div>
                        <p className="font-semibold text-gray-800">{`${v.make} ${v.model}`}</p>
                        <p className="text-sm text-gray-600">{`Año: ${v.year}`}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveVehicle(index)}
                        className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                      >
                        Eliminar
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="pt-6 text-center">
            <button
              type="submit"
              className="w-full px-6 py-3 text-lg font-medium text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Crear Cuenta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
