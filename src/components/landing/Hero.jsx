
import { motion } from "framer-motion";

function Hero() {
  return (
    <div className="h-screen bg-cover bg-center flex items-center justify-center text-white" style={{backgroundImage: "url('https://placehold.co/1920x1080')"}}>
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-bold text-center"
      >
        Mecánica Portales: Expertos en el cuidado de tu motor
      </motion.h1>
    </div>
  );
}

export default Hero;
