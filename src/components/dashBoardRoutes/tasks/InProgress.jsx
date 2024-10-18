import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux"; // Assuming the user's email is stored in Redux

const InProgress = () => {
  const user = useSelector((state) => state.auth.user); // Fetch user's email from Redux

  if (!user) {
    return <div>Please log in to see your tasks.</div>;
  }

  const {
    isLoading,
    error,
    data: tasks = [], // Set default to an empty array to avoid errors if data is undefined
  } = useQuery({
    queryKey: ["tasks", user.email], // Include email in queryKey
    queryFn: async () => {
      const res = await fetch(
        `https://flowmate-a-team-collaboration-tool.vercel.app/createTask?email=${user.email}`
      ); // Fetch all tasks for the logged-in user
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
  });

  if (isLoading) {
    return <div>Loading.....</div>;
  }

  if (error) {
    return <div>Error loading tasks</div>;
  }

  // Filter tasks to get only those in "in progress" stage
  const inProgressTasks = tasks.filter(
    (task) => task.stage === "in progress" && task.email === user.email
  );

  return (
    <div className="p-4 w-80 mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        In Progress Tasks
      </h2>
      <div>
        {inProgressTasks.length === 0 ? (
          <div className="text-gray-500">No tasks in progress recently</div>
        ) : (
          inProgressTasks.map((task) => (
            <div
              key={task._id}
              className="p-2 mb-2 bg-gray-100 rounded-md flex justify-between items-center"
            >
              <span
                className={`text-gray-800 ${
                  task.completed ? "line-through" : ""
                }`}
              >
                {task.taskTitle.slice(0, 35)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InProgress;
