// import Features from "@/components/features/Features";
import { FAQ } from "./../../components/FAQ";
import PricingPlans from "./../../components/PricingPlans";
import Newsletters from "@/components/newsletters/Newsletters";
import Testmonial from "@/components/Testmonial/Testmonial";

// import Navbar from "@/Shared/Navbar";
import HeroSection from "./components/HeroSection";
import MarqueeSection from "./components/MarqueeSection";
import { BannerImage } from "./components/BannerImage";
import Features from "./components/Features";
// import ModalPage from "@/components/modalPage/ModalPage";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <BannerImage />
      <MarqueeSection />
      {/* <HeroHeaderSection /> */}
      {/* <Banner /> */}

      {/* <ModalPage /> */}

      {/* <MarketingComponent /> */}
      <Features />
      {/* <OurTeams /> */}

      <PricingPlans />
      <Testmonial />
      <Newsletters />
      <FAQ />
      {/* <Contact></Contact> */}
    </div>
  );
};

export default Home;
