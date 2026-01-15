
import { Card, CardHeader, CardBody, Avatar } from '@nextui-org/react';

const testimonials = [
  {
    name: "Ana García",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    comment: "El servicio fue rápido, profesional y a un precio justo. Mi auto no había funcionado tan bien en años. ¡Totalmente recomendados!",
  },
  {
    name: "Carlos Martínez",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    comment: "Llevé mi coche por un ruido extraño que en otros talleres no supieron diagnosticar. Aquí dieron con el problema en minutos. Honestidad y conocimiento. Gracias.",
  },
  {
    name: "Laura Rodríguez",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    comment: "Excelente atención al cliente. Me explicaron todo el proceso con paciencia y me mantuvieron informada. Da gusto encontrar gente tan profesional y amable.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">La Opinión de Nuestros Clientes</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">Tu confianza es nuestro mayor logro.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="shadow-lg">
              <CardHeader className="flex gap-3 p-6">
                <Avatar isBordered src={testimonial.avatar} />
                <div className="flex flex-col">
                  <p className="text-md font-bold">{testimonial.name}</p>
                </div>
              </CardHeader>
              <CardBody className="p-6 pt-0">
                <p className="text-gray-700 dark:text-gray-300">“{testimonial.comment}”</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
