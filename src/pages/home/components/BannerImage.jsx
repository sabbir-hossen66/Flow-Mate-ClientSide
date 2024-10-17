import Container from "@/components/Container";
import { ShineBorder } from "@/components/ui/border";
import { useTheme } from "next-themes";
import photo from '../../../../public/images/screenshot.png'
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
export function BannerImage() {
  const theme = useTheme();
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,   
      offset: 150,
    });
  }, []);
  return (
    <Container data-aos="fade-down-right" className="my-8 md:my-10">
      <ShineBorder
        className="text-center text-2xl font-bold capitalize"
        color={theme.theme === "dark" ? "white" : "black"}
      >
        <Container className="w-full  ">
          <img
            className="w-full rounded-[14px]"
            src={photo}
            alt=""
          />
        </Container>
      </ShineBorder>
    </Container>
  );
}
