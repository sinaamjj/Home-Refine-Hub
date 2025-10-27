import Navbar from "@/components/Navbar/Navbar";
import HeroSection from "@/components/HeroSection/HeroSection";
import ServiceCategories from "@/components/ServiceCategories/ServiceCategories";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import FeaturedExperts from "@/components/FeaturedExperts/FeaturedExperts";
import Footer from "@/components/Footer/Footer";
import styles from "@/styles/Home.module.css";

const App = () => (
  <div className={styles.page}>
    <Navbar />
    <main className={styles.main}>
      <HeroSection />
      <ServiceCategories />
      <HowItWorks />
      <FeaturedExperts />
    </main>
    <Footer />
  </div>
);

export default App;
