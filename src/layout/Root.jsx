import Footer from "@/Shared/footer/Footer";
import Hero from "@/Shared/hero/Hero";
import { Outlet } from "react-router-dom";





const Root = () => {
  return (
    <div className="h-screen">
         <Hero />
      <Outlet />

      <Footer/>



    </div>
  );
};

export default Root;
