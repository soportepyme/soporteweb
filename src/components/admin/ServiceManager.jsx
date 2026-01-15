
import { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, addDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import { Input, Button, Spinner, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';

export default function ServiceManager() {
  const [serviceName, setServiceName] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Obtener servicios existentes
  const [services, loading, servicesError] = useCollection(
    query(collection(db, 'servicios'), orderBy('nombre', 'asc'))
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!serviceName || !servicePrice) {
      setError('El nombre y el precio del servicio son obligatorios.');
      return;
    }
    setIsSubmitting(true);
    setError('');

    try {
      await addDoc(collection(db, 'servicios'), {
        nombre: serviceName,
        precio: parseFloat(servicePrice), // Guardar el precio como número
      });
      setServiceName('');
      setServicePrice('');
    } catch (err) {
      setError('Error al añadir el servicio.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Gestionar Servicios</h2>
      
      {/* Formulario para añadir servicio */}
      <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded-lg flex items-end gap-4">
        <Input 
          label="Nombre del Servicio"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
        />
        <Input 
          label="Precio"
          type="number"
          value={servicePrice}
          onChange={(e) => setServicePrice(e.target.value)}
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">$</span>
            </div>
          }
        />
        <Button type="submit" color="primary" isLoading={isSubmitting}>
          {isSubmitting ? 'Añadiendo...' : 'Añadir Servicio'}
        </Button>
      </form>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Tabla de servicios existentes */}
      <h3 className="text-xl font-semibold mb-2">Servicios Actuales</h3>
      {loading && <Spinner />}
      {servicesError && <p className="text-red-500">Error al cargar servicios.</p>}
      {services && (
        <Table aria-label="Tabla de Servicios">
          <TableHeader>
            <TableColumn>NOMBRE</TableColumn>
            <TableColumn>PRECIO</TableColumn>
          </TableHeader>
          <TableBody items={services.docs}>
            {(item) => (
              <TableRow key={item.id}>
                <TableCell>{item.data().nombre}</TableCell>
                <TableCell>${item.data().precio.toFixed(2)}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
