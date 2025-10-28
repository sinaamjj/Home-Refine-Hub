import HeroSection from "@/components/HeroSection/HeroSection";
import ServiceCategories from "@/components/ServiceCategories/ServiceCategories";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import FeaturedExperts from "@/components/FeaturedExperts/FeaturedExperts";
import styles from "@/styles/Home.module.css";

const HomePage = () => (
  <main className={styles.main}>
    <HeroSection />
    <ServiceCategories />
    <HowItWorks />
    <FeaturedExperts />
  </main>
);

export default HomePage;
