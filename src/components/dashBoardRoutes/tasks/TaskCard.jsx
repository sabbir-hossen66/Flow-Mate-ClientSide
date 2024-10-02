import { useQuery } from "@tanstack/react-query";
import { Link, useLoaderData } from "react-router-dom";
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
import { MdEditNote } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import Swal from "sweetalert2";
// TaskCard Component
const TaskCard = () => {
  const task = useLoaderData();
  console.log("task", task);
  const axiosCommon = UseAxiosCommon();
  const [stage, setStage] = useState("");
  const {
    isLoading,
    error,
    data: createTask,
    refetch,
  } = useQuery({
    queryKey: ["createTask"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/createTask");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
  });

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
    return <div>Error loading products</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-1 items-center bg-gray-100 gap-6 p-4">
      {/* Iterate over each task in the fakeTasks array */}

      {createTask?.map((task, index) => (
        <div
          key={index}
          className="bg-white w-80 p-4 rounded-lg shadow-lg my-2"
        >
          {/* Priority */}
          {/* <Link to="taskDetails"> */}
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
            <span className="items-center text-gray-500 text-sm mr-2">
              {" "}
              Assigned to:{" "}
            </span>{" "}
            <h1 className=" text-sm bg-blue-100 text-blue-400 font-bold  flex items-center justify-center rounded-full px-4 py-1 border-2 border-white">
              {task?.assignedTo}
            </h1>
          </div>
          {/* Task Details */}
          <div className="flex items-center justify-between mb-3">
            {/* Comments */}
            <div className="flex items-center text-gray-600 text-sm">
              <span className="mr-1">
                <VscFolderActive />
              </span>
              <span className="mr-5"> Activity: </span>
              <Select onValueChange={setStage}>
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

          {/* Member Avatars */}
          {/* <div className="flex mb-3">
            {task?.members.map((member, index) => (
              <div
                key={index}
                className="bg-gray-300 text-xs text-white font-bold w-8 h-8 flex items-center justify-center rounded-full -ml-2 border-2 border-white"
              >
                {member}
              </div>
            ))}
          </div> */}

          <div className="flex justify-between gap-1">
            <div className="text-gray-500 text-xs mt-3 cursor-pointer">
              + ADD SUBTASK
            </div>
            <div className="flex gap-2">
              <div className="p-2 border bg-blue-200 rounded-sm">
                {" "}
                <span onClick={() => handleDelete(task)}>
                  <RiDeleteBin6Line />
                </span>
              </div>
              <div className="p-2 border bg-blue-200 rounded-sm">
                <MdEditNote />
              </div>
            </div>
          </div>
          {/* Add Subtask */}

          {/* </Link> */}
        </div>
      ))}
    </div>
  );
};

export default TaskCard;
