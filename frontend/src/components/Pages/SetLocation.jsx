import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  APIProvider, 
  Map,
  MapControl,
  ControlPosition, 
  AdvancedMarker,
  Pin,
  useMapsLibrary,
  useMap
} from '@vis.gl/react-google-maps';

import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

const center = {  // default location
  lat: 6.0329,
  lng: 80.2168,
};


const MapComponent = () => {
  const map = useMap();  // Access to the underlying google.maps.Map instance

  // Enable dynamic loading of the places library
  const placesLibrary = useMapsLibrary('places'); 

  const pickupLocationRef = useRef(null);  // Ref for pickup location

  const [pickupAddress, setPickupAddress] = useState({ address: '', coordinates: center });
  const [placesService, setPlacesService] = useState(null); // Use places Service
  const [locationChanged, setLocationChanged] = useState(false); // Track if location is changed
  const [locationSet, setLocationSet] = useState(false); // Track if location is set

  useEffect(() => {
    if (!placesLibrary || !map) { console.log("fetching API failed or invalid key"); return; }

    // When placesLibrary is loaded, the library can be accessed via the placesLibrary API object
    setPlacesService(new placesLibrary.PlacesService(map));
  }, [placesLibrary, map]);

  useEffect(() => {
    if (!placesService) return;

    if (pickupLocationRef.current) {
      const pickupAutocomplete = new placesLibrary.Autocomplete(pickupLocationRef.current);  // Autocomplete widget instance for pickup location

      pickupAutocomplete.addListener('place_changed', () => { // Event listener for pickup location
        const place = pickupAutocomplete.getPlace();
        if (place.geometry) {
          const newCoordinates = place.geometry.location.toJSON();
          setPickupAddress({
            address: place.formatted_address,
            coordinates: newCoordinates,
          });
          map.setCenter(newCoordinates); // Center the map on the new location
          setLocationChanged(true); // Mark location as changed
        }
      });
    }
  }, [placesService, map]);
  const navigate = useNavigate();
const handleGoBack = () => {
    navigate('/signup');
};

  const handleMarkerDragEnd = (event) => {
    const newLatLng = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    // Reverse geocoding to get the address from the coordinates
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: newLatLng }, (results, status) => {
      if (status === 'OK' && results[0]) {
        setPickupAddress({
          address: results[0].formatted_address,
          coordinates: newLatLng,
        });
        map.setCenter(newLatLng); // Center the map on the new marker position
        setLocationChanged(true); // Mark location as changed
      }
    });
  };

  const handleSetLocation = () => {
    // Save the current location
    console.log('Location set:', pickupAddress);
    setLocationChanged(false); // Reset location changed status
    setLocationSet(true); // Mark location as set
    // Set coordinates in localStorage
    const latitude = pickupAddress.coordinates.lat;
    const longitude = pickupAddress.coordinates.lng;
    localStorage.setItem('userLatitude', latitude);
    localStorage.setItem('userLongitude', longitude);
  };

  const handleChangeLocation = () => {
    setPickupAddress({ address: '', coordinates: center });
    map.setCenter(center);
    setLocationChanged(true); // Allow user to set a new location
    setLocationSet(false); // Reset location set status
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '20px' }}>
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight" style={{ marginBottom: '30px', textAlign: 'center' }}>Set Your Pickup Location</h4>
      <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '10px', width: '100%', maxWidth: '600px' }}>
          <Input id="pickup-location" type="text" ref={pickupLocationRef} style={{ flexGrow: 1 }} />
          {locationChanged && (
            <Button onClick={handleSetLocation}>
              {locationSet ? 'Change Location' : 'Set Location'}
            </Button>
          )}
          {locationSet && (
            <Button onClick={handleGoBack}>
              Done
            </Button>
          )}
          
        </div>
      </div>
      <div style={{ flexGrow: 1 }}>
        <Map defaultZoom={15} defaultCenter={pickupAddress.coordinates} mapId='map-test-smrtbn'>
          {pickupAddress.coordinates && (
            <AdvancedMarker 
              position={pickupAddress.coordinates} 
              draggable={true} 
              onDragEnd={handleMarkerDragEnd}
            > 
            <Pin background={'#000'} glyphColor={'gray'} borderColor={'#fff'} />
            </AdvancedMarker>
          )}
        </Map>
      </div>
    </div>
  );
};

const SetLocation = () => {
    
  return (
    <APIProvider apiKey="AIzaSyDfoowcQ1SIva7ugnYpd2sNSVDFPrqS6-w" onLoad={() => console.log('Maps API has loaded.')}>
      <MapComponent />
    </APIProvider>
  );
};


export default SetLocation;