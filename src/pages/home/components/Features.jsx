import Container from "@/components/Container";
import { Command, Layout, ListFilter, TextQuote, Users } from "lucide-react";
import { IoNotificationsSharp } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Timeline from "../../../../public/images/features/image .png";
import Board from "../../../../public/images/features/board.png";
import List from "../../../../public/images/features/list.png";

import "../style.css";

import { Autoplay } from "swiper/modules";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const features = [
  {
    id: 1,
    title: "Board",
    description:
      "Manage your issues in a real-time automated kanban board with a drag and drop interface.",
    icon: <Layout />,
    image: Board,
  },
  {
    id: 2,
    title: "List",
    description:
      "Browse your issues and group them by labels, assignees, milestones, and more.",
    icon: <TextQuote />,
    image: List,
  },
  {
    id: 3,
    title: "Timeline",
    description:
      "With features like real-time collaboration and a chat system, you can work with your team seamlessly.",
    icon: <Users />,
    image: Timeline,
  },
];
useEffect(() => {
  AOS.init({
    duration: 1000,
    once: false,   
    offset: 150,
  });
}, []);
const Features = () => {
  return (
    <Container className="my-24 md:my-32">
      <div className="text-center">
        <h1 className="text-2xl md:text-4xl font-bold pb-5">
          Breeze through issues at lighting speed
        </h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-3xl mx-auto">
          Having trouble keeping track of your issues and their corresponding
          status as well as your team progress? Volta introduces the ultimate
          solution to manage your GitHub issues.
        </p>
      </div>

      <div className="mt-10">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper"
        >
          <div className="w-full bg-slate-100 mx-auto ">
            {features.map(({ id, title, description, icon, image }) => (
              <SwiperSlide key={id}>
                <Container className="relative w-full">
                  <img
                    className="bg-slate-100 rounded-2xl w-full"
                    src={image}
                    alt=""
                  />
                  <div className=" h-1/2 w-1/2 md:h-1/4 md:w-1/3 absolute  bottom-2 left-2 md:bottom-8 md:left-8   rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border p-2  border-blue-400">
                    <div className="flex text-blue-800 justify-start items-center">
                      <div className="text-sm md:text-base space-x-2">
                        {icon}
                      </div>
                      <h1 className=" text-base md:text-xl font-bold">
                        {title}
                      </h1>
                    </div>

                    <p className=" leading-none text-slate-900 text-justify lg:py-1 text-[10px] md:text-sm">
                      {description}
                    </p>
                  </div>
                </Container>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>

      {/* Bento Grid */}

      <div className="grid sm:grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 my-10 md:my-16 ">
        <div className="col-span-2 bg-slate-100 text-gray-950 rounded-xl p-5 ">
          <ListFilter className="w-10 h-10 border rounded-xl p-2 border-slate-500" />

          <h1 className="text-2xl font-bold text-blue-800 py-2">
            Advance Filters
          </h1>
          <p className="text-zinc-800">
            Filter your notifications ans issue by any property with logical
            operators
          </p>
          <img
            className="pt-4"
            src="/images/features/filters.svg" // Directly reference the public folder
            alt="Filter icon"
            style={{ filter: "invert(1)" }}
          />
        </div>
        <div className="col-span-2 col-start-1 row-start-2 bg-slate-200 text-gray-950 rounded-xl pt-5 pl-5">
          <div className="flex justify-between">
            <div>
              <Command className="w-10 h-10 border rounded-xl p-2 border-slate-500" />

              <h1 className="text-2xl font-bold text-blue-800 py-2">
                Keyboard-first Design
              </h1>
              <p className="text-zinc-800">
                Optimize for efficient keyboard navigation and shortcut for
                everything
              </p>
            </div>
            <img
              className="pt-4"
              src="/images/features/shortcuts.svg"
              alt=""
              style={{ filter: "invert(1)" }}
            />
          </div>
        </div>
        <div className="row-span-2 col-start-3 row-start-1 bg-slate-100 text-gray-950  rounded-xl pl-5 pt-5 ">
          <IoNotificationsSharp className="w-10 h-10 border rounded-xl p-2 border-slate-500" />

          <h1 className="text-2xl font-bold text-blue-800 py-2">
            Realtime Notification
          </h1>
          <p className="text-zinc-800">
            Get notified of new issues, comments, and updates in real-time.
          </p>
          <img
            className="pt-4 pl-20"
            src="/images/features/editor.svg"
            alt=""
            style={{ filter: "invert(1)" }}
          />
        </div>
      </div>
    </Container>
  );
};

export default Features;
