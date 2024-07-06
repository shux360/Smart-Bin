import React, { useState, useEffect, useRef } from 'react';
import { 
  APIProvider, 
  Map,
  MapControl,
  ControlPosition, 
  AdvancedMarker,
  Pin,
  useMapsLibrary,
  useMap
} from '@vis.gl/react-google-maps';  // google maps library (newer version)

import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

const center = {  // default location galle town center
  lat: 6.0329,
  lng: 80.2168,
};

const MapComponent = () => {
  const map = useMap();  // This hooks give you access to the underlying google.maps.Map instance.

   // triggers loading the places library and returns the API Object once complete (the
   // component calling the hook gets automatically re-rendered when this is
   // the case)
  const placesLibrary = useMapsLibrary('places'); // enables dynamic loading of the places library

  const [placesService, setPlacesService] = useState(null); // use places Service
  const driverLocationRef = useRef(null);  //ref to driver location
  const pickupLocationRef = useRef(null);  //ref to pickup location

  const [pickupAddress, setPickupAddress] = useState({address: '', coordinates: ''});
  const [driverAddress, setDriverAddress] = useState({address: '', coordinates: ''});

  useEffect(() => {
    if (!placesLibrary || !map) {console.log("fetching API failed or invalid key"); return};

  // when placesLibrary is loaded, the library can be accessed via the
  // placesLibrary API object
    setPlacesService(new placesLibrary.PlacesService(map));
  }, [placesLibrary, map]);

  useEffect(() => { // new placeService instance load
    if (!placesService) return;

    if (driverLocationRef.current && pickupLocationRef.current) {
      const driverAutocomplete = new placesLibrary.Autocomplete(driverLocationRef.current);  //autocomplete widget instance for driver location
      const pickupAutocomplete = new placesLibrary.Autocomplete(pickupLocationRef.current);  //autocomplete widget instance for pickup location

      driverAutocomplete.addListener('place_changed', () => { //event listener for driver location
        const place = driverAutocomplete.getPlace();
        setDriverAddress({
          address: place.formatted_address,
          coordinates: place.geometry.location.toJSON(),
        })
      });

      pickupAutocomplete.addListener('place_changed', async() => { //event listener for pickup location
        const place = pickupAutocomplete.getPlace();
        setPickupAddress({
          address: place.formatted_address,
          coordinates: place.geometry.location.toJSON(),
        })
      });

      console.log('Pickup location place:', pickupAddress);
      console.log('Driver location place:', driverAddress);
    }
  }, [placesService]);

  const[directionResponse, setDirectionResponse] = useState(null);
  const[distance, setDistance] = useState('');
  const[duration, setDuration] = useState('');
  // const originRef = useRef();
  // const destinationRef = useRef();
  

  async function calculateRoute(){
    if (driverLocationRef.current.value === '' || pickupLocationRef.current.value === '') {
      return;
    }
    const directionService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const results = await directionService.route({
        origin: driverLocationRef.current.value,
        destination: pickupLocationRef.current.value,
        travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
        }
    })
    console.log(results)
    directionsRenderer.setMap(map);
    setDirectionResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }


  return (
    <>
    <div style={{height : "100vh"}}>
      <Map defaultZoom={15} defaultCenter={center} mapId='map-test-smrtbn'>
        <MapControl position={ControlPosition.TOP_CENTER}>
          <div className='flex flex-row items-center gap-4 bg-green-100 rounded p-4 m-4'>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Driver location</Label>
              <Input type="text" ref={driverLocationRef} />
            </div>
            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label>Pickup location</Label>
              <Input type="text" ref={pickupLocationRef}/>
            </div>
          </div>
        </MapControl>
        {driverAddress.coordinates && (
          <AdvancedMarker position={driverAddress.coordinates} > 
            <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
          </AdvancedMarker>
        )}
        {pickupAddress.coordinates && (
          <AdvancedMarker position={pickupAddress.coordinates} > 
            <Pin background={'green'} glyphColor={'#000'} borderColor={'#000'} />
          </AdvancedMarker>
        )}
        <MapControl position={ControlPosition.LEFT_CENTER}>
          <div className='p-4 ml-4 bg-blue-100 rounded-lg'>
            <Button className='w-full bg-green-500' onClick={calculateRoute}>Calculate Route</Button>
            <p className='text-[16px] px-1 pt-2 font-sans'>Distance&nbsp; : {distance}</p>
            <p className='text-[16px] px-1 font-sans'>Duration&nbsp; : {duration}</p>
          </div>
        </MapControl>
      </Map>
    </div>
    <div>
    </div>
    </>
  );
};

export default MapComponent