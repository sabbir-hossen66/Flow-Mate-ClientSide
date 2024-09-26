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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import "react-datepicker/dist/react-datepicker.css";

export function CreateTask() {
  const [startDate, setStartDate] = useState(new Date());
  const [position, setPosition] = useState("bottom");
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
              <Label htmlFor="stage">Task Stage</Label>
              <Input id="stage" placeholder="In Progress" />
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

          <div className="grid text-start gap-2">
            <Label htmlFor="priority">Priority Level</Label>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="text-start justify-start" variant="outline">Higher</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={position}
                  onValueChange={setPosition}
                >
                  <DropdownMenuRadioItem value="top">Higher</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="bottom">
                  Midum
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="right">
                   Low
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
