
import { Button, Link } from '@nextui-org/react';

export default function Hero() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video de fondo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="https://videos.pexels.com/video-files/3137685/3137685-hd_1920_1080_25fps.mp4"
      />
      {/* Capa oscura para mejorar la legibilidad del texto */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10" />

      {/* Contenido centrado */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full h-full text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Taller Mecánico Portales
        </h1>
        <p className="text-lg md:text-2xl mb-8">
          Soluciones profesionales para tu vehículo.
        </p>
        <Button 
          as={Link} 
          href="/booking" /* Ruta corregida */
          color="primary" 
          size="lg" 
          variant="shadow"
        >
          Agendar una Cita
        </Button>
      </div>
    </div>
  );
}
