import { useNavigate } from "react-router-dom";
import line from '../../../assets/line.png.png'

const DashBoardCards = () => {
  const navigate = useNavigate();

  // Sample card data (could be dynamic or fetched from API)
  const cardData = [
    {
      title: "Total Task",
      count: 50,
      color: "bg-white",
      description: "Tasks assigned to you",
      navigateTo: "/tasks/total",
      icon: "📊",
    },
    {
      title: "Complete Task",
      count: 30,
      color: "bg-white",
      description: "Completed tasks overview",
      navigateTo: "/tasks/complete",
      icon: "✅",
    },
    {
      title: "Task In Progress",
      count: 15,
      color: "bg-white",
      description: "Ongoing tasks you're ",
      navigateTo: "/tasks/in-progress",
      icon: "⚙️",
    },
    {
      title: "Todo's Task",
      count: 5,
      color: "bg-white",
      description: "Upcoming tasks to be done",
      navigateTo: "/tasks/todo",
      icon: "📝",
    },
  ];

  const handleCardClick = (path) => {
    navigate(path); // Navigate to the respective page when a card is clicked
  };
  return (
    <div>
      <div className="lg:flex lg:justify-between gap-6 pb-10 ">
        {cardData[0] && (
          <div className="flex flex-col lg:flex-row lg:w-full lg:justify-between bg-white hover:shadow-md rounded-lg ">
            <div
              onClick={() => handleCardClick(cardData[0].navigateTo)}
              className={`cursor-pointer  text-black  p-6 lg:p-8 w-full lg:w-1/2 flex flex-col items-start hover:scale-105 transform transition-transform duration-300`}
            >
              <div className="text-base mb-8 font-bold text-gray-600">{cardData[0].description}</div>
              <h2 className="text-6xl font-bold mb-4">{cardData[0].count}</h2>
              <p className="text-xl ">{cardData[0].title}</p>

            </div>
            <div>
              <img className="h-60 w-96" src={line} alt="" />
            </div>
          </div>
        )}

      </div>


      {/* show 3 data */}
      <div className="lg:flex lg:justify-between gap-6 ">
        {cardData.slice(-3).map((card, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(card.navigateTo)}
            className={`cursor-pointer ${card.color} text-black rounded-lg shadow-lg p-6 lg:p-8 w-96 lg:w-[276px]  flex flex-col items-start hover:scale-105 transform transition-transform duration-300 hover:shadow-gray-200`}
          >
            <div className="text-base mb-8 font-bold text-gray-600">{card.description}</div>
            <h2 className="text-6xl font-bold mb-4">{card.count}</h2>
            <p className="text-xl ">{card.title} </p>
            {/* <p className="text-sm">{card.description}</p> */}
          </div>
        ))}
      </div>



    </div>
  );
};

export default DashBoardCards;