import { useEffect, useState } from "react";
import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import { Star } from "lucide-react";

const Testmonial = () => {
  const axiosCommon = UseAxiosCommon();

  const [feedbacks, setFeedbacks] = useState([]);
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

  return (
    <div>
      <section className="bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl">
            What our <span className="text-blue-500">team</span> says
          </h1>

          <p className="max-w-2xl mx-auto mt-6 text-center text-gray-500">
            Here are the thoughts from our team on how collaboration helps us
            achieve success together.
          </p>

          <section className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 md:grid-cols-2 lg:grid-cols-3">
            {feedbacks
              .slice(Math.max(feedbacks.length - 6, 0))
              .map((feedback) => (
                <div
                  key={feedback._id}
                  className="p-8 border rounded-lg hover:bg-blue-500 bg-white hover:text-white transition-all duration-300 ease-in-out animate-fadeIn"
                >
                  <p className="leading-loose">{feedback.feedback}</p>

                  <div className="flex items-center mt-8 -mx-2">
                    <img
                      className="object-cover mx-2 rounded-full w-14 h-14 ring-4 ring-blue-300"
                      src={feedback.image}
                      alt={feedback.name}
                    />
                    <div className="mx-2">
                      <h1 className="font-semibold">{feedback.name}</h1>
                      <div className="flex">
                        {Array.from({ length: feedback.rating }).map((_, i) => (
                          <Star key={i} className="text-yellow-500"></Star>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </section>
        </div>
      </section>
    </div>
  );
};

export default Testmonial;
