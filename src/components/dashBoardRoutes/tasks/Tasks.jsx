import { CreateTask } from "./CreateTask";

const Tasks = () => {
  return (
    <div>
      <section className="container p-10 mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-x-3">
          <div className="flex items-center">
            {" "}
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">
              Team members
            </h2>
            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
              100 users
            </span>
          </div>
          <div className="py-5 lg:py-0">
            <CreateTask />
          </div>
        </div>
        <div>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt, eius excepturi. Sunt mollitia molestiae consequatur laboriosam, debitis voluptates eligendi autem?</p>
        </div>
      </section>
    </div>
  );
};

export default Tasks;