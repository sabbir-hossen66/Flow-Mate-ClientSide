import { useQuery } from "@tanstack/react-query";
import { VscFolderActive } from "react-icons/vsc";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

import { RiDeleteBin6Line } from "react-icons/ri";
import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";

// TaskCard Component
const TaskCard = () => {
  const axiosCommon = UseAxiosCommon();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [sortOption, setSortOption] = useState(""); // State for sort option
  // Handlers for dropdown visibility
  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  const handleSortSelection = (option) => {
    setSortOption(option); // Update sort option state
    setDropdownVisible(false); // Close dropdown after selection
  };

  // Handler for form submission
  const onSubmit = (data) => {
    setSearchQuery(data.search); // Update search query state
  };
  const handleReset = () => {
    setSearchQuery("");  // Clear search query
    setSortOption("");    // Clear sort option
    reset();              // Reset form fields
  };

  const [stage, setStage] = useState(""); // Track the stage change
  const {
    isLoading,
    error,
    data: createTask,
    refetch,
  } = useQuery({
    queryKey: ["createTask", searchQuery, sortOption], // Include search and sort in the query key
    queryFn: async () => {
      const res = await fetch(`https://flowmate-serverside.vercel.app/createTask?search=${searchQuery}&sort=${sortOption}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
  });

  const handleStageChange = async (task, newStage) => {
    try {
      const res = await axiosCommon.put(`/createTask/${task._id}`, {
        stage: newStage, // Send the updated stage to the server
      });
      if (res.status === 200) {
        refetch(); // Refetch the tasks after the stage is updated
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Stage updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to update stage!",
      });
    }
  };

  const handleDelete = (task) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosCommon.delete(`/createTask/${task._id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Delete task success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading tasks</div>;
  }

  return (
    <div> <div className="flex justify-center items-center">
    <div>
      <h2 className="text-lg font-medium text-gray-800 dark:text-white text-center">
        Get Your Required Task
      </h2>

      <div className="flex justify-center items-center mt-4">
        {/* Search Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mr-4">
          <div className="flex flex-col p-1.5 overflow-hidden border rounded-lg dark:border-gray-600 lg:flex-row dark:focus-within:border-blue-300 focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
            <input
              className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none dark:bg-gray-800 dark:placeholder-gray-400 focus:placeholder-transparent dark:focus:placeholder-transparent"
              type="text"
              {...register("search", { required: true })}
              placeholder="Enter the task name"
              aria-label="Search tasks"
            />
            <button
              type="submit"
              className="px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
            >
              Search
            </button>
          </div>
     
        </form>

        <div 
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave} 
          className="relative"
        >
          <button
            id="dropdownDelayButton"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            Sort by Date
            <svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          <div
            id="dropdownDelay"
            className={`absolute left-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 ${isDropdownVisible ? '' : 'hidden'}`}
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDelayButton"
            >
              <li onClick={() => handleSortSelection('newest')}>
                <a
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Newest First
                </a>
              </li>
              <li onClick={() => handleSortSelection('oldest')}>
                <a
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Oldest First
                </a>
              </li>
            </ul>
          </div>
        </div>
         {/* Reset Button */}
         <button
              onClick={handleReset}
              className="ml-4 px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-red-500 rounded-md hover:bg-red-400 focus:bg-red-400 focus:outline-none"
            >
              Reset
            </button>
      </div>
    </div>
  </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-1 items-center bg-gray-100 gap-6 p-4">
      {/* Iterate over each task */}
      {createTask?.map((task, index) => (
        <div key={index} className="bg-white w-80 p-4 rounded-lg shadow-lg my-2">
          {/* Priority */}
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

          <div className="flex mb-3 items-center">
            <span className="text-gray-500 text-sm mr-2">Assigned to:</span>
            <h1 className="text-sm bg-blue-100 text-blue-400 font-bold flex items-center justify-center rounded-full px-4 py-1 border-2 border-white">
              {task?.assignedTo}
            </h1>
          </div>

          {/* Task Details */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center text-gray-600 text-sm">
              <span className="mr-1">
                <VscFolderActive />
              </span>
              <span className="mr-5"> Activity: </span>
              {/* Stage Selector */}
              <Select
                onValueChange={(newStage) => {
                  setStage(newStage); // Update local state
                  handleStageChange(task, newStage); // Send the stage update request
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Todo</SelectLabel>
                    <SelectItem value="in progress">In Progress</SelectItem>
                    <SelectItem value="done">Completed</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Delete and Edit Icons */}
          <div className="flex justify-between gap-1">
            <div className="text-gray-500 text-xs mt-3 cursor-pointer">
              + ADD SUBTASK
            </div>
            <div className="flex gap-2">
              <div className="p-2 border bg-blue-200 rounded-sm">
                <span onClick={() => handleDelete(task)}>
                  <RiDeleteBin6Line />
                </span>
              </div>
              <div className="p-2 border bg-blue-200 rounded-sm">
                <Link to={`/dashboard/updateTask/${task._id}`}>
                  <FaEdit />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default TaskCard;
