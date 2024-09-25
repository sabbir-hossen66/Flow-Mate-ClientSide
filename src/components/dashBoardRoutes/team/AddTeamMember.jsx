import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AddTeamMember() {
  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button className='bg-blue-700 text-white' variant="outline">Add New team member </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Team Member</DialogTitle>
          <DialogDescription>
          Here you are adding your team Member
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 text-start justify-start">
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="name" className="text-start">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="title" className="text-start">
              Title
            </Label>
            <Input id="title" value="@peduarte" className="col-span-3" />
          </div> 
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="email" className="text-start">
             Email Address
            </Label>
            <Input id="email" value="as@peduarte.com" className="col-span-3" />
          </div> 
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="role" className="text-start">
              Role
            </Label>
            <Input id="role" value="Developer" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Add Member</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
