
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react';
import UpcomingAppointments from '../components/admin/UpcomingAppointments'; // Corregida
import ServiceManager from '../components/admin/ServiceManager';         // Corregida
import ScheduleManager from '../components/admin/ScheduleManager';       // Corregida

export default function AdminPage() {

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Panel de Administrador</h1>
      
      <Tabs aria-label="Opciones de Administración" color="primary" variant="bordered">
        <Tab key="citas" title="Próximas Citas">
          <Card>
            <CardBody>
              <UpcomingAppointments />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="servicios" title="Gestionar Servicios">
          <Card>
            <CardBody>
              <ServiceManager />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="horarios" title="Gestionar Horarios">
          <Card>
            <CardBody>
              <ScheduleManager />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="reportes" title="Reportes y Estadísticas">
          <Card>
            <CardBody>
              <p>Próximamente: Aquí podrás ver reportes detallados y estadísticas de tu negocio.</p>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
