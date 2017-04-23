import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import Marker from 'components/Marker';

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
  const size = new google.maps.Size(30, 30); // eslint-disable-line
  return (
    <GoogleMap
      ref={props.onMapLoad}
      defaultZoom={props.mapProps.zoom}
      defaultCenter={props.user.location}
      onClick={props.onMapClick}
    >
      {props.markers.map((marker, index) => (
        <Marker
          key={index}
          place={marker}
          mode={props.mode}
          size={size}
        />
      ))}
    </GoogleMap>
  );
});

export class VenuMap extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { user, exhibits, facilities, mapMode, venuMap } = this.props;

    const exhibitsObj = (exhibits.artisticAlley) ? exhibits : exhibits.toJS();
    const facilitiesObj = (facilities.entrance) ? facilities : facilities.toJS();
    const places = getPlacesArray(exhibitsObj, facilitiesObj);

    // Convert venuMap to a JS object
    const mapProps = venuMap.toJS();

    return (
      <Map
        containerElement={
          <div style={{ height: '100%' }} />
        }
        mapElement={
          <div style={{ height: '100%' }} />
        }
        markers={places}
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
