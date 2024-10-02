import { useForm } from "react-hook-form";
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
import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function AddTeamMember({ refetch, reset, team }) {
  const [search, setSearch] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const axiosCommon = UseAxiosCommon();
  const { data = [], isLoading } = useQuery({
    queryKey: ["data", search],
    queryFn: async () => {
      if (search) {
        const res = await axiosCommon.get(`/search?name=${search}`);
        return res.data;
      }
      
      return [];
     
    },
    enabled: !!search,
  });
  const handleAddMember = e => {
    e.preventDefault();
    const form = e.target
    const name = form.name.value
    const email = form.email.value
    const role = form.role.value
    const photo = form.photo.value
    const id = form.id.value
    console.log(name)
  }
  console.log("Data:", data); // Log the fetched data
  console.log("Search term:", search); // Log the search term

  // const onSubmit = (data) => {
  //   axiosCommon
  //     .post("/team/create-member", data)
  //     .then((res) => {
  //       console.log(res);
  //       if (res.status === 200) {
  //         Swal.fire({
  //           icon: "success",
  //           title: "Team Member Added",
  //           showConfirmButton: false,
  //           timer: 1500,
  //         });
  //         refetch();
  //         // reset();
  //       } else {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Failed to Add Team Member already exist",
  //           showConfirmButton: false,
  //           timer: 1500,
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Failed to Add Team Member",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //     });
  // };
console.log(data.name)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-700 text-white" variant="outline">
          Add New Team Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Team Member</DialogTitle>
          <DialogDescription>
            Here you are adding your team Member
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleAddMember}>
          <div className="grid gap-4 py-4 text-start justify-start">
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="search" className="text-start">
                Search
              </Label>
              <Input
                id="search"
                name="search"
                className="col-span-3"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="name" className="text-start">
                Name
              </Label>
              <Input id="name" className="col-span-3" defaultValue={data?.name}/>
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="email" className="text-start">
                Email Address
              </Label>
              <Input name='email' id="email" className="col-span-3" defaultValue={data?.email}/>
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="role" className="text-start">
                Role
              </Label>
              <Input name='role' id="role" className="col-span-3" defaultValue={data?.role}/>
            </div>

            {/* New Image URL Field */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="imageUrl" className="text-start">
                Image URL
              </Label>
              <Input name='photo' id="imageUrl" className="col-span-3" defaultValue={data?.photo}/>
            </div>
          </div>
          {/* _id */}
            <div className="grid grid-cols-4 items-start gap-4 hidden">
              <Label htmlFor="id" className="text-start">
                Id
              </Label>
              <Input name='id' id="id" className="col-span-3" defaultValue={data?._id}/>
            </div>
      

          <DialogFooter>
            <Button type="submit">Add Member</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
