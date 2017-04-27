import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import Marker from 'components/Marker';
import MarkerClusterer from 'react-google-maps/lib/addons/MarkerClusterer';
import MergedPin from 'media/icons/pins/mergedpin.svg';
import ClusterPin from 'media/icons/pins/clusterpin.svg';

// Global Selectors
import {
  makeSelectUser,
  makeSelectVenuMap,
  makeSelectMapMode,
  makeSelectExhibits,
  makeSelectFacilities,
  makeSelectCurrentPlace,
  makeSelectDestination,
} from 'containers/App/selectors';

// Dispatches
import {
  dispatchChangeMapCenter,
  dispatchChangeCurrentPlace,
  dispatchChangeUserLocation,
} from 'containers/App/dispatches';

import { getPlacesArray } from 'utils/helpers';

// Wrap all `react-google-maps` components with `withGoogleMap` HOC
// and name it GettingStartedGoogleMap
const Map = withGoogleMap((props) => { // eslint-disable-line
  const size = new google.maps.Size(35, 35); // eslint-disable-line
  const userSize = new google.maps.Size(40, 40); // eslint-disable-line
  const clusterStyles = [
    {
      textColor: 'white',
      url: MergedPin,
      width: 45,
      height: 38,
    },
    {
      textColor: 'white',
      url: ClusterPin,
      width: 43,
      height: 45,
    },
  ];

  return (
    <GoogleMap
      ref={props.onMapLoad}
      defaultZoom={props.mapProps.zoom}
      defaultCenter={props.user.location}
      onClick={props.onMapClick}
      defaultOptions={props.mapProps}
    >
      <MarkerClusterer
        averageCenter
        gridSize={60}
        styles={clusterStyles}
      >
        {props.markers.map((marker, index) => (
          <Marker
            key={index}
            place={marker}
            mode={props.mode}
            size={size}
          />
        ))}
      </MarkerClusterer>
      {props.userMarkers.map((marker, index) => (
        <Marker
          key={index}
          place={marker}
          size={userSize}
        />
      ))}
    </GoogleMap>
  );
});

export class VenuMap extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { user, exhibits, facilities, mapMode, venuMap } = this.props;
    // Convert venuMap to a JS object
    const mapProps = venuMap.toJS();
    const userObject = (user.location) ? user : user.toJS();
    const exhibitsObj = (exhibits.artisticAlley) ? exhibits : exhibits.toJS();
    const facilitiesObj = (facilities.entrance) ? facilities : facilities.toJS();
    const places = getPlacesArray(exhibitsObj, facilitiesObj);


    // Create the parking Marker
    const parkingMarker = {
      type: 'parking',
      lat: userObject.parking.lat,
      lng: userObject.parking.lng,
    };

    // Create the user Marker
    const userMarker = {
      type: 'user',
      lat: userObject.location.lat,
      lng: userObject.location.lng,
      photoURL: userObject.photoURL,
    };

    const userMarkers = [parkingMarker, userMarker];

    // Add new markers to places
    // places.push(parkingMarker, userMarker);

    return (
      <Map
        containerElement={
          <div style={{ height: '100%' }} />
        }
        mapElement={
          <div style={{ height: '100%' }} />
        }
        markers={places}
        userMarkers={userMarkers}
        mode={mapMode}
        user={user}
        mapProps={mapProps}
      />
    );
  }
}

VenuMap.propTypes = {
  user: T.object,
  // onSelectPlace: T.func,
  // currentPlace: T.object,
  // onChangeMapCenter: T.func,
  venuMap: T.object.isRequired,
  mapMode: T.string.isRequired,
  exhibits: T.object.isRequired,
  facilities: T.object.isRequired,
  // destination: T.object,
  // onUserLocationChange: T.func,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  venuMap: makeSelectVenuMap(),
  mapMode: makeSelectMapMode(),
  exhibits: makeSelectExhibits(),
  facilities: makeSelectFacilities(),
  currentPlace: makeSelectCurrentPlace(),
  destination: makeSelectDestination(),
});

// Map dispatches to props
export function mapDispatchToProps(dispatch) {
  return {
    onChangeMapCenter: (center) => dispatchChangeMapCenter(dispatch, center),
    onSelectPlace: (place) => {
      const center = Object.assign({}, { lat: place.lat, lng: place.lng });
      dispatchChangeMapCenter(dispatch, center);
      dispatchChangeCurrentPlace(dispatch, place);
    },
    onUserLocationChange: (location) => dispatchChangeUserLocation(dispatch, location),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VenuMap);
