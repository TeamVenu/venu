import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';
import Ionicon from 'react-ionicons';

// Import Components
import H2 from 'components/H2';
import H4 from 'components/H4';
import P from 'components/P';
import Tag from 'components/Tag';
import Button from 'components/Button';
import FlexListView from 'components/FlexListView';

// Global Selectors
import { makeSelectUser } from 'containers/App/selectors';

// Import dispatches
import {
  dispatchSetUser,
  dispatchLikePlace,
  dispatchUnlikePlace,
  dispatchChangeExhibit,
  dispatchNavigateToPlace,
  dispatchChangeCurrentPlace,
} from 'containers/App/dispatches';

// Import Local Components
import {
  DetailWrapper,
  DetailContainer,
  DetailInfoList,
  DetailInfoItem,
  PrimaryButton,
} from './styles';

export class Detail extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.renderInfo = this.renderInfo.bind(this);
    this.renderTags = this.renderTags.bind(this);
    this.renderActions = this.renderActions.bind(this);
    this.renderDetails = this.renderDetails.bind(this);
    this.renderTagComponent = this.renderTagComponent.bind(this);
    this.renderPrimaryAction = this.renderPrimaryAction.bind(this);
    this.renderActionsForPlace = this.renderActionsForPlace.bind(this);
    this.renderActionsForPlaceVisited = this.renderActionsForPlaceVisited.bind(this);
    this.renderActionsForPlaceInItinerary = this.renderActionsForPlaceInItinerary.bind(this);
  }

  renderDetails() {
    const { currentPlace } = this.props;
    const place = (typeof currentPlace === 'object') ? currentPlace : currentPlace.toJS();

    let placeSubTypeComponent;

    // Remove this at a later time
    // Make sure description is changed below
    const description = (place.description && place.description.length > 0) ? place.description : ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, quasi saepe autem voluptates praesentium perferendis magnam, laboriosam fugit ad dicta omnis eos dolore alias fuga repellendus expedita ex sequi consequuntur.';

    switch (place.subType) {
      case 'recommended':
        placeSubTypeComponent = (<P className={'small'}>Recommended For You</P>);
        break;
      case 'saved':
        placeSubTypeComponent = (<P className={'small'}>In Your Itinerary</P>);
        break;
      case 'visited':
        placeSubTypeComponent = (<P className={'small'}>You Have Been Here</P>);
        break;
      default:
        placeSubTypeComponent = null;
        break;
    }

    return (
      <div>
        { placeSubTypeComponent }
        <H2>
          { place.name }
        </H2>
        <H4>
          { 'Description' }
        </H4>
        <P>
          { description }
        </P>
      </div>
    );
  }

  renderInfo() {
    const { currentPlace } = this.props;

    const place = (typeof currentPlace === 'object') ? currentPlace : currentPlace.toJS();

    if (place.type !== 'exhibit' && place.subType !== 'restroom') return null;

    // If place is a restroom facility
    if (place.type !== 'exhibit') {
      return (
        <DetailInfoList>
          <DetailInfoItem>
            <Ionicon icon={'icon ion-location'} />
            <P className={'small'}>{place.location}, {place.building}, {place.imagineRitArea}</P>
          </DetailInfoItem>
          <DetailInfoItem>
            <Ionicon icon={'icon ion-person'} />
            <P className={'small'}>{place.category}</P>
          </DetailInfoItem>
        </DetailInfoList>
      );
    }

    // If place is an exhibit
    const locationBlurb = (isNaN(place.location) && isNaN(place.location.charAt(1))) ? place.location : place.exhibitCode;

    // Exhibit age component
    const agesComponent = (place.ageRange) ? (
      <DetailInfoItem>
        <Ionicon icon={'icon ion-ios-people'} />
        <P className={'small'}>Ages: {place.ageRange}</P>
      </DetailInfoItem>
    ) : null;

    // Exhibit hours running component
    const hoursRunningComponent = (place.hoursRunning) ? (
      <DetailInfoItem>
        <Ionicon icon={'icon ion-ios-time-outline'} />
        <P className={'small'}>Hours Running: {place.hoursRunning}</P>
      </DetailInfoItem>
    ) : null;


    // Return exhibit information
    return (
      <DetailInfoList>
        <DetailInfoItem>
          <Ionicon icon={'icon ion-location'} />
          <P className={'small'}>{locationBlurb}, {place.building}, {place.imagineRitArea}</P>
        </DetailInfoItem>
        { hoursRunningComponent }
        { agesComponent }
      </DetailInfoList>
    );
  }

  renderActions() {
    const { currentPlace } = this.props;

    const place = (typeof currentPlace === 'object') ? currentPlace : currentPlace.toJS();

    if (place.type !== 'exhibit') return null;

    let actions;
    switch (place.subType) {
      case 'visited':
        actions = this.renderActionsForPlaceVisited;
        break;
      case 'saved':
        actions = this.renderActionsForPlaceInItinerary;
        break;
      case 'recommended':
      default:
        actions = this.renderActionsForPlace;
        break;
    }

    return (
      <div>
        <H4>Actions</H4>
        { actions() }
      </div>
    );
  }

  renderActionsForPlace() {
    const {
      currentPlace,
      onDispatchLikePlace,
      onDispatchExhibitCheckIn,
      onDispatchNavigateToPlace,
    } = this.props;

    const place = (typeof currentPlace === 'object') ? currentPlace : currentPlace.toJS();

    return (
      <FlexListView>
        <li>
          <Button
            name={'Navigate'}
            icon={'ion-navigate'}
            onClickEvent={() => {
              onDispatchNavigateToPlace(place);
            }}
          />
        </li>
        <li>
          <Button
            name={'Like'}
            icon={'ion-thumbsup'}
            onClickEvent={() => { onDispatchLikePlace(place); }}
          />
        </li>
        <li>
          <Button
            name={'Check-in'}
            icon={'ion-checkmark-round'}
            onClickEvent={() => { onDispatchExhibitCheckIn(place); }}
          />
        </li>
      </FlexListView>
    );
  }

  renderActionsForPlaceVisited() {
    const {
      currentPlace,
      onDispatchExhibitCheckOut,
      onDispatchNavigateToPlace,
    } = this.props;

    const place = (typeof currentPlace === 'object') ? currentPlace : currentPlace.toJS();

    return (
      <FlexListView>
        <li>
          <Button
            name={'Navigate'}
            icon={'ion-navigate'}
            onClickEvent={() => {
              onDispatchNavigateToPlace(place);
            }}
          />
        </li>
        <li>
          <Button
            name={'Remove Check-in'}
            icon={'ion-close-round'}
            onClickEvent={() => { onDispatchExhibitCheckOut(place); }}
          />
        </li>
      </FlexListView>
    );
  }

  renderActionsForPlaceInItinerary() {
    const {
      user,
      currentPlace,
      onDispatchLikePlace,
      onDispatchUnSavePlace,
      onDispatchNavigateToPlace,
    } = this.props;

    const place = (typeof currentPlace === 'object') ? currentPlace : currentPlace.toJS();

    return (
      <FlexListView>
        <li>
          <Button
            name={'Navigate'}
            icon={'ion-navigate'}
            onClickEvent={() => {
              onDispatchNavigateToPlace(place);
            }}
          />
        </li>
        <li>
          <Button
            name={'Like'}
            icon={'ion-thumbsup'}
            onClickEvent={() => { onDispatchLikePlace(place); }}
          />
        </li>
        <li>
          <Button
            name={'Remove from Itinerary'}
            icon={'ion-close-round'}
            onClickEvent={() => { onDispatchUnSavePlace(place, user); }}
          />
        </li>
      </FlexListView>
    );
  }

  renderTagComponent() {
    const { currentPlace } = this.props;

    const place = (typeof currentPlace === 'object') ? currentPlace : currentPlace.toJS();

    // If not an exhibit return null
    if (place.type !== 'exhibit') return null;

    return (
      <div>
        <H4>Tags</H4>
        <FlexListView>
          { this.renderTags() }
        </FlexListView>
      </div>
    );
  }

  renderTags() {
    const { currentPlace } = this.props;

    const place = (typeof currentPlace === 'object') ? currentPlace : currentPlace.toJS();

    // Get the tags
    const { tags } = place;

    // If no tags return null
    if (!tags) return null;

    // Start index at negative one
    let index = -1;

    return tags.map((tag) => { // eslint-disable-line
      // If tag is empty string return null
      if (tag.length <= 0) return null;

      // Increment index
      index += 1;

      // Return tag
      return (
        <Tag key={index}>{tag}</Tag>
      );
    });
  }

  renderPrimaryAction() {
    const {
      user,
      currentPlace,
      onDispatchLikePlace,
      onDispatchExhibitCheckIn,
      onDispatchNavigateToPlace,
      onDispatchSavePlace,
    } = this.props;

    // Primary action
    let primaryAction;

    const place = (typeof currentPlace === 'object') ? currentPlace : currentPlace.toJS();

    switch (place.type) {
      case 'facility':
        primaryAction = (
          <PrimaryButton
            onClick={() => {
              onDispatchNavigateToPlace(place);
            }}
          >
            <Ionicon icon={'icon ion-navigate'} />
            Navigate
          </PrimaryButton>
        );
        break;
      case 'exhibit':
        switch (place.subType) {
          case 'default':
          case 'recommended':
            primaryAction = (
              <PrimaryButton
                onClick={() => {
                  onDispatchSavePlace(place, user);
                }}
              >
                <Ionicon icon={'icon ion-plus'} />
                Save
              </PrimaryButton>
            );
            break;
          case 'saved':
            primaryAction = (
              <PrimaryButton
                onClick={() => { onDispatchExhibitCheckIn(place); }}
              >
                <Ionicon icon={'icon ion-checkmark-round'} />
                Check-In
              </PrimaryButton>
            );
            break;
          case 'visited':
            primaryAction = (
              <PrimaryButton
                onClick={() => { onDispatchLikePlace(place); }}
              >
                <Ionicon icon={'icon ion-thumbsup'} />
                Like
              </PrimaryButton>
            );
            break;
          default:
            primaryAction = null;
            break;
        }
        break;
      default:
        primaryAction = null;
    }

    return primaryAction;
  }

  render() {
    return (
      <DetailWrapper>
        <DetailContainer>
          { this.renderDetails() }
          { this.renderInfo() }
          { this.renderActions() }
          { this.renderTagComponent() }
          { this.renderPrimaryAction() }
        </DetailContainer>
      </DetailWrapper>
    );
  }
}

Detail.propTypes = {
  user: T.object,
  currentPlace: T.object.isRequired,
  onDispatchLikePlace: T.func,
  // onDispatchUnlikePlace: T.func,
  onDispatchExhibitCheckIn: T.func,
  onDispatchExhibitCheckOut: T.func,
  onDispatchNavigateToPlace: T.func,
  onDispatchSavePlace: T.func,
  onDispatchUnSavePlace: T.func,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onDispatchNavigateToPlace: (location) => {
      dispatchNavigateToPlace(dispatch, location);
      dispatchChangeCurrentPlace(dispatch, {});
      // Redirect to main
      browserHistory.push({ pathname: '/' });
    },
    onDispatchLikePlace: (place) => {
      dispatchLikePlace(dispatch, place);
      dispatchChangeCurrentPlace(dispatch, place);
    },
    onDispatchUnlikePlace: (place) => {
      dispatchUnlikePlace(dispatch, place);
      dispatchChangeCurrentPlace(dispatch, place);
    },
    onDispatchSavePlace: (p, u) => {
      const exhibits = {
        recommended: [],
        visited: [],
        saved: [],
      };

      // Create the string to store in database
      const savedPlace = `${p.colorZone}-${p.key}`;

      // Filter out savedPlace from recommendedPlaces
      exhibits.recommended = u.exhibits.recommended.filter((places) => { // eslint-disable-line
        return places !== savedPlace;
      });

      // Filter out savedPlace from visitedPlaces
      exhibits.visited = u.exhibits.visited.filter((places) => { // eslint-disable-line
        return places !== savedPlace;
      });

      // Push saved place to savedExhibits
      exhibits.saved = u.exhibits.saved.concat(savedPlace);

      // Make a new user object
      // Make sure we don't mutate old object
      const user = Object.assign({}, u, { exhibits });

      // Make a new place object
      // Make sure we don't mutate te old object
      // To do this we user Object.assing({}, ...)
      const place = Object.assign({}, p, { subType: 'saved' });

      // Dispatch
      dispatchSetUser(dispatch, user);
      dispatchChangeExhibit(dispatch, place);
      dispatchChangeCurrentPlace(dispatch, place);
    },
    onDispatchUnSavePlace: (p, u) => {
      // Create the string to remove from database
      const placeToRemove = `${p.colorZone}-${p.key}`;

      // Filter out savedPlace from visitedPlaces
      const saved = u.exhibits.saved.filter((places) => { // eslint-disable-line
        return places !== placeToRemove;
      });

      // Make a new exhibits user object without mutating old one
      const exhibits = Object.assign({}, { recommended: u.exhibits.recommended, visited: u.exhibits.visited, saved });

      // Make a new user object
      // Make sure we don't mutate old object
      const user = Object.assign({}, u, { exhibits });

      // Make a new place object
      // Make sure we don't mutate te old object
      // To do this we user Object.assing({}, ...)
      const newSubType = (p.previousSubType !== p.subType) ? p.previousSubType : 'recommended';
      const place = Object.assign({}, p, { subType: newSubType });
      dispatchSetUser(dispatch, user);
      dispatchChangeExhibit(dispatch, place);
      dispatchChangeCurrentPlace(dispatch, place);
    },
    onDispatchExhibitCheckIn: (p) => {
      // Make a new place object
      // Make sure we don't mutate te old object
      // To do this we user Object.assing({}, ...)
      const place = Object.assign({}, p, { previousSubType: p.subType, subType: 'visited' });
      dispatchChangeExhibit(dispatch, place);
      dispatchChangeCurrentPlace(dispatch, place);
    },
    onDispatchExhibitCheckOut: (p) => {
      // Make a new place object
      // Make sure we don't mutate te old object
      // To do this we user Object.assing({}, ...)
      const place = Object.assign({}, p, { subType: p.previousSubType });
      dispatchChangeExhibit(dispatch, place);
      dispatchChangeCurrentPlace(dispatch, place);
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
