import { Button } from "@/components/ui/button"
import {
 Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "../ui/input"
import CommonButton from "../commonButton/CommonButton"

export function CardWithForm({closeForm}) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex justify-between">
        <CardTitle>Create project</CardTitle> 
        <div onClick={closeForm}>
          <CommonButton text='x'/>
        </div>
        </div>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <img className="h-40 w-72 mx-auto" src="https://images.pexels.com/photos/6373875/pexels-photo-6373875.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Board Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
             <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Work Space</Label>
              <Input id="name" placeholder="Name of your project" />
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
                  <SelectItem value="workspace">Workspace</SelectItem>
              
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <CommonButton text='Create'/>
      </CardFooter>
    </Card>
  )
}
