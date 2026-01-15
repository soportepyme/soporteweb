
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner } from '@nextui-org/react';

export default function UpcomingAppointments() {
  const [value, loading, error] = useCollection(
    query(collection(db, 'citas'), orderBy('fecha', 'asc'))
  );

  if (loading) {
    return <Spinner label="Cargando citas..." />;
  }

  if (error) {
    return <p className="text-red-500">Error al cargar las citas: {error.message}</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Próximas Citas</h2>
      {value && value.docs.length > 0 ? (
        <Table aria-label="Tabla de Citas">
          <TableHeader>
            <TableColumn>FECHA</TableColumn>
            <TableColumn>HORA</TableColumn>
            <TableColumn>CLIENTE</TableColumn>
            <TableColumn>SERVICIO</TableColumn>
            <TableColumn>EMAIL</TableColumn>
          </TableHeader>
          <TableBody items={value.docs}>
            {(item) => (
              <TableRow key={item.id}>
                <TableCell>{item.data().fecha}</TableCell>
                <TableCell>{item.data().hora}</TableCell>
                <TableCell>{item.data().nombre}</TableCell>
                <TableCell>{item.data().servicio}</TableCell>
                <TableCell>{item.data().email}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      ) : (
        <p>No hay citas programadas.</p>
      )}
    </div>
  );
}
