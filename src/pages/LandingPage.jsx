
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import Services from '../components/landing/Services';
import About from '../components/landing/About';
import Testimonials from '../components/landing/Testimonials';
import Footer from '../components/landing/Footer';

function LandingPage() {
  return (
    <div className="bg-white text-gray-800">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default LandingPage;
