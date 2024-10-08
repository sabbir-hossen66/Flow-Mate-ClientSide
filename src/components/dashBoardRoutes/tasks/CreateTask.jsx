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
import { toast } from "sonner";
import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function CreateTask() {
  // State to manage form inputs
  const [startDate, setStartDate] = useState(new Date());
  const [taskTitle, setTaskTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [stage, setStage] = useState("");
  const [priority, setPriority] = useState("");
  const [loading,setLoading] = useState(false)
  const axiosCommon = UseAxiosCommon()
  
  // Get query client
  const queryClient = useQueryClient();

  // data post
  const { mutateAsync } = useMutation({
    mutationFn: async taskData => {
      const { data } = await axiosCommon.post(`/createTask`, taskData);
      return data;
    },
    onSuccess: () => {
      console.log('Data Saved Successfully');
      toast.success('Task Added Successfully!');
      setLoading(false);

      // Invalidate and refetch tasks (if necessary)
      queryClient.invalidateQueries('tasks'); // Replace 'tasks' with the appropriate query key.
    },
  });

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Log the form values before submitting to verify the data
    console.log("Form Values:", {
      taskTitle,
      assignedTo,
      stage,
      priority,
      startDate,
    });

    // Prepare the data as a JSON object
    const taskData = {
      taskTitle,
      assignedTo,
      stage,
      priority,
      startDate: startDate.toISOString(), // Convert date to a string in ISO format
    };

    try {
      console.log("Sending taskData to /createTask");
      const response = await mutateAsync(taskData);
      console.log(response)

      // Show a success toast notification
      toast.success("Task created successfully");

      // Optionally reset form fields after successful submission
      setTaskTitle("");
      setAssignedTo("");
      setStage("");
      setPriority("");
      setStartDate(new Date());

    } catch (error) {
      console.error("Error creating task:", error);

      // Show an error toast notification
      toast.error("Failed to create task");
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
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

