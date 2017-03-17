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

import Marker from 'components/Markers';
import UserIcon from 'media/icons/user.png';
import {
  // getFacilitiesArray,
  getPlacesArray,
  // filterExhibitsBy,
} from 'utils/helpers';
import { UserPinWrapper, UserPin, UserImage } from './styles';

export class VenuMap extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.renderUserPin = this.renderUserPin.bind(this);
    this.renderPlacesPin = this.renderPlacesPin.bind(this);
  }

  renderUserPin() {
    const { user } = this.props;
    const location = user.get('location').toJS();
    const name = (user.get('name') !== '') ? user.get('name') : 'User';

    return (
      <UserPinWrapper lat={location.lat} lng={location.lng}>
        <UserPin>
          <UserImage alt={`${name}'s Profile Picture`} src={UserIcon} />
        </UserPin>
      </UserPinWrapper>
    );
  }

  renderPlacesPin() {
    const { exhibits, facilities } = this.props;

    const exhibitsObj = exhibits.toJS();
    const facilitiesObj = facilities.toJS();

    if (!exhibits || !facilities) return null;

    const places = getPlacesArray(exhibitsObj, facilitiesObj);

    return places.map((place) => { // eslint-disable-line
      return (
        <Marker
          key={place.id}
          lat={place.lat}
          lng={place.lng}
          place={place}
          currentMarker={this.props.currentPlace}
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
  // testFunc: T.func,
  venuMap: T.object.isRequired,
  // mapMode: T.string.isRequired,
  exhibits: T.object.isRequired,
  facilities: T.object.isRequired,
  currentPlace: T.object,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  venuMap: makeSelectVenuMap(),
  mapMode: makeSelectMapMode(),
  exhibits: makeSelectExhibits(),
  facilities: makeSelectFacilities(),
  currentPlace: makeSelectCurrentPlace(),
});

// Replace in the future
export function mapDispatchToProps(dispatch) {
  return {
    testFunc: () => dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VenuMap);
