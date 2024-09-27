import { useNavigate } from "react-router-dom";

const TaskDetails = () => {
  const navigate = useNavigate();

  // Example task data (replace with dynamic data if needed)
  const task = {
    taskTitle: "Test Low Task",
    createdAt: "Thu Mar 14 2024",
    priority: "LOW PRIORITY",
    status: "COMPLETED",
    assets: [
      { id: 1, img: "asset1.jpg", alt: "Asset 1" },
      { id: 2, img: "asset2.jpg", alt: "Asset 2" },
      { id: 3, img: "asset3.jpg", alt: "Asset 3" },
    ],
    subTasks: 2,
    description:
      "Switches are a pleasant interface for toggling a value between two states, and offer the same semantics and keyboard navigation as native checkbox elements.",
    members: [
      { id: "CA", name: "Codewave Asante", role: "Administrator" },
      { id: "JS", name: "Jane Smith", role: "Product Manager" },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold">{task.taskTitle}</h1>
        <button
          onClick={() => navigate("/")}
          className="text-blue-500 underline cursor-pointer"
        >
          ← Back to Task List
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button className="text-blue-600 py-2 px-4 font-medium border-b-2 border-blue-600">
          Task Detail
        </button>
      
      </div>

      {/* Main Content */}
      <div className="flex justify-between mb-8">
        {/* Left Column */}
        <div className="w-1/2">
          {/* Priority and Status */}
          <div className="flex items-center mb-4">
            <span className="bg-blue-100 text-blue-500 px-3 py-1 text-xs rounded-full mr-2">
              {task.priority}
            </span>
            <span className="bg-green-100 text-green-500 px-3 py-1 text-xs rounded-full">
              {task.status}
            </span>
          </div>

          {/* Created At */}
          <div className="text-gray-500 text-sm mb-4">
            Created At: {task.createdAt}
          </div>

          {/* Assets and Sub-Tasks */}
          <div className="text-gray-700 font-medium mb-4">
            Assets: {task.assets.length} | Sub-Task: {task.subTasks}
          </div>

          {/* Task Team */}
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-600 mb-2">TASK TEAM</h2>
            <div>
              {task.members.map((member) => (
                <div key={member.id} className="flex items-center mb-2">
                  <div className="bg-blue-500 text-white text-xs font-bold w-8 h-8 flex items-center justify-center rounded-full mr-3">
                    {member.id}
                  </div>
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-gray-500">{member.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-1/2">
          {/* Task Description */}
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-600 mb-2">
              TASK DESCRIPTION
            </h2>
            <p className="text-gray-700">{task.description}</p>
          </div>

          {/* Assets */}
          <div>
            <h2 className="text-lg font-medium text-gray-600 mb-2">ASSETS</h2>
            <div className="grid grid-cols-3 gap-2">
              {task.assets.map((asset) => (
                <img
                  key={asset.id}
                  src={asset.img}
                  alt={asset.alt}
                  className="w-full h-auto rounded-lg shadow"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
