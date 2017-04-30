import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';
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
  dispatchNavigateToPlace,
  dispatchChangeCurrentPlace,
  dispatchChangeUserLocation,
} from 'containers/App/dispatches';

import { getPlacesArray } from 'utils/helpers';

// Wrap all `react-google-maps` components with `withGoogleMap` HOC
// and name it Map
const Map = withGoogleMap((props) => { // eslint-disable-line
  const imageSize = 40;
  const size = new google.maps.Size(imageSize, imageSize); // eslint-disable-line
  const anchor = new google.maps.Point(imageSize / 2, imageSize / 2); // eslint-disable-line
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
      onClick={props.onMapClick}
      center={props.user.location}
      defaultZoom={props.mapProps.zoom}
      defaultCenter={props.mapProps.center}
      defaultOptions={props.mapProps.options}
      ref={(map) => map && map.panTo(props.user.location)}
    >
      <MarkerClusterer
        averageCenter
        gridSize={60}
        styles={clusterStyles}
      >
        {props.markers.map((marker, index) => (
          <Marker
            key={index}
            size={size}
            place={marker}
            anchor={anchor}
            mode={props.mode}
          />
        ))}
      </MarkerClusterer>
      {props.userMarkers.map((marker, index) => (
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

export class VenuMap extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { user, exhibits, facilities, mapMode, venuMap, onChangeMapCenter, onNavigateToPlace } = this.props;
    // Convert venuMap to a JS object
    const mapProps = venuMap.toJS();
    const userObject = (user.location) ? user : user.toJS();
    const exhibitsObj = (exhibits.artisticAlley) ? exhibits : exhibits.toJS();
    const facilitiesObj = (facilities.entrance) ? facilities : facilities.toJS();
    const places = getPlacesArray(exhibitsObj, facilitiesObj);

    // Create the user Marker
    const userMarker = {
      type: 'user',
      lat: userObject.location.lat,
      lng: userObject.location.lng,
      photoURL: userObject.photoURL,
      onClickEvent: onChangeMapCenter,
    };

    const userMarkers = [userMarker];

    // If we have parking add it to usermarkers
    if (userObject.parking && (userObject.parking.lat && userObject.parking.lng)) {
      // Create the parking Marker
      const parkingMarker = {
        type: 'parking',
        lat: userObject.parking.lat,
        lng: userObject.parking.lng,
        onClickEvent: onNavigateToPlace,
      };

      userMarkers.push(parkingMarker);
    }

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
        user={userObject}
        mapProps={mapProps}
        panToLocation={null}
      />
    );
  }
}

VenuMap.propTypes = {
  user: T.object,
  venuMap: T.object.isRequired,
  mapMode: T.string.isRequired,
  exhibits: T.object.isRequired,
  facilities: T.object.isRequired,
  onChangeMapCenter: T.func.isRequired,
  onNavigateToPlace: T.func.isRequired,
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
    onNavigateToPlace: (place) => {
      // Set place to navigate to
      dispatchNavigateToPlace(dispatch, place);
      // Redirect to Directions
      browserHistory.push({ pathname: '/directions' });
    },
    onSelectPlace: (place) => {
      const center = Object.assign({}, { lat: place.lat, lng: place.lng });
      dispatchChangeMapCenter(dispatch, center);
      dispatchChangeCurrentPlace(dispatch, place);
    },
    onChangeMapCenter: (center) => dispatchChangeMapCenter(dispatch, center),
    onUserLocationChange: (location) => dispatchChangeUserLocation(dispatch, location),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VenuMap);
