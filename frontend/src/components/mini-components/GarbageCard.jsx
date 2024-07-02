import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import DatePickerDemo from "@/components/mini-components/Datepicker"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function CardWithForm() {
  return (
    <Card className="w-[350px] mx-auto mt-60">
      <CardHeader>
        <CardTitle>Add Garbage</CardTitle>
        <CardDescription>Fill the form</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Username" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="garbagetype">Garbage Type</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="foodwaste">Food Waste</SelectItem>
                  <SelectItem value="polythene">Polythene</SelectItem>
                  <SelectItem value="paper">Paper</SelectItem>
                  <SelectItem value="metal">Metal</SelectItem>
                  <SelectItem value="glass">Glass</SelectItem>

                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="Enter your address" />
            </div>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="date">Date</Label>
                <DatePickerDemo />
            </div>
            
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Add</Button>
      </CardFooter>
    </Card>
  )
}
export default CardWithForm;