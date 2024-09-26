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

export function CreateTask() {
  const [startDate, setStartDate] = useState(new Date());
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
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Task Title</Label>
            <Input id="title" placeholder="Enter task title" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="assign">Assign Task To</Label>
            <Input
              id="assign"
              placeholder="Codewave Asante, Jane Smith, Alex Johnson"
            />
          </div>

          <div className="flex flex-col lg:flex-row justify-between gap-6">
            <div className="grid gap-2 w-full">
              <Label htmlFor="assign">Select</Label>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Todo</SelectLabel>
                    <SelectItem value="progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
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
            <div className="grid text-start gap-2">
              <div className="grid gap-2 w-full">
                <Label htmlFor="priority">Priority Level</Label>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>High</SelectLabel>
                      <SelectItem value="higher">Higher</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="lower">Lower</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid text-start gap-2">
              <div className="grid gap-2 w-full">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="picture">Picture</Label>
                  <Input id="picture" type="file" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
