"use client"
import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Calendar } from "@/components/ui/calendar"
import DatePickerDemo from "@/components/mini-components/Datepicker"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { GarbageCheckbox } from "./GarbageCheckbox"
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
    <div className="flex justify-center items-center min-h-screen">
        <Card className="w-[350px]">
        <CardHeader>
            <CardTitle>Add Garbage Details</CardTitle>
            <CardDescription>Fill the form</CardDescription>
        </CardHeader>
        <CardContent>
            <form>
            <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="garbagetype">Garbage Type</Label>
                    <GarbageCheckbox/>
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="location">Location</Label>
                    <Input id="streetName" placeholder="Street Name" />
                    <Input id="city" placeholder="City" />
                    <Input id="province" placeholder="Province" />
                    <Input id="postalcode" placeholder="Postal Code" />
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
    </div>
  )
}
export default CardWithForm;