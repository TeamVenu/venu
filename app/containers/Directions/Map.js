import React from 'react';
import { withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps';

import Marker from 'components/Marker';

import { makeGradientColor } from 'utils/helpers';

export const Map = withGoogleMap((props) => { // eslint-disable-line
  const imageSize = 40;
  const size = new google.maps.Size(imageSize, imageSize); // eslint-disable-line
  const anchor = new google.maps.Point(imageSize / 2, imageSize / 2); // eslint-disable-line
  const red = {
    r: 255,
    g: 46,
    b: 53,
  };

  const orange = {
    r: 252,
    g: 127,
    b: 62,
  };

  const color = makeGradientColor(red, orange, 100);
  const directionsOptions = {
    suppressMarkers: true,
    polylineOptions: {
      strokeWeight: 5,
      strokeColor: color.css,
    },
  };

  return (
    <GoogleMap
      defaultZoom={17}
      defaultCenter={props.center}
      defaultOptions={props.mapProps.options}
    >
      {props.markers.map((marker, index) => (
        <Marker
          key={index}
          place={marker}
          mode={props.mode}
          size={size}
          anchor={anchor}
        />
      ))}
      {
        props.directions &&
        <DirectionsRenderer
          directions={props.directions}
          options={directionsOptions}
        />
      }
    </GoogleMap>
  );
});

export default Map;
