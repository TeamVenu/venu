import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import GoogleMap from 'google-map-react';

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

import Marker from 'components/Markers';
import UserIcon from 'media/icons/user.png';

import { getPlacesArray } from 'utils/helpers';

import { UserPinWrapper, UserPin, UserImage } from './styles';

export class VenuMap extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.renderUserParking = this.renderUserParking.bind(this);
    this.renderUserPin = this.renderUserPin.bind(this);
    this.renderPlacesPin = this.renderPlacesPin.bind(this);
  }

  renderUserPin() {
    const { user, onChangeMapCenter } = this.props;

    return (
      <UserPinWrapper
        lat={user.location.lat}
        lng={user.location.lng}
        onClick={() => {
          onChangeMapCenter(user.location);
        }}
      >
        <UserPin>
          <UserImage alt={`${user.name}'s Profile Picture`} src={UserIcon} />
        </UserPin>
      </UserPinWrapper>
    );
  }

  renderUserParking() {
    const { user } = this.props;
    if (!user.name) return null;

    const place = {
      type: 'facility',
      subType: 'parking',
      lat: user.parking.lat,
      lng: user.parking.lng,
    };

    return (
      <Marker
        place={place}
        lat={place.lat}
        lng={place.lng}
        currentPlace={place}
      />
    );
  }

  renderPlacesPin() {
    const { mapMode, exhibits, facilities, currentPlace, onSelectPlace } = this.props;

    if (!exhibits || !facilities) return null;

    const exhibitsObj = exhibits.toJS();
    const facilitiesObj = facilities.toJS();
    const places = getPlacesArray(exhibitsObj, facilitiesObj);

    return places.map((place, index) => { // eslint-disable-line
      return (
        <Marker
          key={index}
          lat={place.lat}
          lng={place.lng}
          place={place}
          mode={mapMode}
          currentPlace={currentPlace}
          onClickEvent={(p) => { onSelectPlace(p); }}
        />
      );
    });
  }

  render() {
    const { venuMap } = this.props;

    // Convert venuMap to a JS object
    const mapProps = venuMap.toJS();

    return (
      <GoogleMap
        bootstrapURLKeys={mapProps.bootstrapURLKeys}
        center={mapProps.center}
        zoom={mapProps.zoom}
        options={mapProps.options}
        hoverDistance={mapProps.markerSize}
      >
        {this.renderPlacesPin()}
        {this.renderUserParking()}
        {this.renderUserPin()}
      </GoogleMap>
    );
  }
}

VenuMap.propTypes = {
  user: T.object,
  onSelectPlace: T.func,
  currentPlace: T.object,
  onChangeMapCenter: T.func,
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
