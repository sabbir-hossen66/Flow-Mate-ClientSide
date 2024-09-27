
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import DatePicker from "react-datepicker";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


import "react-datepicker/dist/react-datepicker.css";
// import UseAxiosCommon from "@/hooks/UseAxiosCommon";

export function CreateTask() {
  // const axiosCommon = UseAxiosCommon(); // Use axios instance

  // State to manage form inputs
  const [startDate, setStartDate] = useState(new Date());
  const [taskTitle, setTaskTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [stage, setStage] = useState("");
  const [priority, setPriority] = useState("");
  // const [picture, setPicture] = useState(null);

  // Function to handle form submission
// Function to handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();

  // Log the form values before submitting
  console.log("Form Values:");
  console.log("Task Title:", taskTitle);
  console.log("Assigned To:", assignedTo);
  console.log("Stage:", stage);
  console.log("Priority:", priority);
  console.log("Start Date:", startDate);
  // if (picture) {
  //   console.log("Picture:", picture); // Log the picture if one is selected
  // }

  // Create a formData object if uploading a file
  const formData = new FormData();
  formData.append("taskTitle", taskTitle);
  formData.append("assignedTo", assignedTo);
  formData.append("stage", stage);
  formData.append("priority", priority);
  formData.append("date", startDate);
  // if (picture) {
  //   formData.append("picture", picture);
  // }

  try {
    // Log before making the API call
    console.log("Sending formData to /api/task/create");

    // Send the POST request using fetch
    const response = await fetch("http://localhost:5000/api/task/create", {
      method: "POST",
      body: formData,
      headers: {
       },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Log the response from the server
    console.log("Task created successfully:", data);

    // Handle success (e.g., show a toast, reset the form, etc.)
  } catch (error) {
    // Log any error during the API call
    console.error("Error creating task:", error);
  }
};


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-700 text-white" variant="outline">
          Create task{" "}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
          <DialogDescription>Here you are creating task</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Task Title</Label>
              <Input
                id="title"
                placeholder="Enter task title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="assign">Assign Task To</Label>
              <Input
                id="assign"
                placeholder="Codewave Asante, Jane Smith, Alex Johnson"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
              />
            </div>

            <div className="flex flex-col lg:flex-row justify-between gap-6">
              <div className="grid gap-2 w-full">
                <Label htmlFor="stage">Select Stage</Label>
                <Select onValueChange={setStage}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Todo</SelectLabel>
                      <SelectItem value="in progress">In Progress</SelectItem>
                      <SelectItem value="done">Completed</SelectItem>
                      <SelectItem value="todo">Todo</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2 w-full">
                <Label htmlFor="date">Task Date</Label>
                <div className="relative">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="w-full p-2 border rounded"
                  />
                  <span className="absolute right-3 top-2.5 text-gray-400">
                    📅 {/* You can replace this with an icon if you want */}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between gap-6">
              <div className="grid text-start gap-2 w-full">
                <Label htmlFor="priority">Priority Level</Label>
                <Select onValueChange={setPriority}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Priority Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Priority</SelectLabel>
                      <SelectItem value="high">Higher</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Lower</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* <div className="grid text-start gap-2 w-full">
                <Label htmlFor="picture">Picture</Label>
                <Input
                  id="picture"
                  type="file"
                  onChange={(e) => setPicture(e.target.files[0])}
                />
              </div> */}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
