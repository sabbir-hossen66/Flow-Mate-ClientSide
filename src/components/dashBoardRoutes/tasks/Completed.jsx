import { useQuery } from "@tanstack/react-query";


const Completed = () => {
  // Fetch todos from the server
  const {
    isLoading,
    error,
    data: todos,
    refetch,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await fetch("https://flowmate-serverside.vercel.app/createTask");
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

  const filteredTodos = todos.filter((todo) => todo.stage === "done");

  return (
    <div className="p-4 w-80 mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Todos</h2>

      {/* Show message if there are no todos */}
      {filteredTodos.length === 0 ? (
        <div className="text-gray-500">No tasks added recently</div>
      ) : (
        // Existing todos
        filteredTodos.map((todo) => (
          <div
            key={todo.id}
            className="p-2 mb-2 bg-gray-100 rounded-md flex justify-between items-center"
          >
            <span
              className={`text-gray-800 ${
                todo?.completed ? "line-through" : ""
              }`}
            >
              {todo.taskTitle.slice(0, 35)}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default Completed;
