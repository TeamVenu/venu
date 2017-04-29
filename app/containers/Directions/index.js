// TODO: Check but about sending users back to onboarding
/*
 * Directions
 */
import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';

import Card from 'components/Card';
import Button from 'components/Button';

// Selectors
import {
  makeSelectUser,
  makeSelectIsSignedIn,
  makeSelectDestination,
  // makeSelectError,
  // makeSelectLoading,
  makeSelectVenuMap,
  // makeSelectMapMode,
  // makeSelectExhibits,
  // makeSelectFacilities,
} from 'containers/App/selectors';

import {
  dispatchSetUser,
  dispatchChangeExhibit,
} from 'containers/App/dispatches';

import { dispatchSetStage } from 'containers/Onboarding/dispatches';

import { isUserOnboardingComplete } from 'utils/helpers';

// Directions Map
import Map from './Map';

import {
  Wrapper,
  CardContainer,
  BottomContainer,
  ActionContainer,
} from './styles';

import {
  makeSelectTimer,
  makeSelectDirections,
  makeSelectIsLocationEnabled,
} from './selectors';

import {
  dispatchSetTimer,
  dispatchSetDirections,
  dispatchGetUserLocation,
  dispatchSetLocationEnabled,
} from './dispatches';

export class Directions extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.timer = this.timer.bind(this);
  }

  componentWillMount() {
    const { isSignedIn, userProp, onStartOnboarding, onUpdateUserLocation } = this.props;
    const user = (userProp.location) ? userProp : userProp.toJS();

    // If not signed in redirect to sign in
    if (!isSignedIn) {
      browserHistory.push({
        pathname: '/login',
      });
    } else if (!isUserOnboardingComplete(user)) {
      // Start onboarding
      onStartOnboarding(0);

      // Redirect to onboarding
      browserHistory.push({
        pathname: '/onboarding',
      });
    }

    onUpdateUserLocation(user);
  }

  componentDidMount() {
    const { userProp, place, isLocationEnabled, onSetTimer, onSetDirections } = this.props;
    const user = (userProp.location) ? userProp : userProp.toJS();
    const destination = (place.lat) ? place : place.toJS();
    const travelMode = google.maps.TravelMode.WALKING; // eslint-disable-line
    const DirectionsService = new google.maps.DirectionsService(); // eslint-disable-line
    const okStatus = google.maps.DirectionsStatus.OK; // eslint-disable-line
    const timeToUpdateLocation = 60000; // minute to update

    if (destination.lat && destination.lng && user.location) {
      DirectionsService.route({
        origin: user.location,
        destination,
        travelMode,
      }, (result, status) => {
        if (status === okStatus) {
          onSetDirections(result);

          if (isLocationEnabled) {
            const timer = setInterval(this.timer, timeToUpdateLocation);
            onSetTimer(timer);
          }
        } else {
          console.error(`Error fetching directions ${result}`);
          browserHistory.goBack();
        }
      });
    }
  }

  componentWillUnmount() {
    const { timer, onSetTimer, onSetLocationEnabled } = this.props;

    // Clear timer
    clearInterval(timer);

    // Set timer to null
    onSetTimer(null);

    // Set location to true so that we can check again
    onSetLocationEnabled(true);
  }

  timer() {
    const { userProp, isLocationEnabled, onUpdateUserLocation } = this.props;
    const user = (userProp.location) ? userProp : userProp.toJS();

    if (isLocationEnabled) {
      onUpdateUserLocation(user);
    }
  }

  render() {
    const { userProp, place, directions, venuMap, onReachDestination } = this.props;

    const mapProps = venuMap.toJS();
    const user = (userProp.location) ? userProp : userProp.toJS();
    const destination = (place.lat) ? place : place.toJS();

    if (!destination.lat && !destination.lng) return null;

    // Create user marker
    const userMarker = {
      type: 'user',
      lat: user.location.lat,
      lng: user.location.lng,
      photoURL: user.photoURL,
    };

    // Make default markers
    const markers = [userMarker, destination];

    let link = null;
    let room = '';
    let location = '';
    switch (destination.type) {
      case 'exhibit':
        link = `/${destination.type}/${destination.colorZone}/${destination.exhibitCode}/${destination.key}`;
        room = (isNaN(destination.location) && isNaN(destination.location.charAt(1)))
        ? destination.location
        : destination.exhibitCode;
        location = `${destination.building}, ${room}`;
        break;
      case 'facility':
        link = `/${destination.type}/${destination.colorZone}/${destination.subType}/${destination.key}`;
        room = (isNaN(destination.location) && isNaN(destination.location.charAt(1)))
        ? destination.location
        : destination.exhibitCode;
        location = `${destination.building}, ${room}`;
        break;
      default:
        link = null;
        location = null;
        break;
    }

    const cardInfo = {
      link,
      location,
      place: destination,
      name: (destination.type !== 'parking') ? destination.name : `${user.name}'s Parking Spot`,
      zone: (destination.type !== 'parking') ? destination.imagineRitArea : 'Parking',
      zoneClass: (destination.type !== 'parking') ? destination.colorZone : 'parking',
    };

    return (
      <Wrapper>
        <Map
          containerElement={
            <section style={{ height: '100%' }} />
          }
          mapElement={
            <section style={{ height: '100%' }} />
          }
          markers={markers}
          mapProps={mapProps}
          center={user.location}
          directions={directions}
        />
        <BottomContainer>
          <CardContainer>
            <Card place={cardInfo} cardClass={'full'} />
          </CardContainer>
          <ActionContainer>
            <Button
              btnClasses={'full'}
              name={'Cancel'}
              onClickEvent={() => {
                browserHistory.goBack();
              }}
            />
            <Button
              btnClasses={'full special reversed'}
              name={'I\'m There'}
              onClickEvent={() => {
                onReachDestination(destination, user);
              }}
            />
          </ActionContainer>
        </BottomContainer>
      </Wrapper>
    );
  }
}

Directions.propTypes = {
  timer: T.any,
  place: T.object,
  directions: T.any,
  venuMap: T.object,
  isSignedIn: T.bool,
  userProp: T.object,
  isLocationEnabled: T.bool,
  onStartOnboarding: T.func,
  onSetTimer: T.func.isRequired,
  onSetDirections: T.func.isRequired,
  onReachDestination: T.func.isRequired,
  onSetLocationEnabled: T.func.isRequired,
  onUpdateUserLocation: T.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  timer: makeSelectTimer(),
  userProp: makeSelectUser(),
  venuMap: makeSelectVenuMap(),
  place: makeSelectDestination(),
  isSignedIn: makeSelectIsSignedIn(),
  directions: makeSelectDirections(),
  isLocationEnabled: makeSelectIsLocationEnabled(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSetTimer: (timer) => dispatchSetTimer(dispatch, timer),
    onStartOnboarding: (stage) => dispatchSetStage(dispatch, stage),
    onUpdateUserLocation: (user) => dispatchGetUserLocation(dispatch, user),
    onSetDirections: (directions) => dispatchSetDirections(dispatch, directions),
    onSetLocationEnabled: (enabled) => dispatchSetLocationEnabled(dispatch, enabled),
    onChangeExhibit: (p, subType) => {
      // Make a new place object
      // Make sure we don't mutate te old object
      // To do this we user Object.assing({}, ...)
      const place = Object.assign({}, p, { previousSubType: p.subType, subType });
      dispatchChangeExhibit(dispatch, place);
    },
    onReachDestination: (p, u) => {
      const exhibits = {
        recommended: [],
        visited: [],
        saved: [],
      };

      // Create the string to store in database
      const visitedPlace = `${p.colorZone}-${p.key}`;

      // Filter out visitedPlace from recommended places
      exhibits.recommended = u.exhibits.recommended.filter((places) => { // eslint-disable-line
        return places !== visitedPlace;
      });

      // Filter out visitedPlace from saved places
      exhibits.saved = u.exhibits.saved.filter((places) => { // eslint-disable-line
        return places !== visitedPlace;
      });

      // Push saved place to savedExhibits
      exhibits.visited = u.exhibits.visited.concat(visitedPlace);

      // Make a new user object
      // Make sure we don't mutate old object
      const user = Object.assign({}, u, { exhibits });

      // Make a new place object
      // Make sure we don't mutate te old object
      // To do this we user Object.assing({}, ...)
      const place = Object.assign({}, p, { previousSubType: p.subType, subType: 'visited' });
      dispatchSetUser(dispatch, user);
      dispatchChangeExhibit(dispatch, place);
      browserHistory.goBack();
    },
  };
}

// Connect our props to Directions
export default connect(mapStateToProps, mapDispatchToProps)(Directions);
