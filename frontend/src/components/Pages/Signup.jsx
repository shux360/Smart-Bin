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

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [number, setNumber] = useState('');
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
            const response = await axios.post('/api/signup', { 
                name, 
                email, 
                password, 
                number, 
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
        <div className="flex justify-center items-center min-h-screen" style={{ backgroundColor: 'rgba(0, 194, 86, 0.5)', padding: '6rem' }}>
            <Card className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg border border-green-400">
                <CardHeader className="mb-6">
                    <CardTitle className="text-2xl font-bold text-center text-black">Sign Up</CardTitle>
                    <CardDescription className="text-center text-black-600">Create your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input 
                            type="text" 
                            name="name" 
                            placeholder="Name" 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                            className="block w-full p-3 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <Input 
                            type="email" 
                            name="email" 
                            placeholder="Email" 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            className="block w-full p-3 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <Input 
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            className="block w-full p-3 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <Input 
                            type="text" 
                            name="number" 
                            placeholder="Mobile Number" 
                            onChange={(e) => setNumber(e.target.value)} 
                            required 
                            className="block w-full p-3 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <CardDescription className="mt-4 text-green-600">Address</CardDescription>
                        <Input 
                            type="text" 
                            name="streetName" 
                            placeholder="Street Name" 
                            onChange={(e) => setStreetName(e.target.value)} 
                            required 
                            className="block w-full p-3 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <Input 
                            type="text" 
                            name="city" 
                            placeholder="City" 
                            onChange={(e) => setCity(e.target.value)} 
                            required 
                            className="block w-full p-3 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <select 
                            name="province" 
                            value={province} 
                            onChange={(e) => setProvince(e.target.value)} 
                            required
                            className="block w-full p-3 border border-green-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="">Select Province</option>
                            {provinces.map((prov) => (
                                <option key={prov} value={prov}>{prov}</option>
                            ))}
                        </select>
                        <Input 
                            type="text" 
                            name="country" 
                            placeholder="Country" 
                            onChange={(e) => setCountry(e.target.value)} 
                            required 
                            className="block w-full p-3 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <Input 
                            type="text" 
                            name="postalCode" 
                            placeholder="Postal Code" 
                            onChange={(e) => setPostalCode(e.target.value)} 
                            required 
                            className="block w-full p-3 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <Button type="submit" className="w-full bg-green-500 text-white p-3 rounded mt-6 hover:bg-green-600" style={{ backgroundColor: '#00C256' }}>Sign Up</Button>

                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Signup;
