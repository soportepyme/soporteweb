
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, where, orderBy } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { Spinner, Card, CardHeader, CardBody, CardFooter, Divider } from '@nextui-org/react';

export default function DashboardPage() {
  const [user, loadingUser] = useAuthState(auth);

  // Consulta para obtener solo las citas del usuario actual
  const [appointments, loadingAppointments, error] = useCollection(
    user ? query(
      collection(db, 'citas'), 
      where('userId', '==', user.uid), 
      orderBy('fecha', 'desc')
    ) : null
  );

  if (loadingUser || loadingAppointments) {
    return <Spinner label="Cargando tu información..." className="flex justify-center items-center h-screen" />;
  }

  if (error) {
    return <p className="text-red-500 text-center mt-8">Error al cargar tus citas: {error.message}</p>;
  }

  if (!user) {
    return <p className="text-center mt-8">Por favor, inicia sesión para ver tu panel.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">¡Hola, {user.displayName || 'Usuario'}!</h1>
      <p className="text-lg text-gray-600 mb-8">Bienvenido a tu panel. Aquí puedes ver tus próximas citas.</p>

      <h2 className="text-2xl font-semibold mb-4">Mis Citas</h2>
      {appointments && appointments.docs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.docs.map(doc => (
            <Card key={doc.id} className="shadow-lg">
              <CardHeader>
                <p className="text-md font-bold">Servicio: {doc.data().servicio}</p>
              </CardHeader>
              <Divider />
              <CardBody>
                <p><span className="font-semibold">Fecha:</span> {doc.data().fecha}</p>
                <p><span className="font-semibold">Hora:</span> {doc.data().hora}</p>
              </CardBody>
              <Divider />
              <CardFooter>
                <p className="text-xs text-gray-500">Cita creada el: {doc.data().timestamp.toDate().toLocaleDateString()}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p>Aún no tienes ninguna cita agendada. ¡Anímate a programar una!</p>
      )}
    </div>
  );
}
