// TODO: Check but about sending users back to onboarding
/*
 * Directions
 */
import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';

import P from 'components/P';
import Card from 'components/Card';
import Button from 'components/Button';

// Selectors
import {
  makeSelectUser,
  makeSelectIsSignedIn,
  makeSelectDestination,
  makeSelectVenuMap,
} from 'containers/App/selectors';

import {
  dispatchSetUser,
  dispatchChangeExhibit,
} from 'containers/App/dispatches';

import { dispatchSetStage } from 'containers/Onboarding/dispatches';

import { isUserOnboardingComplete } from 'utils/helpers';

// Directions Map
import Map from './Map';

import messages from './messages';

import {
  Wrapper,
  CardContainer,
  BottomContainer,
  ActionContainer,
} from './styles';

import {
  makeSelectTimer,
  makeSelectDirections,
  makeSelectIsNavigating,
  makeSelectIsLocationEnabled,
} from './selectors';

import {
  dispatchSetTimer,
  dispatchSetDirections,
  dispatchSetNavigating,
  dispatchGetUserLocation,
  dispatchSetLocationEnabled,
} from './dispatches';

export class Directions extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.timer = this.timer.bind(this);
    this.getDirections = this.getDirections.bind(this);
    this.renderActions = this.renderActions.bind(this);
  }

  componentWillMount() {
    const { isSignedIn, userProp, onStartOnboarding } = this.props;
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
  }

  componentDidMount() {
    // Get directions
    this.getDirections();
  }

  componentWillUnmount() {
    const { timer, onSetTimer, onSetLocationEnabled, onSetNavigating, onSetDirections } = this.props;

    // Clear timer
    clearInterval(timer);

    // Set timer to null
    onSetTimer(null);

    // Set location to true so that we can check again
    onSetLocationEnabled(true);

    // Set navigating to false
    onSetNavigating(false);

    // Set directions to null
    onSetDirections(null);
  }

  getDirections() {
    const { userProp, place, isNavigating, isLocationEnabled, onSetTimer, onSetDirections, onSetNavigating } = this.props;
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

          if (isLocationEnabled && isNavigating) {
            const timer = setInterval(this.timer, timeToUpdateLocation);
            onSetTimer(timer);
          }
        } else {
          onSetNavigating(false);
        }
      });
    }
  }

  timer() {
    const { userProp, isNavigating, isLocationEnabled, onUpdateUserLocation } = this.props;
    const user = (userProp.location) ? userProp : userProp.toJS();

    if (isLocationEnabled && isNavigating) {
      onUpdateUserLocation(user);
    }
  }

  renderActions() {
    const { userProp, place, isNavigating, onUpdateUserLocation, onSetNavigating, onReachDestination } = this.props;
    const { goBack } = browserHistory;

    const user = (userProp.location) ? userProp : userProp.toJS();
    const destination = (place.lat) ? place : place.toJS();

    let actionContent = null;

    if (isNavigating) {
      actionContent = (
        <ActionContainer>
          <Button
            btnClasses={'full'}
            name={messages.buttons.cancel.defaultMessage}
            onClickEvent={goBack}
          />
          <Button
            btnClasses={'full special reversed'}
            name={messages.buttons.reachedDestination.defaultMessage}
            onClickEvent={() => {
              onReachDestination(destination, user);
            }}
          />
        </ActionContainer>
      );
    } else if (destination.lat && destination.lng) {
      actionContent = (
        <ActionContainer>
          <Button
            btnClasses={'full'}
            name={messages.buttons.cancel.defaultMessage}
            onClickEvent={goBack}
          />
          <Button
            btnClasses={'full special reversed'}
            name={messages.buttons.navigate.defaultMessage}
            onClickEvent={() => {
              onSetNavigating(true);
              onUpdateUserLocation(user);
              this.getDirections();
            }}
          />
        </ActionContainer>
      );
    } else {
      actionContent = (
        <ActionContainer>
          <Button
            btnClasses={'full special reversed'}
            name={messages.buttons.back.defaultMessage}
            onClickEvent={goBack}
          />
        </ActionContainer>
      );
    }

    return actionContent;
  }

  render() {
    const { userProp, place, directions, venuMap } = this.props;

    const mapProps = venuMap.toJS();
    const user = (userProp.location) ? userProp : userProp.toJS();
    const destination = (place.lat) ? place : place.toJS();


    // Create user marker
    const userMarker = {
      type: 'user',
      lat: user.location.lat,
      lng: user.location.lng,
      photoURL: user.photoURL,
    };

    // Make default markers
    const markers = [userMarker];

    let cardContent = (<P>messages.emptyState.defaultMessage</P>);

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
      case 'parking':
        destination.name = `${user.name}'s Parking Spot`;
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
      name: destination.name,
      zone: destination.imagineRitArea,
      zoneClass: destination.colorZone,
    };

    if (destination.lat && destination.lng) {
      markers.push(destination);
      cardContent = (<Card place={cardInfo} cardClass={'full'} />);
    }

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
            { cardContent }
          </CardContainer>
          { this.renderActions() }
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
  isNavigating: T.bool,
  isLocationEnabled: T.bool,
  onStartOnboarding: T.func,
  onSetTimer: T.func.isRequired,
  onSetDirections: T.func.isRequired,
  onSetNavigating: T.func.isRequired,
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
  isNavigating: makeSelectIsNavigating(),
  isLocationEnabled: makeSelectIsLocationEnabled(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSetTimer: (timer) => dispatchSetTimer(dispatch, timer),
    onStartOnboarding: (stage) => dispatchSetStage(dispatch, stage),
    onUpdateUserLocation: (user) => dispatchGetUserLocation(dispatch, user),
    onSetDirections: (directions) => dispatchSetDirections(dispatch, directions),
    onSetNavigating: (navigating) => dispatchSetNavigating(dispatch, navigating),
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
