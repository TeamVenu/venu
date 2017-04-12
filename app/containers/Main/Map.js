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

    this.renderUserPin = this.renderUserPin.bind(this);
    this.renderPlacesPin = this.renderPlacesPin.bind(this);
      
  }
    
  
    
componentDidMount(){
    const { onUserLocationChange} = this.props;
    navigator.geolocation.watchPosition((position) => {
                const location = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  };
      onUserLocationChange(location);
        console.log(location);
    }, null ,{enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});


}
    

  renderUserPin() {
    const { user, onChangeMapCenter} = this.props;


    // user location may be an immutable or an object so make a check
    // If it is an object we can use it
    // Otherwise turn it into a JS object using .JS()
    const name = (user.get('name') !== '') ? user.get('name') : 'User';

    // If user location is not an immutable
    // Assign its object
    // Otherwise we have to dig to get our coordinates
    const location = (user.get('location').lat !== undefined)
      ? Object.assign({}, user.get('location'))
      : Object.assign({}, { lat: user.getIn(['location', 'lat']), lng: user.getIn(['location', 'lng']) });
      
      

    if (!user.name) return null;


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
      < /UserPinWrapper>
    );
  }

  renderPlacesPin() {
    const { mapMode, exhibits, facilities, currentPlace, onSelectPlace } = this.props;

    if (!exhibits || !facilities) return null;

    const exhibitsObj = exhibits.toJS();
    const facilitiesObj = facilities.toJS();
    const places = getPlacesArray(exhibitsObj, facilitiesObj);

    return places.map((place) => { // eslint-disable-line
      return (
        <Marker
          key={place.id}
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
    const { venuMap, destination } = this.props;
      
//      console.log('Destination');
//      console.log(destination);

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
        { this.renderPlacesPin() }
        { this.renderUserPin() }
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
  destination: T.object,
  onUserLocationChange: T.func,
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
