import { useQuery } from "@tanstack/react-query";


const Completed = () => {
  // const [newTodo, setNewTodo] = useState(""); // Input field value

  // Fetch todos from the server
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

  // Mutation for adding a new todo
  // const mutation = useMutation(
  //   async (newTodo) => {
  //     const res = await fetch("http://localhost:5000/createTask", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         text: newTodo,
  //         stage: "todo", // Or any default stage you want
  //         completed: false,
  //       }),
  //     });
  //     return res.json();
  //   },
  //   {
  //     onSuccess: () => {
  //       refetch(); // Refetch todos after successful mutation
  //     },
  //   }
  // );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading todos</div>;
  }

  // Function to handle adding a new todo
  // const addTodo = () => {
  //   if (newTodo.trim() !== "") {
  //     mutation.mutate(newTodo); // Use mutation to add the new todo
  //     setNewTodo(""); // Reset input field after adding
  //   }
  // };

  return (
    <div className="p-4 w-80 mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Completed</h2>
      
      {/* Existing todos filtered by 'done' stage */}
      {todos.filter((todo) => todo.stage === "done").map((todo) => (
        <div
          key={todo._id} // Assuming _id is unique in the fetched data
          className="p-2 mb-2 bg-gray-100 rounded-md flex justify-between items-center"
        >
          <span className={`text-gray-800 ${todo?.done ? 'line-through' : ''}`}>
          {todo.taskTitle.slice(0,35)}
          </span>
        </div>
      ))}


      {/* Input field for adding new todo */}
      <div className="flex items-center mt-4">
        <input
          type="text"
          className="w-56 p-2 border rounded-md mr-2"
          // value={newTodo}
          // onChange={(e) => setNewTodo(e.target.value)}
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

export default Completed;
