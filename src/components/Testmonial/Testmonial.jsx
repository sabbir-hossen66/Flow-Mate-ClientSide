// import { useEffect, useState, useRef } from "react";
// import UseAxiosCommon from "@/hooks/UseAxiosCommon";
// import { Star } from "lucide-react";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";

// const Testmonial = () => {
//   const axiosCommon = UseAxiosCommon();
//   const [feedbacks, setFeedbacks] = useState([]);
//   const swiperRef = useRef(null); // To control Swiper manually

//   useEffect(() => {
//     axiosCommon
//       .get("feedbacks")
//       .then((response) => {
//         setFeedbacks(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, [axiosCommon]);

//   const handleSlideLeft = () => {
//     if (swiperRef.current) {
//       swiperRef.current.slidePrev();
//     }
//   };

//   const handleSlideRight = () => {
//     if (swiperRef.current) {
//       swiperRef.current.slideNext();
//     }
//   };
//   const defaultImage = 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
//   return (
//     <div className=" bg-[#d3e3f3] mx-auto ">
//       <div className="text-center pt-10">
//         <h1 className="text-2xl md:text-4xl font-bold pb-5">
//         Some real-life feedback from our customers
//         </h1>
//         <p className="text-muted-foreground text-sm md:text-base max-w-3xl mx-auto">
//         For over a decade, more than 50,000 teams made Real Work happen with FlowMate.  Here are the thoughts from our team on how collaboration helps
//         us achieve success together.
//         </p>
//       </div>
     
      
//       <div className="container mx-auto rounded-2xl text-black">
//   <div className="lg:px-20 px-5 py-5 lg:py-20">
//     {/* Swiper Implementation for Sliding Cards */}
//     <div className="rounded-2xl flex-1 lg:w-full gap-8">
//       <Swiper
//         spaceBetween={50} // Adjusted spacing
//         slidesPerView={3} // Number of visible slides
//         loop={true}
//         pagination={{ clickable: true }}
//         onSwiper={(swiper) => (swiperRef.current = swiper)}
//         className="swiper-container"
//       >
//         {feedbacks.map((feedback, index) => (
//           <SwiperSlide key={index}>
//             {/* Feedback Card */}
//             <div className="relative h-96 w-80 overflow-visible"> {/* Make the card's overflow visible */}
//               {/* User Image */}
//               <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full border-4 border-white z-10">
//                 <img
//                   src={feedback.image ? feedback.image : defaultImage} // Fallback to default image if image is unavailable
//                   alt={feedback.name}
//                   className="w-full h-full object-cover"
//                 />
//               </div>

//               {/* Card Content */}
//               <div className="mt-20 text-center bg-white rounded-lg shadow-lg p-8 h-full"> {/* Added background and padding */}
//                 {/* Stars */}
//                 <div className="flex justify-center mb-4">
//                   {Array.from({ length: 5 }).map((_, i) => (
//                     <span
//                       key={i}
//                       className={`${
//                         i < feedback.rating ? 'text-yellow-500' : 'text-gray-300'
//                       }`}
//                     >
//                       ★
//                     </span>
//                   ))}
//                 </div>

//                 {/* Review Text */}
//                 <p className="text-gray-600 text-center mb-4">
//                   {feedback.feedback}
//                 </p>

//                 {/* Reviewer Name */}
//                 <p className="font-bold text-lg text-center">
//                   {feedback.name}
//                 </p>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   </div>
// </div>

//           </div>
//   );
// };

// export default Testmonial;

import { useEffect, useState, useRef } from "react";
import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Testimonial = () => {
  const axiosCommon = UseAxiosCommon();
  const [feedbacks, setFeedbacks] = useState([]);
  const swiperRef = useRef(null); // To control Swiper manually
  const [visibleSlides, setVisibleSlides] = useState(1); // Track the number of visible slides

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

  const defaultImage =
    "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  // Update the number of visible slides based on the Swiper breakpoints
  const updateVisibleSlides = (swiper) => {
    const breakpoints = swiper.params.breakpoints;
    const currentWidth = window.innerWidth;
    let slides = 1;

    if (breakpoints[1280] && currentWidth >= 1280) slides = 3;
    else if (breakpoints[1024] && currentWidth >= 1024) slides = 2;
    else if (breakpoints[640] && currentWidth >= 640) slides = 1;

    setVisibleSlides(slides);
  };

  return (
    <div className=" mx-auto p-10">
      <div className="text-center pb-10">
        <h1 className="text-2xl md:text-4xl font-bold mb-5">
          Some real-life feedback from our customers
        </h1>
        <p className="text-gray-600 text-sm md:text-base max-w-3xl mx-auto">
          For over a decade, more than 50,000 teams made Real Work happen with
          FlowMate. Here are the thoughts from our team on how collaboration
          helps us achieve success together.
        </p>
      </div>

      <div className="container mx-auto px-5 py-5">
        {/* Swiper Implementation for Sliding Cards */}
        <Swiper
          spaceBetween={30}
          slidesPerView={1} // One visible card on small screens, can be adjusted
          breakpoints={{
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 2 },
            1280: { slidesPerView: 3 }, // Three visible cards on larger screens
          }}
          loop={true}
          pagination={{ clickable: true }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            updateVisibleSlides(swiper); // Call this to initialize the visible slides count
          }}
          onResize={(swiper) => updateVisibleSlides(swiper)} // Update on window resize
        >
          {feedbacks.map((feedback, index) => {
            const middleIndex = Math.floor(visibleSlides / 2);

            return (
              <SwiperSlide key={index}>
                {/* Determine if this is the middle card */}
                <div
                  className={`relative p-8 rounded-xl shadow-lg overflow-visible transition-transform transform hover:scale-105 w-96 h-80 grou-hover:text-white 
                  ${index % visibleSlides === middleIndex ? "bg-[#00053d] text-white" : "bg-white hover:bg-[#00053d] hover:text-white"}
                  `}
                >
                  {/* User Image */}
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full border-4 border-white overflow-hidden z-20 ">
                    <img
                      src={feedback.image ? defaultImage : feedback.image}
                      alt={feedback.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="mt-20 text-center pt-12">
                    {/* Stars */}
                    <div className="flex justify-center mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`${
                            i < feedback.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          } text-xl`}
                        >
                          ★
                        </span>
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-500 mb-6 leading-relaxed hover:text-white">
                      {feedback.feedback}
                    </p>

                    {/* Reviewer Name */}
                    <p className="font-bold text-lg text-gray-900 hover:text-white">
                      {feedback.name}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
