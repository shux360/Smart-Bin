"use client"
import axios from "axios";
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
  } from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState,useEffect } from "react";
import moment from 'moment-timezone';
import { Link } from "react-router-dom";



// import { useParams } from "react-router-dom";

export function CardWithForm() {
// const {userId} = useParams();
const userId = localStorage.getItem('userId');
const driverId = import.meta.env.VITE_DRIVER_ID;
const role = localStorage.getItem('role');
// console.log(userId);
// console.log('did',driverId);

const [userData,setUserData] = useState({
    address: {
        streetName: '',
        city: '',
        province: '',
        postalCode: '',
    }
})
useEffect(() => {
    const fetch = async () => {
        const response = await axios.get(
            `${import.meta.env.VITE_APP_SERVER_DOMAIN}/user/get-user/${userId}`
        );
        setUserData({
            address:{
                streetName: response.data.address.streetName,
                city: response.data.address.city,
                province: response.data.address.province,
                postalCode: response.data.address.postalCode,
            }
        });
    };
    return() =>fetch();
}, [userId]);

const [data, setData] = useState({
  location: {
      streetName: '',
      city: '',
      province: '',
      postalcode: '',
  },
  date: '',
  categories: []
});

useEffect(() => {
  setData({
      location: {
          streetName: userData.address.streetName,
          city: userData.address.city,
          province: userData.address.province,
          postalcode: userData.address.postalCode,
      },
      date: '',
      categories: []
  });
}, [userData]);

const [isEditing, setIsEditing] = useState(false);

  const handleEditLocation = (e) => {
    e.preventDefault();
    setIsEditing(!isEditing);
  }

  const handleDateChange = (selectedDate) => {
    const formattedDate = moment.tz(selectedDate, 'Asia/Colombo').format('YYYY-MM-DDTHH:mm:ss.SSS');
    // const formattedDate = selectedDate.toISOString();
    setData((prevData) => ({
      ...prevData,
        date: formattedDate,
        
    }))
    console.log('formatdate',formattedDate)
  }

  const handleCheckboxChange = (selectedItems) => {
    setData((prevData) => ({
      ...prevData,
      categories: selectedItems,
    }))
    console.log(selectedItems)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      console.log('data',data);
         if( 
             data.date === '' 
         ){
             alert('Please fill all the fields');
         } else{
             const response = await axios.post(
                 `${import.meta.env.VITE_APP_SERVER_DOMAIN}/garbage-details`, {userId,driverId,data} 
             );
             alert(response.data.message);
             window.location.reload();
         } 
     }catch (error) {
     console.log(error);
     }
 }


  return (
    <div className="flex justify-center items-center min-h-screen bg-orange-50 ">
        <Card className="w-[500px]">
        <CardHeader>
            <CardTitle>Add Garbage Details</CardTitle>
            <CardDescription>Fill the form</CardDescription>
        </CardHeader>
        <CardContent>
            <form>
            <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-2 mb-3">
                    <Label htmlFor="garbagetype">Garbage Type</Label>
                    <GarbageCheckbox
                    onChange={handleCheckboxChange}
                    />
                </div>
                <div className="flex flex-col space-y-3 ">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                        name="streetName" 
                        placeholder="Street Name" 
                        value={data.location.streetName}
                        onChange={(e) => setData({ 
                          ...data, 
                          location: { 
                            ...data.location, 
                            streetName: e.target.value 
                          } 
                        })}
                        disabled={!isEditing}
                        className={`border-gray-400 ${!isEditing ? 'bg-gray-100' : ''}`}
                        />
                    <div className="flex gap-2">
                      <Input 
                        id="city" 
                        placeholder="City" 
                        value={data.location.city}
                        onChange={(e) => setData({ 
                          ...data, 
                          location: { 
                            ...data.location, 
                            city: e.target.value 
                          } 
                        })}
                        disabled={!isEditing}
                        className={`border-gray-400 ${!isEditing ? 'bg-gray-100' : ''}`}
                        />
                      <Input 
                        id="province" 
                        placeholder="Province" 
                        value={data.location.province}
                        onChange={(e) => setData({ 
                          ...data, 
                          location: { 
                            ...data.location, 
                            province: e.target.value 
                          } 
                        })}
                        disabled={!isEditing}
                        className={`border-gray-400 ${!isEditing ? 'bg-gray-100' : ''}`}
                        />
                    </div>
                    <Input 
                      id="postalcode" 
                      placeholder="Postal Code" 
                      value={data.location.postalcode}
                      onChange={(e) => setData({ 
                        ...data, 
                        location: { 
                          ...data.location, 
                          postalcode: e.target.value 
                        } 
                      })}
                      disabled={!isEditing}
                      className={`border-gray-400 ${!isEditing ? 'bg-gray-100' : ''}`}
                      />
                    <div className="flex justify-end">
                      <Button 
                        variant="outline" 
                        className="varient border-gray-400 w-[150px]"
                        onClick={handleEditLocation}
                      >
                        {isEditing ? 'Save Location' : 'Edit Location'}
                      </Button>
                    </div>
                </div>
                
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="date">Date</Label>
                    <DatePickerDemo className='text-orange-500'
                    onDateChange={handleDateChange} 
                    />
                </div>
                
            </div>
            </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link to={`/dashboard/${userId}`}>
            <Button variant="outline">Cancel</Button>
            </Link>
            <Button
              type="submit"
              onClick={handleSubmit}
              className="bg-orange-600 hover:bg-orange-400"
            >Add</Button>
        </CardFooter>
        </Card>
    </div>
  )
}
export default CardWithForm;