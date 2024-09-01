import React, { useState, useEffect } from 'react';
import { useMapsLibrary, useMap } from "@vis.gl/react-google-maps";
import LocationList from './LocationList';
import locationIcon from '../../assets/location.png';

const Directions = () => {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const [selectedLatLng, setSelectedLatLng] = useState(null);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];
  const [driver, setDriver] = useState(null);
  const [driverId, setDriverId] = useState(null);
  const [garbageLocations, setGarbageLocations] = useState([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_SERVER_DOMAIN}/driver/drivers`);
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            const selectedDriverId = data[0]._id;
            setDriverId(selectedDriverId);
          } else {
            console.error("No drivers found in the database.");
          }
        } else {
          const errorText = await response.text();
          console.error("Error fetching drivers:", errorText);
        }
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };
    fetchDrivers();
  }, []);

  useEffect(() => {
    if (driverId) {
      const fetchDriver = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_APP_SERVER_DOMAIN}/driver/drivers/${driverId}`);
          if (response.ok) {
            const data = await response.json();
            setDriver(data);
          } else {
            const errorText = await response.text();
            console.error("Error fetching driver:", errorText);
          }
        } catch (error) {
          console.error("Error fetching driver:", error);
        }
      };
      fetchDriver();
    }
  }, [driverId]);

  const driverLocation = driver?.location;
  const [selectedAddress, setSelectedAddress] = useState(driverLocation);

  useEffect(() => {
    const fetchGarbageLocations = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_SERVER_DOMAIN}/get-all-garbage-details`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data.garbage)) {
            setGarbageLocations(data.garbage);
          } else {
            console.error("Expected an array but got:", data);
          }
        } else {
          const errorText = await response.text();
          console.error("Error fetching garbage locations:", errorText);
        }
      } catch (error) {
        console.error("Error fetching garbage locations:", error);
      }
    };
    fetchGarbageLocations();
  }, []);

  useEffect(() => {
    if (!routesLibrary || !map) return;
    const directionsServiceInstance = new routesLibrary.DirectionsService();
    const directionsRendererInstance = new routesLibrary.DirectionsRenderer({ map });
    setDirectionsService(directionsServiceInstance);
    setDirectionsRenderer(directionsRendererInstance);

    return () => {
      directionsRendererInstance.setMap(null);
    };
  }, [routesLibrary, map]);

  const fetchRoute = (origin, destination) => {
    if (!directionsService || !directionsRenderer || !driverLocation || !destination) return;

    directionsService
      .route({
        origin: driverLocation,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes([response.routes[0]]);
      })
      .catch((error) => {
        console.error("Error fetching directions:", error);
      });
  };

  useEffect(() => {
    if (driverLocation && garbageLocations.length > 0) {
      const firstAddress = `${garbageLocations[0].location.streetName}, ${garbageLocations[0].location.city}`;
      setSelectedAddress(firstAddress);
      fetchRoute(driverLocation, firstAddress);
    }
  }, [directionsService, directionsRenderer, driverLocation, garbageLocations]);

  useEffect(() => {
    if (directionsRenderer && routes.length) {
      directionsRenderer.setRouteIndex(routeIndex);
    }
  }, [routeIndex, directionsRenderer, routes]);

  if (!leg) return null;

  const handleLocationClick = (address) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        const locationAddress = results[0].geometry.location;
        setSelectedLatLng(locationAddress);
        setSelectedAddress(address);

        if (directionsService && directionsRenderer) {
          directionsService
            .route({
              origin: driverLocation,
              destination: locationAddress,
              travelMode: window.google.maps.TravelMode.DRIVING,
              provideRouteAlternatives: true,
            })
            .then((response) => {
              directionsRenderer.setDirections(response);
              setRoutes([response.routes[0]]);
            })
            .catch((error) => {
              console.error("Error fetching directions:", error);
            });
        }
      } else {
        console.error('Geocode was not successful for the following reason: ' + status);
      }
    });
  };

  return (
    <div className="directions w-1/3 ml-16">
      <h3 className="text-3xl font-bold text-start mt-8">Your Collection Route</h3>

      <div className="flex flex-col items-start mt-8 w-full">

        {/* Next Pick Up */}
        <div className="flex flex-col justify-start items-start ">
          <h3 className="text-xl font-medium">Next Pick Up Address</h3>
          <div className="inline-flex mt-6 space-x-2">
            <img src={locationIcon} className="w-6 h-6 cursor-pointer" alt="location" />
            <p className="text-gray-600 font-medium text-lg">
              {selectedAddress || leg.end_address.split(",")[0]}
            </p>
          </div>

          <div className="bg-primary-foreground h-20 rounded-xl shadow-lg flex items-center justify-between p-6 my-12">
            <div className="inline-block space-y-2">
              <p className="text-lg font-normal">Route distance</p>
              <p className="text-lg font-medium">{leg.distance?.text}</p>
            </div>
            <div className="h-full border-r-2 border-black mx-4"></div>
            <div className="inline-block space-y-2">
              <p className="text-lg font-normal">Estimated time</p>
              <p className="text-lg font-medium">{leg.duration?.text}</p>
            </div>
          </div>
        </div>

        {/* To Pick Up Locations */}
        <div className="flex flex-col justify-start items-start">
          <h3 className="text-xl font-medium">To Pick Up locations</h3>
          <div className="bg-primary-foreground rounded-lg w-[420px] h-64 shadow-lg my-6 p-6">
            <div className="inline-flex items-center justify-between w-full">
              <p className="font-medium text-lg">Locations</p>
              <p className="font-medium text-lg">Status</p>
            </div>
            <ul className="my-6 max-h-40 overflow-y-auto scrollbar">
              {garbageLocations.filter((garbageLocation) => garbageLocation.pickupStatus !== "Picked Up").map((garbageLocation, index) => (
                <LocationList
                  key={index}
                  address={garbageLocation.location.streetName + ' ,' + garbageLocation.location.city}
                  status={garbageLocation.pickupStatus}
                  onClick={() => handleLocationClick(garbageLocation.location.streetName + ' ,' + garbageLocation.location.city)}
                />
              ))}
            </ul>
          </div>
        </div>

        {/* Picked Up history */}
        <div className="flex flex-col justify-start items-start">
          <h3 className="text-xl font-medium">Picked Up history</h3>
          <div className="bg-primary-foreground rounded-lg w-[420px] h-64 shadow-lg my-6 p-6">
            <div className="inline-flex items-center justify-between w-full">
              <p className="font-medium text-lg">Locations</p>
              <p className="font-medium text-lg">Status</p>
            </div>
            <ul className="my-6 max-h-40 overflow-y-auto scrollbar">
              {garbageLocations.filter((garbageLocation) => garbageLocation.pickupStatus === "Picked Up").map((garbageLocation, index) => (
                <LocationList
                  key={index}
                  address={garbageLocation.location.streetName + ' ,' + garbageLocation.location.city}
                  status={garbageLocation.pickupStatus}
                  onClick={() => handleLocationClick(garbageLocation.location.streetName + ' ,' + garbageLocation.location.city)}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Directions;
