
import { Card, CardBody } from "@nextui-org/react";
import { Image } from "@nextui-org/react";

export default function AboutUs() {
  return (
    <section className="py-12 md:py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Sobre Nosotros</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">Conoce la historia detrás de nuestro taller.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-bold mb-4">Más de 20 Años de Pasión por la Mecánica</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Desde nuestra fundación en el corazón de Portales, nuestro taller ha crecido gracias a un compromiso inquebrantable con la calidad y la honestidad. Somos un equipo de mecánicos certificados y apasionados por los autos, dedicados a ofrecer un servicio en el que puedes confiar.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Nuestra misión es simple: mantener tu vehículo seguro y en óptimas condiciones, utilizando las mejores piezas y la tecnología más avanzada, pero siempre con un trato cercano y transparente. Tu tranquilidad es nuestro motor.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <Card className="shadow-xl">
                <CardBody className="overflow-visible p-0">
                    <Image
                        isZoomed
                        width="100%"
                        alt="Imagen del interior de un taller mecánico"
                        src="https://images.pexels.com/photos/4488636/pexels-photo-4488636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        className="w-full object-cover h-[300px]"
                    />
                </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
