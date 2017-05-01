import React from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import Marker from 'components/Marker';

const Map = withGoogleMap((props) => {
  const imageSize = 40;
  const size = new google.maps.Size(imageSize, imageSize); // eslint-disable-line
  const anchor = new google.maps.Point(imageSize / 2, imageSize / 2); // eslint-disable-line
  const { options, zoom } = props.mapProps;
  const { center, markers } = props;

  return (
    <GoogleMap
      center={center}
      defaultZoom={zoom}
      defaultOptions={options}
    >
      {markers.map((marker, index) => (
        <Marker
          key={index}
          size={size}
          place={marker}
          anchor={anchor}
          onClickEvent={marker.onClickEvent}
        />
      ))}
    </GoogleMap>
  );
});

export default Map;
