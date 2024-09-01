import React, { useState, useEffect } from 'react'
import { APIProvider, Map} from "@vis.gl/react-google-maps";
import Directions from './Directions';


const MapContainer = () => {



  const [position, setPosition] = useState({lat: 7.2906, lng: 80.6337 });

  const [driver, setDriver] = useState(null);
  const driverId = '6685b51b63288da41fe6cd52';

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_SERVER_DOMAIN}/driver/drivers/${driverId}`);
        
        if (response.ok) {
          const data = await response.json();
          setDriver(data);
          convertLocationToLatLng(data.location);
        } else {
          const errorText = await response.text();
          console.error("Error fetching driver:", errorText);
        }
      } catch (error) {
        console.error("Error fetching driver:", error);
      }
    };
    fetchDriver();
  }, [driverId]);

  const convertLocationToLatLng = (location) => {
    const apiKey = 'AIzaSyDfoowcQ1SIva7ugnYpd2sNSVDFPrqS6-w'; 
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${apiKey}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'OK') {
          const latLng = data.results[0].geometry.location;
          setPosition({ lat: latLng.lat, lng: latLng.lng });
        } else {
          alert('Location not found. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      });
  };

  return (
    <APIProvider apiKey="AIzaSyDfoowcQ1SIva7ugnYpd2sNSVDFPrqS6-w">
      <div className='w-full h-screen flex flex-row justify-between items-start'>
      <div className='w-2/3 h-full'>
      <Map
        center={position}
        zoom={15}
        fullscreenControl={false}
      >
      </Map>
    </div>
    <Directions/>
      </div>
    
  
  </APIProvider>
  )
}



export default MapContainer;