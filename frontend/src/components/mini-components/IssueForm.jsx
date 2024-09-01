"use client"
import axios from "axios";
import * as React from "react"
import { Button } from "@/components/ui/button"
import DatePickerDemo from "@/components/mini-components/Datepicker"
import { Textarea } from "@/components/ui/textarea";

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

export function ReportForm() {
    const userId = localStorage.getItem('userId');
    const [userData,setUserData] = useState({
        name: '',
        address: { 
            streetName: '',
            city: '',
            province: '',
            postalCode: '',
        }
    })
    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await axios.get(`${import.meta.env.VITE_APP_SERVER_DOMAIN}/user/get-user/${userId}`);
            console.log('response', response);
            setUserData({
              name: response.data.name,
              address: {
                streetName: response.data.address.streetName,
                city: response.data.address.city,
                province: response.data.address.province,
                postalCode: response.data.address.postalCode,
              },
            });
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
        if (userId) {
          fetchUserData();
        }
      }, [userId]);
    
      useEffect(() => {
        console.log('userData', userData);
        setData({
          name: userData.name,
          location: {
            streetName: userData.address.streetName,
            city: userData.address.city,
            province: userData.address.province,
            postalcode: userData.address.postalCode,
          },
          date: '',
          categories: [],
          issueType: '',
          otherIssue: '',
        });
      }, [userData]);
    
      const [data, setData] = useState({
        name: '',
        location: {
          streetName: '',
          city: '',
          province: '',
          postalcode: '',
        },
        date: '',
        categories: [],
        issueType: '',
        otherIssue: '',
      });

    const [isEditing, setIsEditing] = useState(false);

    const handleEditLocation = (e) => {
        e.preventDefault();
        setIsEditing(!isEditing);
    }

    const handleDateChange = (selectedDate) => {
        const formattedDate = moment.tz(selectedDate, 'Asia/Colombo').format('YYYY-MM-DDTHH:mm:ss.SSS');
        setData((prevData) => ({
            ...prevData,
            date: formattedDate,

        }))
        console.log('formatdate', formattedDate)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('data', data);
            if (
                data.date === ''
            ) {
                alert('Please fill all the fields');
            } else {
                const response = await axios.post(
                    `${import.meta.env.VITE_APP_SERVER_DOMAIN}/report-issue`,
                    data,
                );
                alert(response.data.message);
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="flex justify-center my-8 items-center min-h-screen">
            <Card className="w-[500px]">
                <CardHeader>
                    <CardTitle>Report your Issue</CardTitle>
                    <CardDescription>Please fill this form to report any issue you are experiencing</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">

                            <div className="flex flex-col space-y-3">
                                <Label htmlFor="name">Your Name</Label>
                                <Input
                                    name="name"
                                    placeholder="Your Name"
                                    value={data.name}
                                    onChange={(e) => setData({
                                        ...data,
                                        name: e.target.value
                                    })}
                                    className="border-gray-400 focus-ring-2 focus-ring-orange-500"
                                />
                                <Label htmlFor="issueType">Type of Issue</Label>
                                <Select
                                    onValueChange={(value) => setData({
                                        ...data,
                                        issueType: value
                                    })}
                                    value={data.issueType}
                                    className="border-gray-400"
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select an issue type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Missed">Truck Missed Schedule</SelectItem>
                                        <SelectItem value="Not Visited">Truck Didn't Come</SelectItem>
                                        <SelectItem value="Website Issue">Website Issue</SelectItem>
                                        <SelectItem value="Incorrect Schedule">Incorrect Schedule</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                                {data.issueType === 'Other' && (
                                    <div className="flex flex-col space-y-3">

                                        <Input
                                            name="otherIssue"
                                            placeholder="Tell us the issue"
                                            value={data.otherIssue}
                                            onChange={(e) => setData({
                                                ...data,
                                                otherIssue: e.target.value
                                            })}
                                            className="border-gray-400"
                                        />
                                    </div>
                                )}
                                <Label htmlFor="issueDescription">Please describe the issue you are experiencing</Label>
                                <Textarea
                                    name="issueDescription"
                                    placeholder="Describe the issue"
                                    value={data.issueDescription}
                                    onChange={(e) => setData({
                                        ...data,
                                        issueDescription: e.target.value
                                    })}
                                    className="border-gray-400"
                                />
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
                                <DatePickerDemo
                                    onDateChange={handleDateChange}
                                />
                            </div>

                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">
                        <Link to={`/dashboard/${userId}`}>Cancel</Link></Button>
                    <Button
                        className="bg-orange-500 text-white hover:bg-orange-600"
                        type="submit"
                        onClick={handleSubmit}
                    >Add</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
export default ReportForm;