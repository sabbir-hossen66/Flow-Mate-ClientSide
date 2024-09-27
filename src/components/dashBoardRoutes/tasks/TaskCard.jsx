import React from "react";
import { Link } from "react-router-dom";

// TaskCard Component
const TaskCard = () => {
  // Fake data for tasks
  const fakeTasks = [
    {
      priority: "LOW PRIORITY",
      taskTitle: "Design Landing Page",
      taskDate: "01-Apr-2024",
      commentsCount: 25,
      attachmentsCount: 2,
      subtaskCompleted: 1,
      subtaskTotal: 5,
      members: ["AB", "CD", "EF"],
      description: "Work on the design for the new landing page.",
      label: "Design",
    },
    {
      priority: "HIGH PRIORITY",
      taskTitle: "Fix Login Issues",
      taskDate: "05-Apr-2024",
      commentsCount: 10,
      attachmentsCount: 3,
      subtaskCompleted: 2,
      subtaskTotal: 4,
      members: ["GH", "IJ"],
      description: "Users are unable to log in due to a server error.",
      label: "Bug",
    },
    {
      priority: "MEDIUM PRIORITY",
      taskTitle: "Create Marketing Plan",
      taskDate: "10-Apr-2024",
      commentsCount: 18,
      attachmentsCount: 5,
      subtaskCompleted: 0,
      subtaskTotal: 3,
      members: ["KL", "MN", "OP"],
      description: "Draft the marketing plan for the new product launch.",
      label: "Marketing",
    },
    {
      priority: "LOW PRIORITY",
      taskTitle: "Update Documentation",
      taskDate: "15-Apr-2024",
      commentsCount: 5,
      attachmentsCount: 1,
      subtaskCompleted: 3,
      subtaskTotal: 3,
      members: ["QR", "ST"],
      description: "Update the internal project documentation.",
      label: "Docs",
    },
    {
      priority: "HIGH PRIORITY",
      taskTitle: "Client Meeting Preparation",
      taskDate: "20-Apr-2024",
      commentsCount: 22,
      attachmentsCount: 2,
      subtaskCompleted: 0,
      subtaskTotal: 1,
      members: ["UV", "WX", "YZ"],
      description: "Prepare slides and agenda for the client meeting.",
      label: "Meeting",
    },
    {
      priority: "MEDIUM PRIORITY",
      taskTitle: "Implement New Features",
      taskDate: "25-Apr-2024",
      commentsCount: 30,
      attachmentsCount: 6,
      subtaskCompleted: 2,
      subtaskTotal: 6,
      members: ["AB", "CD"],
      description: "Develop the new features requested by the client.",
      label: "Development",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-1 items-center bg-gray-100 gap-6 p-4">
      {/* Iterate over each task in the fakeTasks array */}
   
     {fakeTasks.map((task, index) => (
         
        <div key={index} className="bg-white w-80 p-4 rounded-lg shadow-lg my-2">
          {/* Priority */}
          <Link to='taskDetails'>
          <div className="text-blue-500 text-xs font-semibold mb-2">
            {task.priority}
          </div>

          {/* Task Title */}
          <div className="text-xl font-semibold mb-1">{task.taskTitle}</div>

          {/* Task Date */}
          <div className="text-gray-500 text-sm mb-3">{task.taskDate}</div>

          {/* Task Details */}
          <div className="flex items-center justify-between mb-3">
            {/* Comments */}
            <div className="flex items-center text-gray-600 text-sm">
              <span className="mr-1">💬</span>
              {task.commentsCount}
            </div>

            {/* Attachments */}
            <div className="flex items-center text-gray-600 text-sm">
              <span className="mr-1">📎</span>
              {task.attachmentsCount}
            </div>

            {/* Subtask Progress */}
            <div className="text-gray-600 text-sm">
              {task.subtaskCompleted}/{task.subtaskTotal}
            </div>
          </div>

          {/* Member Avatars */}
          <div className="flex mb-3">
            {task.members.map((member, index) => (
              <div
                key={index}
                className="bg-gray-300 text-xs text-white font-bold w-8 h-8 flex items-center justify-center rounded-full -ml-2 border-2 border-white"
              >
                {member}
              </div>
            ))}
          </div>

       
          {/* Task Label */}
          <div className="flex items-center">
            <div className="text-sm text-gray-500">{task.taskDate}</div>
            <div className="ml-4 bg-blue-100 text-blue-500 text-xs px-3 py-1 rounded-full">
              {task.label}
            </div>
          </div>

          {/* Add Subtask */}
          <div className="text-gray-400 text-xs mt-3 cursor-pointer">
            + ADD SUBTASK
          </div>
        </Link>
        </div>
      ))}
   
    </div>
  );
};

export default TaskCard;
