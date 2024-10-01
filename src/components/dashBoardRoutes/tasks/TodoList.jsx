import { useQuery } from "@tanstack/react-query";


const TodoList = () => {

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading products</div>;
  }



  return (
    <div className="p-4 w-80 mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Todos</h2>
      
      {/* Existing todos */}
      {todos.filter((todo)=> todo.stage == 'todo').map((todo) => (
        <div
          key={todo.id}
          className="p-2 mb-2 bg-gray-100 rounded-md flex justify-between items-center"
        >
          <span className={`text-gray-800 ${todo?.completed ? 'line-through' : ''}`}>{todo.taskTitle.slice(0,35)}</span>
        </div>
      ))}

      {/* Input field for adding new todo */}
      <div className="flex items-center mt-4">
        <input
          type="text"
          className="w-56 p-2 border rounded-md mr-2"
          placeholder="Add a new card..."
        />
        <button
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          // onClick={addTodo}
        >
          Add 
        </button>
      </div>
    </div>
  );
};

export default TodoList;
