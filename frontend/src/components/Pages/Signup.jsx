import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-dropdown-menu';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [streetName, setStreetName] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [country, setCountry] = useState('');
    const [postalCode, setPostalCode] = useState('');

    const navigate = useNavigate();

    const provinces = [
        'Central Province', 
        'Eastern Province', 
        'Northern Province', 
        'Southern Province', 
        'Western Province',
        'North Western Province', 
        'North Central Province', 
        'Uva Province', 
        'Sabaragamuwa Province'
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:1000/user/signup', { 
                name, 
                email, 
                password, 
                phone, 
                streetName, 
                city, 
                province, 
                country, 
                postalCode 
            });
            console.log(response.data);
            navigate('/signin'); 
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen" style={{ backgroundColor: 'rgba(255,247,237,1)', padding: '6rem' }}>
            <Card className="w-full max-w-md p-2 bg-white shadow-lg rounded-lg border border-orange-400">
                <CardHeader className="mb-0">
                    <CardTitle className="text-2xl font-bold text-center text-black">Sign Up</CardTitle>
                    <CardDescription className="text-center text-black-600">Create your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Label htmlFor="name" className='text-sm'>Name</Label>
                        <Input 
                            type="text" 
                            name="name" 
                            placeholder="Name" 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                            className="block w-full  border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <Label htmlFor="email" className='text-sm'>Email</Label>
                        <Input 
                            type="email" 
                            name="email" 
                            placeholder="Email" 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            className="block w-full  border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <Label htmlFor="password" className='text-sm'>Password</Label>
                        <Input 
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            className="block w-full  border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <Label htmlFor="number" className='text-sm'>Mobile Number</Label>
                        <Input 
                            type="text" 
                            name="phone" 
                            placeholder="Mobile Number" 
                            onChange={(e) => setPhone(e.target.value)} 
                            required 
                            className="block w-full p-3 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <CardDescription className="mt-4 text-black">Address</CardDescription>
                        <Input 
                            type="text" 
                            name="streetName" 
                            placeholder="Street Name" 
                            onChange={(e) => setStreetName(e.target.value)} 
                            required 
                            className="block w-full  border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <Input 
                            type="text" 
                            name="city" 
                            placeholder="City" 
                            onChange={(e) => setCity(e.target.value)} 
                            required 
                            className="block w-full  border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <select 
                            name="province" 
                            value={province} 
                            onChange={(e) => setProvince(e.target.value)} 
                            required
                            className="block w-full  border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            <option value="">Select Province</option>
                            {provinces.map((prov) => (
                                <option key={prov} value={prov}>{prov}</option>
                            ))}
                        </select>
                        <div className='flex gap-2'>
                            <Input 
                                type="text" 
                                name="country" 
                                placeholder="Country" 
                                onChange={(e) => setCountry(e.target.value)} 
                                required 
                                className="block w-full  border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            <Input 
                                type="text" 
                                name="postalCode" 
                                placeholder="Postal Code" 
                                onChange={(e) => setPostalCode(e.target.value)} 
                                required 
                                className="block w-full  border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            </div>
                        <Button type="submit" className="w-full bg-orange-500 text-black p-3 rounded mt-6 hover:bg-orange-600" >Sign Up</Button>

                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Signup;
