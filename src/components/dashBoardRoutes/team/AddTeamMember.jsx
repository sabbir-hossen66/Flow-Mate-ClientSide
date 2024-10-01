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

export function AddTeamMember({refetch,reset}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosCommon = UseAxiosCommon();

  const onSubmit = (data) => {
    console.log(data);
    axiosCommon
      .post("/team/create-member", data)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Team Member Added",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch()
          // reset();
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed to Add Team Member already exist",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Failed to Add Team Member",
          text: err.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

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

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4 text-start justify-start">
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="name" className="text-start">
                Name
              </Label>
              <Input
                id="name"
                className="col-span-3"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="col-span-4 text-red-500 text-xs">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="title" className="text-start">
                Title
              </Label>
              <Input
                id="title"
                className="col-span-3"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <p className="col-span-4 text-red-500 text-xs">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="email" className="text-start">
                Email Address
              </Label>
              <Input
                id="email"
                className="col-span-3"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="col-span-4 text-red-500 text-xs">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="role" className="text-start">
                Role
              </Label>
              <Input
                id="role"
                className="col-span-3"
                {...register("role", { required: "Role is required" })}
              />
              {errors.role && (
                <p className="col-span-4 text-red-500 text-xs">
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* New Image URL Field */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="imageUrl" className="text-start">
                Image URL
              </Label>
              <Input
                id="imageUrl"
                className="col-span-3"
                {...register("imageUrl", {
                  required: "Image URL is required",
                  pattern: {
                    value:
                      /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))/i,
                    message: "Invalid URL format",
                  },
                })}
              />
              {errors.imageUrl && (
                <p className="col-span-4 text-red-500 text-xs">
                  {errors.imageUrl.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Add Member</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
