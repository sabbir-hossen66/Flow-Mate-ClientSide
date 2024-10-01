import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

// TaskCard Component
const TaskCard = () => {
  const {
    isLoading,
    error,
    data: createTask,
    refetch,
  } = useQuery({
    queryKey: ["createTask"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/createTask");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading products</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-1 items-center bg-gray-100 gap-6 p-4">
      {/* Iterate over each task in the fakeTasks array */}

      {createTask?.map((task, index) => (
        <div
          key={index}
          className="bg-white w-80 p-4 rounded-lg shadow-lg my-2"
        >
          {/* Priority */}
          <Link to="taskDetails">
            <div className="text-blue-500 text-xs font-semibold mb-2 uppercase">
              {task?.priority}
            </div>

            {/* Task Title */}
            <div className="text-xl font-semibold mb-5">
              {task?.taskTitle.slice(0, 50)}..
            </div>

            {/* Task Date */}

            <div className="text-gray-500 text-sm mb-3">
              {" "}
              Started Date: {new Date(task?.startDate).toLocaleDateString()}
            </div>

            {/* Task Details */}
            <div className="flex items-center justify-between mb-3">
              {/* Comments */}
              <div className="flex items-center text-gray-600 text-sm">
                <span className="mr-1">💬</span>
                Added Comment: {task?.commentsCount}
              </div>

              {/* Attachments */}
              {/* <div className="flex items-center text-gray-600 text-sm">
              <span className="mr-1">📎</span>
              {task?.attachmentsCount}
            </div> */}

              {/* Subtask Progress */}
              {/* <div className="text-gray-600 text-sm">
              {task?.subtaskCompleted}/{task?.subtaskTotal}
            </div> */}
            </div>

            {/* Member Avatars */}
            {/* <div className="flex mb-3">
            {task?.members.map((member, index) => (
              <div
                key={index}
                className="bg-gray-300 text-xs text-white font-bold w-8 h-8 flex items-center justify-center rounded-full -ml-2 border-2 border-white"
              >
                {member}
              </div>
            ))}
          </div> */}
            <div className="flex mb-3 items-center">
              <span className="items-center mr-3">Assigned to: </span>{" "}
              <h1 className="bg-blue-400 text-xs text-white font-bold  flex items-center justify-center rounded-full px-4 py-2 border-2 border-white">
                {task?.assignedTo}
              </h1>
            </div>

            {/* Task Label */}
            {/* <div className="flex items-center">
            <div className="text-sm text-gray-500">{task?.taskDate}</div>
            <div className="ml-4 bg-blue-100 text-blue-500 text-xs px-3 py-1 rounded-full">
              {task?.label}
            </div>
          </div> */}

            {/* Add Subtask */}
            <div className="text-gray-500 text-xs mt-3 cursor-pointer">
              + ADD SUBTASK
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default TaskCard;
