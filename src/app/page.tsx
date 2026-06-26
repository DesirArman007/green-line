import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import SearchBar from '@/components/SearchBar/SearchBar';
import ClientsMarquee from '@/components/ClientsMarquee/ClientsMarquee';
import About from '@/components/About/About';
import Services from '@/components/Services/Services';
import PackagesPreview from '@/components/PackagesPreview/PackagesPreview';
import Fleet from '@/components/Fleet/Fleet';
import Testimonials from '@/components/Testimonials/Testimonials';
import VideoTestimonials from '@/components/VideoTestimonials/VideoTestimonials';
import Contact from '@/components/Contact/Contact';
import Booking from '@/components/Booking/Booking';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <main className={styles.heroSection}>
        <video autoPlay loop muted playsInline className={styles.videoBg}>
          <source src="/images/hero-video.mp4" type="video/mp4" />
        </video>
        <Navbar />
        <Hero />
        <div className={styles.bottomSection}>
          <SearchBar />
        </div>
      </main>
      <ClientsMarquee />
      <About />
      <Services />
      <PackagesPreview />
      <Fleet />
      <Testimonials />
      <VideoTestimonials />
      <Contact />
      <Booking />
      <Footer />
    </>
  );
}
