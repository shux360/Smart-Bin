import React, { useEffect, useState } from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { Button } from '@/components/ui/button';
import { FiTruck, FiClock, FiCheckCircle, FiMap } from 'react-icons/fi';
import MapComponent from '../component/Map-user-view';
import axios from 'axios';

const User_home = () => {

  const mapContainerStyle = {
    width: '100%', // Full width of the left side
    height: '100vh',
    boxShadow: '0 4px 8px rgba(0, 0, 0 ,0.1)', // Adding a box shadow for depth
    borderRadius: '8px',
  };

  const center = {
    lat: 53.745,
    lng: 12.523,
  };

  const cardStyle = {
    marginBottom: '20px', // Margin at the bottom
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Adding a box shadow for depth
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    width: '100%', // Full width of the card container
  };

  const cardsContainerStyle = {
    width: '30%', // Narrower cards container
    textAlign: 'left',
    marginRight: '5%', // Add some space between the map and the cards
    marginLeft: '5%',
    marginTop: '20px', // Move the cards container down a bit
  };

  const [driver, setDriver] = useState({ // saves driver details from 'drivers' schema to display on page
    name: '',
    email: '',
    truckNumber: ''
  });

  const [user_address, setUser_address] = useState('');

  async function fetchData (driver) {  // function to fetch data of respective driver for user (in this case built to just one driver for now)
    try{
      const response = await axios.get(`${import.meta.env.VITE_APP_SERVER_DOMAIN}/driver/drivers/6685b51b63288da41fe6cd52`);  // ** Driver data is a hardcoded fetch. Must change this in next phase **
      driver.email = response.data['email'];
      driver.name = response.data['name'];
      driver.truckNumber = response.data['truckNumber'];
      setDriver(driver);
    }
    catch (error) {
      console.log(error);
    }
  }

  async function fetchData_user () { // function to fetch data of current user
    try{
      
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`${import.meta.env.VITE_APP_SERVER_DOMAIN}/user/get-user/${userId}`);
      const address = response.data.address; // get user address
      // Parse address object into a single string
      setUser_address(`${address.streetName}, ${address.city}, ${address.province}, ${address.country}, ${address.postalCode}`);
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {

    let driver = { // intermediate variable to store driver details
      name: '',
      email: '',
      truckNumber: ''
    }
    
    fetchData(driver);  // function call for driver data fetch
    fetchData_user(); // function call for user data fetch

  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',  gap: '10px' }}>
      <div style={{ width: '70%' }}>
        <APIProvider apiKey="AIzaSyDfoowcQ1SIva7ugnYpd2sNSVDFPrqS6-w">
          <div style={mapContainerStyle}>
            <MapComponent />
          </div>
        </APIProvider>
      </div>
      <div style={cardsContainerStyle}>
        <h1 className="text-3xl font-extrabold tracking-tight text-black" style={{ marginBottom: '40px', marginTop: '20px' }}>Track Your PickUp</h1>
        <h4 className="text-l font-semibold text-black flex items-center mb-2">
          <FiMap className="mr-2" /> Your Location
        </h4>
        <div style={cardStyle}>
          <p className="text-sm">{user_address}</p>
        </div>

        <h4 className="text-l font-semibold text-black flex items-center mb-2">
          <FiTruck className="mr-2" /> Truck Info
        </h4>
        <div style={cardStyle}>
          <table className="w-full">
            <thead>
              <tr className="m-0 border-t p-0 even:bg-muted">
                <td className="border px-4 py-2 text-left font-bold text-sm [&[align=center]]:text-center [&[align=right]]:text-right">
                  Truck Number
                </td>
                <td className="border px-4 py-2 text-left text-sm [&[align=center]]:text-center [&[align=right]]:text-right">
                  {driver.truckNumber}
                </td>
              </tr>
            </thead>
            <tbody>
              <tr className="m-0 border-t p-0 even:bg-muted">
                <td className="border font-bold px-4 py-2 text-left text-sm [&[align=center]]:text-center [&[align=right]]:text-right">
                  Driver Name
                </td>
                <td className="border px-4 py-2 text-left text-sm [&[align=center]]:text-center [&[align=right]]:text-right">
                  {driver.name}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <h4 className="text-l font-semibold text-black flex items-center mb-2">
          <FiCheckCircle className="mr-2" /> Status
        </h4>
        <div style={cardStyle}>
          <div className="bg-yellow-500 text-white rounded-md px-2 py-1 inline-block text-sm">
            Picking Up
          </div>
        </div>
      </div>
    </div>
  );
};

export default User_home;