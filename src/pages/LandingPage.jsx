
import HeroCarousel from '../components/landing/HeroCarousel';
import Services from '../components/landing/Services';
import AboutUs from '../components/landing/AboutUs';
import Testimonials from '../components/landing/Testimonials';
import Footer from '../components/landing/Footer';

export default function LandingPage() {
  return (
    <div>
      <HeroCarousel />
      <Services />
      <AboutUs />
      <Testimonials />
      <Footer />
    </div>
  );
}
