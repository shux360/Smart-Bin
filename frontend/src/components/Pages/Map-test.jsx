import React, { useState } from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 53.745,
  lng: 12.523,
};

const Map2 = () => {

  return (
    <APIProvider apiKey="AIzaSyDfoowcQ1SIva7ugnYpd2sNSVDFPrqS6-w" onLoad={() => console.log('Maps API has loaded.')}>
        <div style={{height : "100vh"}}>
            <Map defaultZoom={9} defaultCenter={center}></Map>
        </div>
    </APIProvider>
  );
};

export default Map2;
