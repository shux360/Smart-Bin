import React from 'react';
import { Button } from "@/components/ui/button"
import{ Link, NavLink } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
 
const Landing = () => {
  const buttonStyle = {
    backgroundColor: 'rgb(127, 0, 255)',
  };

  const hoverStyle = {
    backgroundColor: '#3300FF',
    color: 'white',
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col" style={{ backgroundImage: 'url(/background.jpg)' }}>
      <header className="w-full py-4 bg-transparent text-white flex justify-between px-8">
        <img src="/logo.svg" alt="SmartBin Logo" className="h-20" />
        <div className="relative">
          <Link to="/signup"
            className="px-4 py-2 font-bold text-black border-[3px] border-black hover:text-white hover:border-none hover:bg-black rounded ml-2 mr-4"
            // style={buttonStyle}
            // onMouseEnter={(e) => e.target.style.backgroundColor = hoverStyle.backgroundColor}
            // onMouseLeave={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
            >
            Join Now
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger
              className="px-4 py-2 font-bold text-black rounded ml-2 mr-4 bg-white hover:bg-gray-300"
              // style={buttonStyle}
              // onMouseEnter={(e) => e.target.style.backgroundColor = hoverStyle.backgroundColor}
              // onMouseLeave={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
              >
                Sign In</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link to={`/signin/${'user'}`}>
                <DropdownMenuItem >
                  User
                </DropdownMenuItem>
              </Link>
              <Link to={`/signin/${'driver'}`}>
                <DropdownMenuItem >
                  Driver
                </DropdownMenuItem>
              </Link>

            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center text-center text-white  mt-[-80px]">
        <h1 className="text-6xl font-bold mb-4">Leading the Way<br /> in<br /> Waste Management Solutions<br />for<br /> Everyone</h1>
        <h2 className="mb-8 text-1xl md:text-2xl lg:text-3xl">Join us for a cleaner, smarter community experience—where sustainability meets convenience, effortlessly.</h2>
      </main>
    </div>
  );
};
<script src="./node_modules/preline/dist/preline.js"></script>
export default Landing;