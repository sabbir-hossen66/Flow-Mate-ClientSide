import { useQuery } from "@tanstack/react-query";
const InProgress = () => {
  const {
    isLoading,
    error,
    data: todos,
    refetch,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/createTask");

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
    return <div>Error loading products</div>;
  }

  return (
    <div className="p-4 w-80 mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">InProgress</h2>

      {/* Existing todos */}
      {todos
        .filter((todo) => todo.stage == "in progress")
        .map((todo) => (
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
        ))}
    </div>
  );
};

export default InProgress;
