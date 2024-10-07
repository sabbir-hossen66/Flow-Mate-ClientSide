import { useEffect, useState, useRef } from "react";
import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper styles
import { Star } from "lucide-react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Container from "../Container";

const Testimonial = () => {
  const axiosCommon = UseAxiosCommon();

  const [feedbacks, setFeedbacks] = useState([]);
  const swiperRef = useRef(null); // Ref for Swiper instance

  useEffect(() => {
    axiosCommon
      .get("feedbacks")
      .then((response) => {
        setFeedbacks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [axiosCommon]);

  const handleSlideLeft = () => {
    swiperRef.current.slidePrev(); // Navigate to previous slide
  };

  const handleSlideRight = () => {
    swiperRef.current.slideNext(); // Navigate to next slide
  };

  return (
    <div>
      <Container className=" bg-gradient-to-b from-[#1e3a8a] to-[#299edd] text-white ">
        <div className=" px-20 py-20">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="my-auto space-y-4 flex-1">
              <h1 className="text-xl font-bold">Clients Feedback</h1>
              <h2 className="text-3xl font-bold">
                What Our Happy <br />
                Customers Are Saying
              </h2>
              <p className="text-sm">
                Here are the thoughts from our team on how collaboration helps
                us achieve success together. And review from our talented users
                who are using this extra-ordinary team collaboration tool.
              </p>
            </div>

            {/* Swiper Implementation for Sliding Cards */}
            <div className="bg-white p-14 rounded-2xl flex-1 lg:w-[600px]">
              <Swiper
                spaceBetween={20}
                slidesPerView={1}
                loop={true}
                navigation={true} // Add navigation arrows
                pagination={{ clickable: true }} // Add pagination dots
                className="swiper-container"
                onSwiper={(swiper) => (swiperRef.current = swiper)} // Set Swiper reference
              >
                {feedbacks.map((feedback, index) => (
                  <SwiperSlide key={index}>
                    <div className="bg-white rounded-xl shadow-sm sm:flex h-60">
                      <div className="shrink-0 w-60 relative rounded-xl overflow-hidden pt-[40%] sm:max-w-60 md:max-w-xs">
                        <img
                          className="size-full absolute top-0 start-0 object-cover"
                          src={feedback.image} // Dynamic Image
                          alt={feedback.name}
                        />
                      </div>
                      <div className="flex flex-wrap">
                        <div className="px-8 py-2 flex flex-col h-full">
                          <h3 className="text-lg font-bold text-gray-800 py-3">
                            {feedback.name} {/* Dynamic Name */}
                          </h3>
                          <div className="flex items-center">
                            {Array.from({ length: feedback.rating }, (_, i) => (
                              <Star key={i} className="text-yellow-400" />
                            ))}
                          </div>
                          <p className="mt-1 text-gray-500">
                            {feedback.feedback} {/* Dynamic Comment */}
                          </p>
                          <div className="mt-5 sm:mt-auto flex gap-5">
                            <button className="bg-black p-3 rounded-full text-yellow-600" onClick={handleSlideLeft}><FaChevronLeft /></button>  
                            <button className="bg-black p-3 rounded-full text-yellow-600"  onClick={handleSlideRight}><FaChevronRight /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Testimonial;
