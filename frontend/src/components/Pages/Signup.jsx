import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiMapPin } from 'react-icons/fi';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-dropdown-menu';
// import { Link } from 'react-router-dom';


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
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    const navigate = useNavigate();

    const saveFormData = () => {
        const formData = { name, email, password, phone, streetName, city, province, country, postalCode };
        localStorage.setItem('signupFormData', JSON.stringify(formData));
    };

    const handleGetLocation = () => {
        saveFormData();
        navigate('/set-location');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_SERVER_DOMAIN}/user/signup`, { 
                name, 
                email, 
                password, 
                phone, 
                streetName, 
                city, 
                province, 
                country, 
                postalCode,
                longitude,
                latitude
            });
            console.log(response.data);
            localStorage.clear(); // Clear the entire local storage
            navigate(`/signin/${'user'}`); 
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    useEffect(() => {
        // Get coordinates from localStorage
        const storedLatitude = JSON.parse(localStorage.getItem('userLatitude'));
        const storedLongitude = JSON.parse(localStorage.getItem('userLongitude'));
        console.log(storedLatitude, storedLongitude); // { latitude: 40.7128, longitude: -74.0060 }
        setLatitude(storedLatitude);
        setLongitude(storedLongitude);

        // Get form data from localStorage
        const storedFormData = JSON.parse(localStorage.getItem('signupFormData'));
        if (storedFormData) {
            setName(storedFormData.name);
            setEmail(storedFormData.email);
            setPassword(storedFormData.password);
            setPhone(storedFormData.phone);
            setStreetName(storedFormData.streetName);
            setCity(storedFormData.city);
            setProvince(storedFormData.province);
            setCountry(storedFormData.country);
            setPostalCode(storedFormData.postalCode);
        }
    }, []);

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

    return (
        <div className="flex justify-center items-center min-h-screen" style={{ backgroundColor: 'rgba(255,247,237,1)', padding: '6rem' }}>
            <Card className="w-full max-w-md p-2 bg-white shadow-lg rounded-lg border border-orange-400">
                <CardHeader className="mb-0">
                    <CardTitle className="text-2xl font-bold text-center text-black">Sign Up</CardTitle>
                    <CardDescription className="text-center text-black-600">Create your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <Label htmlFor="name" className='text-sm font-bold'>Name</Label>
                        <Input 
                            type="text" 
                            name="name" 
                            placeholder="Name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)} 
                            required 

                            className="block w-full   border-orange-300 rounded focus:outline-orange-600 focus:ring-2 focus:ring-orange-500"
           />
                        <Label htmlFor="email" className='text-sm font-bold'>Email</Label>
                        <Input 
                            type="email" 
                            name="email" 
                            placeholder="Email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            className="block w-full  border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <Label htmlFor="password" className='text-sm font-bold'>Password</Label>
                        <Input 
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            className="block w-full  border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <Label htmlFor="number" className='text-sm font-bold'>Mobile Number</Label>
                        <Input 
                            type="text" 
                            name="phone" 
                            placeholder="Mobile Number" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)} 
                            required 
                            className="block w-full p-3 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <CardDescription className="mt-4 text-black font-bold">Address</CardDescription>
                        <Input 
                            type="text" 
                            name="streetName" 
                            placeholder="Street Name" 
                            value={streetName}
                            onChange={(e) => setStreetName(e.target.value)} 
                            required 
                            className="block w-full  border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <Input 
                            type="text" 
                            name="city" 
                            placeholder="City" 
                            value={city}
                            onChange={(e) => setCity(e.target.value)} 
                            required 
                            className="block w-full  border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <select 
                            name="province" 
                            value={province} 
                            onChange={(e) => setProvince(e.target.value)} 
                            required
                            className="block w-full p-2 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            <option value="" className='hover:bg-orange-600'>Select Province</option>
                            {provinces.map((prov) => (
                                <option key={prov} value={prov}>{prov}</option>
                            ))}
                        </select>
                        <div className='flex gap-2'>
                            <Input 
                                type="text" 
                                name="country" 
                                placeholder="Country" 
                                value={country}
                                onChange={(e) => setCountry(e.target.value)} 
                                required 
                                className="block w-full  border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            <Input 
                                type="text" 
                                name="postalCode" 
                                placeholder="Postal Code" 
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)} 
                                required 
                                className="block w-full  border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            </div>
                            <Button type="button" onClick={handleGetLocation} className="w-full bg-green-500 text-white p-2 rounded mt-4 flex items-center justify-center hover:bg-green-600" style={{ backgroundColor: '#00C256', fontSize: '0.875rem', padding: '0.75rem' }} >
                            <FiMapPin className="mr-2" style={{ fontSize: '1.25rem' }} />
                            Pin Location
                            </Button>

                        <Button type="submit" className="w-full bg-orange-500 text-black p-3 rounded mt-6 hover:bg-orange-600" >
                            
                        Sign Up
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Signup;