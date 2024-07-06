import React from 'react';
import Logo from './logo';
import { Link } from 'react-router-dom';

function Header() {

  const role=localStorage.getItem('role');
    return (
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <div className="flex items-center">
          <Logo/>
        </div>
        <a className="flex items-center justify-center ml-4" href="#">
          <span className="sr-only">SmartBin</span>
        </a>
       
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <a className="text-lg font-medium hover:underline underline-offset-4 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:text-orange-600" href="#">Features</a>
          <a className="text-lg font-medium hover:underline underline-offset-4 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:text-orange-600" href="#">How It Works</a>
          <a className="text-lg font-medium hover:underline underline-offset-4 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:text-orange-600" href="#">Pricing</a>
          <a className="text-lg font-medium hover:underline underline-offset-4 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:text-orange-600" href="#">Contact</a>
          {role && <Link to={`/dashboard/${role}`} 
          className="text-lg font-bold transition-all duration-300 ease-in-out transform hover:-translate-y-1 text-orange-600 hover:text-green-600" >
            Dashboard
        </Link>
        }
          {!role &&
          <Link to={`/signin/${'user'}`} 
          className="text-lg font-bold transition-all duration-300 ease-in-out transform hover:-translate-y-1 text-orange-600 hover:text-green-600" >
            Login
          </Link>
          }
          
          
        </nav>
      </header>
    );
  }
  

export default Header;

// function BinaryIcon(props) {
//     return (
//       <svg
//         {...props}
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <rect x="14" y="14" width="4" height="6" rx="2" />
//         <rect x="6" y="4" width="4" height="6" rx="2" />
//         <path d="M6 20h4" />
//         <path d="M14 10h4" />
//         <path d="M6 14h2v6" />
//         <path d="M14 4h2v6" />
//       </svg>
//     )
//   }
