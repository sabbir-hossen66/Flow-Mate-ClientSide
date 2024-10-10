import { useNavigate } from "react-router-dom";


const DashBoardCards = () => {
  const navigate = useNavigate();

  // Sample card data (could be dynamic or fetched from API)
  const cardData = [
    {
      title: "Total Task",
      count: 50,
      color: "bg-blue-500",
      description: "Tasks assigned to you",
      navigateTo: "/tasks/total",
      icon: "📊",
    },
    {
      title: "Complete Task",
      count: 30,
      color: "bg-green-500",
      description: "Completed tasks overview",
      navigateTo: "/tasks/complete",
      icon: "✅",
    },
    {
      title: "Task In Progress",
      count: 15,
      color: "bg-yellow-500",
      description: "Ongoing tasks you're working on",
      navigateTo: "/tasks/in-progress",
      icon: "⚙️",
    },
    {
      title: "Todo's Task",
      count: 5,
      color: "bg-red-500",
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
      <div className="lg:flex lg:justify-between gap-6">
        {cardData.map((card, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(card.navigateTo)}
            className={`cursor-pointer ${card.color} text-white rounded-lg shadow-lg p-6 lg:p-8 w-full lg:w-1/2  flex flex-col items-center hover:scale-105 transform transition-transform duration-300`}
          >
            <div className="text-3xl mb-4">{card.icon}</div>
            <h2 className="text-2xl font-bold mb-4">{card.title}</h2>
            <p className="text-xl mb-4">{card.count} Tasks</p>
            {/* <p className="text-sm">{card.description}</p> */}
          </div>
        ))}
      </div>



    </div>
  );
};

export default DashBoardCards;