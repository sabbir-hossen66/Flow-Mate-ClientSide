import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const Completed = () => {
  // Fetch todos from the server
  const user = useSelector((state) => state.auth.user); // Fetch user's email from Redux

  if (!user) {
    return <div>Please log in to see your tasks.</div>;
  }
  const {
    isLoading,
    error,
    data: todos = [], // Default to an empty array to avoid errors if data is undefined
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await fetch(`https://flowmate-serverside-ecru.vercel.app/createTask?email=${user.email}`);
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
    return <div>Error loading todos</div>;
  }

  // Filter todos to get only those that are completed
  const filteredTodos = todos.filter((todo) => todo.stage === "done"&& todo.email === user.email);

  return (
    <div className="p-4 w-80 mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Completed</h2>

      {/* Show message if there are no completed todos */}
      {filteredTodos.length === 0 ? (
        <div className="text-gray-500">No completed tasks</div>
      ) : (
        // Existing completed todos
        filteredTodos.map((todo) => (
          <div
            key={todo._id} // Use _id for uniqueness
            className="p-2 mb-2 bg-gray-100 rounded-md flex justify-between items-center"
          >
            <span
              className={`text-gray-800 ${
                todo.completed ? "line-through" : ""
              }`}
            >
              {todo.taskTitle.slice(0, 35)} {/* Display the title */}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default Completed;
