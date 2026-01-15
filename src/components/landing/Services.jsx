
import { Card, CardHeader, CardBody } from '@nextui-org/react';

// Un componente simple para un ícono de llave inglesa (wrench)
const WrenchIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

// Ícono para diagnóstico
const ActivityIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
);

// Ícono para frenos (un escudo)
const ShieldIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);

const services = [
  {
    title: "Mecánica General",
    description: "Reparaciones completas del motor, transmisión y más. Tu auto en manos expertas.",
    icon: <WrenchIcon className="w-8 h-8 text-primary" />
  },
  {
    title: "Diagnóstico por Computadora",
    description: "Tecnología de punta para identificar con precisión cualquier falla electrónica o mecánica.",
    icon: <ActivityIcon className="w-8 h-8 text-primary" />
  },
  {
    title: "Servicio de Frenos",
    description: "Inspección, reparación y cambio de balatas, discos y líquido de frenos para tu seguridad.",
    icon: <ShieldIcon className="w-8 h-8 text-primary" />
  },
];

export default function Services() {
  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Nuestros Servicios</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">Ofrecemos soluciones integrales para el cuidado de tu vehículo.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="flex items-center gap-4 p-6">
                {service.icon}
                <h3 className="text-xl font-bold">{service.title}</h3>
              </CardHeader>
              <CardBody className="p-6 pt-0">
                <p className="text-gray-700 dark:text-gray-300">{service.description}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
