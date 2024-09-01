//OG

import React, { useState, useEffect, useRef } from 'react';

import {  
  Map,
  MapControl,
  ControlPosition, 
  AdvancedMarker,
  Pin,
  useMapsLibrary,
  useMap
} from '@vis.gl/react-google-maps';  // google maps library (newer version)

import { FiClock, FiNavigation } from 'react-icons/fi';

import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import axios from 'axios';

const cardStyle = {
  marginBottom: '20px', // Margin at the bottom
  padding: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Adding a box shadow for depth
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
  width: '100%', // Full width of the card container
};

const MapComponent = () => {

  const map = useMap();  // This hooks give you access to the underlying google.maps.Map instance.

  const [center, setCenter] = useState({lat : 6.9271, lng : 79.8612}); // default center of map when loading. Truck driver position
  const [user_loc, setuserLoc] = useState({lat : 6.9271, lng : 79.8612}); // user location

  const [finish_loading_driver_loc, set_finish_loading_driver_loc] = useState(false);  // flag to check if driver location is loaded
  const [finish_loading_user_loc, set_finish_loading_user_loc] = useState(false);  // flag to check if user location is loaded

   // triggers loading the places library and returns the API Object once complete (the
   // component calling the hook gets automatically re-rendered when this is
   // the case)
  const placesLibrary = useMapsLibrary('places'); // enables dynamic loading of the places library

  const [placesService, setPlacesService] = useState(null); // use places Service


  const[distance, setDistance] = useState('');   //distance from driver to user home
  const[duration, setDuration] = useState('');   //duration from driver to user home

  async function calculateRoute(){  // rendering route and calculating distance and duration between user and driver

    const directionService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
      polylineOptions: {
        strokeColor: '#000000',
        strokeOpacity: 0.8,
        strokeWeight: 6,
      },
    });
    const results = await directionService.route({
        origin: center,
        destination: user_loc,
        travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
        }
    })
    directionsRenderer.setMap(map);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
    console.log("happen last")
  }


  useEffect(() => {
    if (!placesLibrary || !map) {console.log("fetching API failed or invalid key"); return};

  // when placesLibrary is loaded, the library can be accessed via the
  // placesLibrary API object
    setPlacesService(new placesLibrary.PlacesService(map));
    console.log("places library loaded");
    
  }, [placesLibrary, map]);

  useEffect(() => { // new placeService instance load
    if (!placesService) return;
    // if (placesAPIloading) return;

    console.log("passed api loading");

    async function fetchData () {  // synchronus fetching of data from driver
      try{
        const response = await axios.get(`${import.meta.env.VITE_APP_SERVER_DOMAIN}/driver/drivers/6685b51b63288da41fe6cd52`);  // ** Driver data is a hardcoded fetch. Must change this in next phase **
        const driver_address = String(response.data['location']);  //setting address into a string variable to pass into geocoder function

        //find location with geocode api
        const geocoder = new google.maps.Geocoder() //geocoder instance
        geocoder.geocode({address: driver_address}, (results, status) => {
          if (status === window.google.maps.GeocoderStatus.OK) {
            setCenter(results[0].geometry.location.toJSON());
            set_finish_loading_driver_loc(true)
            map.setCenter(results[0].geometry.location.toJSON()); // Center the map on the new location
            console.log(results[0].geometry.location.toJSON(), "happen first");
          } else {
            console.error("Geocode failed: ", status);
          }
        })
        
      }
      catch (error) {
        console.log(error);
      }
    }

    fetchData(); //callback

    let user // details of user
    let user_coordinates = {}

    async function fetchData_user () { // function to fetch data of current user
      try{
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`${import.meta.env.VITE_APP_SERVER_DOMAIN}/user/get-user/${userId}`);
        console.log(response.data)
        user_coordinates = {lat : response.data.latitude, lng : response.data.longitude}
        console.log(user_coordinates, "happen second")
        setuserLoc(user_coordinates)
        set_finish_loading_user_loc(true)
        
      }
      catch (error) {
        console.log(error);
      }
    }

    fetchData_user(); //callback

  }, [placesService]);

  useEffect(() => {  // Auto route calculation when loading
    if (!finish_loading_driver_loc || !finish_loading_user_loc) return;
    calculateRoute();
  }, [finish_loading_driver_loc, finish_loading_user_loc]) //render everytime change happens to user_loc (user location)
  
  return (
    <>
    <div style={{height : "100vh"}}>
      <Map defaultZoom={12} defaultCenter={center} mapId='map-test-smrtbn'>
        <MapControl position={ControlPosition.BOTTOM_CENTER}>
          <div className='my-2'>
            <div style={cardStyle}>
              <h1 className="text-[16px] font-semibold text-black flex items-center mb-2">
                <FiClock className="mr-2" /> Estimated Arrival
              </h1>
              <p className="text-sm">
                <span>Route Distance: {distance}</span>
                <span style={{ margin: '0 10px', borderLeft: '1px solid black', height: '1em' }}></span>
                <span>Estimated Time: {duration}</span>
              </p>
              <div className='w-[auto] mt-2 rounded-lg'>
                <Button className='bg-green-500' onClick={calculateRoute}><FiNavigation />&nbsp;&nbsp;Relocate</Button>
              </div>
            </div>
          </div>
        </MapControl>
        {center && (
          <AdvancedMarker position={center} > 
            <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
          </AdvancedMarker>
        )}
        {user_loc && (
          <AdvancedMarker position={user_loc} > 
            <Pin background={'red'} glyphColor={'#FFF'} borderColor={'#000'} />
          </AdvancedMarker>
        )}
      </Map>
    </div>
    <div>
    </div>
    </>
  );
};

export default MapComponent