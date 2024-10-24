import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";
import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import { useEffect } from "react";

const DragAndDrop = () => {
  const { teamName } = useLoaderData();
  const axiosCommon = UseAxiosCommon();

  // Function to fetch tasks by stage
  const fetchTasksByStage = async (stage) => {
    if (teamName) {
      const { data } = await axiosCommon.get(
        `/createTask/tasksByStage/${teamName}/${stage}`
      );
      return data;
    } else {
      throw new Error("Team name is missing");
    }
  };

  // Fetch tasks for each stage using TanStack Query
  const {
    data: todoTasks = [],
    isLoading: isLoadingTodo,
    error: errorTodo,
  } = useQuery({
    queryKey: ["tasks", teamName, "todo"],
    queryFn: () => fetchTasksByStage("todo"),
    enabled: !!teamName,
  });

  const {
    data: inProgressTasks = [],
    isLoading: isLoadingInProgress,
    error: errorInProgress,
  } = useQuery({
    queryKey: ["tasks", teamName, "in progress"],
    queryFn: () => fetchTasksByStage("in progress"),
    enabled: !!teamName,
  });

  const {
    data: completedTasks = [],
    isLoading: isLoadingCompleted,
    error: errorCompleted,
  } = useQuery({
    queryKey: ["tasks", teamName, "done"],
    queryFn: () => fetchTasksByStage("done"),
    enabled: !!teamName,
  });

  // Log the team name
  useEffect(() => {
    console.log("teamName from loader:", teamName);
  }, [teamName]);

  // Render loading states
  if (isLoadingTodo || isLoadingInProgress || isLoadingCompleted) {
    return <div>Loading...</div>;
  }

  // Render error states
  if (errorTodo || errorInProgress || errorCompleted) {
    console.error(
      "Error loading tasks:",
      errorTodo || errorInProgress || errorCompleted
    );
    return (
      <div>
        Error loading tasks:{" "}
        {errorTodo?.message ||
          errorInProgress?.message ||
          errorCompleted?.message}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-3 px-5 py-10">
      {/* To Do List */}
      <div className="p-4 w-full bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">To Do</h2>
        {todoTasks.length === 0 ? (
          <div className="text-gray-500">No tasks to do</div>
        ) : (
          todoTasks.map((todo) => (
            <div
              key={todo._id}
              className="p-2 mb-2 bg-gray-100 rounded-md flex justify-between items-center"
            >
              <span
                className={`text-gray-800 ${
                  todo.completed ? "line-through" : ""
                }`}
              >
                {todo.taskTitle.slice(0, 35)}
              </span>
            </div>
          ))
        )}
      </div>

      {/* In Progress Tasks */}
      <div className="p-4 w-full bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          In Progress
        </h2>
        {inProgressTasks.length === 0 ? (
          <div className="text-gray-500">No tasks in progress</div>
        ) : (
          inProgressTasks.map((todo) => (
            <div
              key={todo._id}
              className="p-2 mb-2 bg-gray-100 rounded-md flex justify-between items-center"
            >
              <span
                className={`text-gray-800 ${
                  todo.completed ? "line-through" : ""
                }`}
              >
                {todo.taskTitle.slice(0, 35)}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Completed Tasks */}
      <div className="p-4 w-full bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Completed</h2>
        {completedTasks.length === 0 ? (
          <div className="text-gray-500">No completed tasks</div>
        ) : (
          completedTasks.map((todo) => (
            <div
              key={todo._id}
              className="p-2 mb-2 bg-gray-100 rounded-md flex justify-between items-center"
            >
              <span
                className={`text-gray-800 ${
                  todo.completed ? "line-through" : ""
                }`}
              >
                {todo.taskTitle.slice(0, 35)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DragAndDrop;
