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
} from 'containers/App/selectors';

// Dispatches
import {
  dispatchChangeMapCenter,
  dispatchChangeCurrentPlace,
} from 'containers/App/dispatches';

import Marker from 'components/Markers';
import UserIcon from 'media/icons/user.png';

import {
  getPlacesArray,
  filterExhibitsBy,
  getFacilitiesArray,
} from 'utils/helpers';

import { UserPinWrapper, UserPin, UserImage } from './styles';

export class VenuMap extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.renderUserPin = this.renderUserPin.bind(this);
    this.renderPlacesPin = this.renderPlacesPin.bind(this);
  }

  renderUserPin() {
    const { user, onChangeMapCenter } = this.props;

    // user location may be an immutable or an object so make a check
    // If it is an object we can use it
    // Otherwise turn it into a JS object using .JS()
    const location = (user.get('location').lat) ? user.get('location') : user.get('location').toJS();
    const name = (user.get('name') !== '') ? user.get('name') : 'User';

    return (
      <UserPinWrapper lat={location.lat} lng={location.lng} onClick={() => { onChangeMapCenter(location); }}>
        <UserPin>
          <UserImage alt={`${name}'s Profile Picture`} src={UserIcon} />
        </UserPin>
      </UserPinWrapper>
    );
  }

  renderPlacesPin() {
    const { mapMode, exhibits, facilities, currentPlace, onSelectPlace } = this.props;

    const exhibitsObj = exhibits.toJS();
    const facilitiesObj = facilities.toJS();
    let places;
    const placeProperty = 'subType';
    const bookmarked = 'bookmarked';

    if (!exhibits || !facilities) return null;

    switch (mapMode) {
      case 'Itinerary':
        places = filterExhibitsBy(exhibitsObj, placeProperty, bookmarked);
        break;
      case 'Facilities':
        places = getFacilitiesArray(facilitiesObj);
        break;
      case 'Discover':
      default:
        places = getPlacesArray(exhibitsObj, facilitiesObj);
        break;
    }

    return places.map((place) => { // eslint-disable-line
      return (
        <Marker
          key={place.id}
          lat={place.lat}
          lng={place.lng}
          place={place}
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
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  venuMap: makeSelectVenuMap(),
  mapMode: makeSelectMapMode(),
  exhibits: makeSelectExhibits(),
  facilities: makeSelectFacilities(),
  currentPlace: makeSelectCurrentPlace(),
});

// Map dispatches to props
export function mapDispatchToProps(dispatch) {
  return {
    onChangeMapCenter: (center) => dispatchChangeMapCenter(dispatch, center),
    onSelectPlace: (place) => {
      const center = {
        lat: place.lat,
        lng: place.lng,
      };
      dispatchChangeCurrentPlace(dispatch, place);
      dispatchChangeMapCenter(dispatch, center);
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VenuMap);
