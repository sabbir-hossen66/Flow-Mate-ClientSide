import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import CommonButton from "../commonButton/CommonButton";
import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { useSelector } from "react-redux";

export function CardWithForm({ closeForm }) {
  const [loading, setLoading] = useState(false);
  const axiosCommon = UseAxiosCommon();

  const user = useSelector((state) => state.auth.user);
  console.log(user);

  const queryClient = useQueryClient();

  // data post
  const { mutateAsync } = useMutation({
    mutationFn: async (boardData) => {
      const { data } = await axiosCommon.post(`/createBoard`, boardData);
      return data;
    },
    onSuccess: () => {
      console.log("Data Saved Successfully");
      toast.success("Project Created Successfully!");
      setLoading(false);
      queryClient.invalidateQueries("boards");
    },
  });

  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const boardData = {
      name: e.target.name.value,
      workspace: e.target.workspace.value,
      userEmail: user?.email,
      userName: user?.displayName,
    };
    try {
      console.log("Sending boardData to /createBoard");
      const response = await mutateAsync(boardData);
      console.log(response);
    } catch (error) {
      console.error("Error creating board:", error);
      toast.error("Failed to create board");
      setLoading(false);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>Create project</CardTitle>
          <div onClick={closeForm}>
            <CommonButton text="x" />
          </div>
        </div>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <img
              className="h-40 w-72 mx-auto"
              src="https://images.pexels.com/photos/6373875/pexels-photo-6373875.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Board Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="workspace">Work Space</Label>
              <Input id="workspace" placeholder="Workspace for your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Visibility</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Private</SelectItem>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="workspace">Workspace</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={closeForm}>
              Cancel
            </Button>
            <CommonButton type="submit" text="Create" />
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
