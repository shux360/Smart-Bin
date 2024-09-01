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
import { useParams } from 'react-router-dom';

const Signin = () => {
    const { role } = useParams();
    console.log(role);
    console.log(import.meta.env.VITE_APP_SERVER_DOMAIN);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        localStorage.setItem('role', role);
        try {
            if(role === 'user'){
                const response = await axios.post(`${import.meta.env.VITE_APP_SERVER_DOMAIN}/user/signin`, { email, password });
            
            
            alert(response.data.message);
            const usereID = response.data.user._id;
            navigate(`/dashboard/${usereID}`);// Redirect to dashboard after successful sign-in
            localStorage.setItem('userId', usereID);
            } 
            if(role === 'driver'){
                const response = await axios.post(`${import.meta.env.VITE_APP_SERVER_DOMAIN}/driver/signin`, { email });
                console.log(response.data);
                const driverID = response.data.driver._id;
                navigate(`/dashboard/${driverID}`);// Redirect to dashboard after successful sign-in
                localStorage.setItem('driverId', driverID);
            }


        } catch (error) {
            console.error('Error signing in:', error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen" style={{ backgroundColor: 'rgba(255,247,237,1)', padding: '6rem' }}>
            <Card className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg border border-orange-400">
                <CardHeader className="mb-6">
                    <CardTitle className="text-2xl font-bold text-center text-black">Sign In</CardTitle>
                    <CardDescription className="text-center text-black">Please sign in to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input 
                            type="email" 
                            name="email" 
                            placeholder="Email" 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            className="block w-full p-3 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                       {role === 'user' && (
                             <Input 
                             type="password" 
                             name="password" 
                             placeholder="Password" 
                             onChange={(e) => setPassword(e.target.value)} 
                             required 
                             className="block w-full p-3 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                         />
                       )}
                        <Button type="submit" className="w-full bg-orange-500 text-black p-3 rounded mt-6 hover:bg-orange-600">
                            Sign In
                        </Button>
                    </form>
                </CardContent>
                {role === 'user' && (
                    <CardFooter className="mt-4">
                    <p className="text-sm text-orange-500 text-center">
                        Don't have an account? <Link to="/signup" className="text-black hover:font-bold">Sign up</Link>
                    </p>
                </CardFooter>

                )}
            </Card>
        </div>
    );
};

export default Signin;
