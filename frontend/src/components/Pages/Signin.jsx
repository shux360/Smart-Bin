import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/signin', { email, password });
            console.log(response.data);
            // navigate('/dashboard'); // Redirect to dashboard after successful sign-in
        } catch (error) {
            console.error('Error signing in:', error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-green-100 p-6">
            <Card className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg border border-green-400">
                <CardHeader className="mb-6">
                    <CardTitle className="text-2xl font-bold text-center text-green-700">Sign In</CardTitle>
                    <CardDescription className="text-center text-green-600">Please sign in to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                        <Button type="submit" className="w-full bg-green-500 text-white p-3 rounded mt-6 hover:bg-green-600">Sign In</Button>
                    </form>
                </CardContent>
                <CardFooter className="mt-4">
                    <p className="text-sm text-green-500 text-center">
                        Don't have an account? <Link to="/signup" className="text-green-700">Sign up</Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Signin;
