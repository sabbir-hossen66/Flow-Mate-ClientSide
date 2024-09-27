import Completed from "./Completed";
import { CreateTask } from "./CreateTask";
import InProgress from "./InProgress";
import TaskCard from "./TaskCard";
import TodoList from "./TodoList";

const Tasks = () => {
  return (
    <div>
      <section className="container px-5 py-10 mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-x-3">
          <div className="flex items-center">
            {" "}
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">
              Tasks
            </h2>
          </div>
          <div className="py-5 lg:py-0">
            <CreateTask />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-3 py-5">
          <div>
            <TodoList></TodoList>
          </div>
          <div>
            <InProgress />
          </div>
          <div>
            <Completed />
          </div>
        </div>
        <div >
         <TaskCard/>
        </div>
      </section>
    </div>
  );
};

export default Tasks;
