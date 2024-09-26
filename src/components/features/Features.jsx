import team from "../../assets/teamImg.jpg"; // Replace with the real image paths
import collab from "../../assets/teamCollaboration.jpg"; // Replace with the real image paths
import task from "../../assets/task management.jpg"; // Replace with the real image paths
import secure from "../../assets/secure.jpg"; // Replace with the real image paths
import CommonButton from "../commonButton/CommonButton";
// import success from "../../assets/sucess.jpg"; // Replace with the real image paths

const Features = () => {
  return (
    <div className="bg-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-center min-h-screen  py-10 px-20 max-w-7xl mx-auto">
        {/* Left Section */}
        <div className="flex flex-col md:w-1/2 text-center md:text-left md:mr-10">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Discover power of team work
          </h2>
          <p className="text-gray-500 mb-2">
            Manage your tasks efficiently with FlowMate’s intuitive task
            management features, helping you assign, track, and complete
            projects with ease.
          </p>
          <p className="text-gray-500 mb-2">
            Whether your team is in the office or remote, FlowMate keeps
            everyone connected with integrated video conferencing and chat
            features.
          </p>{" "}
          <p className="text-gray-500 mb-6">
            Keep track of project progress visually with Gantt charts and
            timelines, ensuring every team member stays on schedule and meets
            deadlines.
          </p>
          <div className="w-60">
            <CommonButton text=" Register an Account" />
          </div>
        </div>
        {/* Right Section */}
        <div className="relative flex m-10 border-gray-950 border-2 py-32 rounded-full flex-col md:flex-row justify-center items-center md:w-1/2">
          {/* Top Middle Image (Half inside, half outside border) */}
          <img
            src={task}
            alt="Top Middle"
            className="absolute top-0 left-1/2 w-28 h-28 rounded-full border-2 border-gray-300"
            style={{ transform: "translate(-50%, -50%)" }}
          />

          {/* Bottom Middle Image (Half inside, half outside border) */}
          <img
            src={collab}
            alt="Bottom Middle"
            className="absolute bottom-0 left-1/2 w-28 h-28 rounded-full border-2 border-gray-300"
            style={{ transform: "translate(-50%, 50%)" }}
          />

          {/* Left Middle Image (Half inside, half outside border) */}
          <img
            src={secure}
            alt="Left Middle"
            className="absolute left-0 top-1/2 w-28 h-28 rounded-full border-2 border-gray-300"
            style={{ transform: "translate(-50%, -50%)" }}
          />

          {/* Right Middle Image (Half inside, half outside border) */}
          <img
            src={team}
            alt="Right Middle"
            className="absolute right-0 top-1/2 w-28 h-28 rounded-full border-2 border-gray-300"
            style={{ transform: "translate(50%, -50%)" }}
          />

          {/* Card in the Center */}
          <div className="bg-white w-60 items-center rounded-xl shadow-lg p-6 flex flex-col m-4 z-10">
            <h3 className=" text-center text-light text-md mb-2">
              {" "}
              Share important documents and files securely with your team using
              FlowMate's encrypted file sharing feature.
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
