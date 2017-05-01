import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';

// Import Components
import P from 'components/P';
import Tag from 'components/Tag';
import Card from 'components/Card';
import Button from 'components/Button';

// Global Selectors
import { makeSelectUser } from 'containers/App/selectors';

// Import dispatches
import {
  dispatchSetUser,
  dispatchChangeExhibit,
  dispatchNavigateToPlace,
  dispatchChangeCurrentPlace,
} from 'containers/App/dispatches';

// Import Local Components
import {
  Subtitle as H4,
  DetailWrapper,
  DetailContainer,
  DetailInfoWrapper,
  DetailInfoList,
  TagsContainer,
  DetailInfoItem,
  ButtonRow,
  ButtonItem,
} from './styles';

export class Detail extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.renderInfo = this.renderInfo.bind(this);
    this.renderTags = this.renderTags.bind(this);
    this.renderActions = this.renderActions.bind(this);
    this.renderDetails = this.renderDetails.bind(this);
    this.renderTagComponent = this.renderTagComponent.bind(this);
  }

  renderDetails() {
    const { currentPlace } = this.props;
    const exhibitorsComponent = (currentPlace.exhibitors) ? (
      <section>
        <H4>{ 'Exhibitors' }</H4>
        <P className={'small'}>{ currentPlace.exhibitors }</P>
      </section>
    ) : null;

    return (
      <section>
        <H4>{ 'Description' }</H4>
        <P className={'small'}>{ currentPlace.description }</P>
        { exhibitorsComponent }
      </section>
    );
  }

  renderInfo() {
    const { currentPlace } = this.props;

    const place = (typeof currentPlace === 'object') ? currentPlace : currentPlace.toJS();

    if (place.type !== 'exhibit' && place.subType !== 'entertainment') return null;

    // Exhibit age component
    const agesComponent = (place.ageRange) ? (
      <DetailInfoItem>
        <H4>Ages</H4>
        <P className={'small'}>{place.ageRange}</P>
      </DetailInfoItem>
    ) : null;

    // Exhibit hours running component
    const hoursRunningComponent = (place.hoursRunning) ? (
      <DetailInfoItem>
        <H4>Hours Running</H4>
        <P className={'small'}>{place.hoursRunning}</P>
      </DetailInfoItem>
    ) : null;


    // Return exhibit information
    return (
      <DetailInfoList>
        { hoursRunningComponent }
        { agesComponent }
      </DetailInfoList>
    );
  }

  renderActions() {
    const {
      userProps,
      currentPlace,
      onSavePlace,
      onUnsavePlace,
      onPlaceCheckIn,
      onPlaceCheckOut,
      onNavigateToPlace,
    } = this.props;

    const user = (userProps.exhibits) ? userProps : userProps.toJS();
    const isExhibit = (currentPlace.type === 'exhibit');

    // Save Button
    let saveBtn = null;

    // Visited Button
    let visitedBtn = null;

    // Navigate Button
    const navigateBtn = (
      <Button
        btnClasses={'action'}
        icon={'ion-navigate'}
        name={'Go'}
        onClickEvent={() => {
          onNavigateToPlace(currentPlace);
        }}
      />
    );

    if (isExhibit) {
      switch (currentPlace.subType) {
        case 'saved':
          saveBtn = (
            <Button
              btnClasses={'action cta-subdued'}
              icon={'ion-minus'}
              name={'Unsave'}
              onClickEvent={() => {
                onUnsavePlace(currentPlace, user);
              }}
            />
          );

          visitedBtn = (
            <Button
              btnClasses={'action'}
              icon={'ion-checkmark-round'}
              name={'Check in'}
              onClickEvent={() => {
                onPlaceCheckIn(currentPlace, user);
              }}
            />
          );
          break;
        case 'visited':
          visitedBtn = (
            <Button
              btnClasses={'action'}
              icon={'ion-checkmark-round'}
              name={'Visited'}
              onClickEvent={() => {
                onPlaceCheckOut(currentPlace, user);
              }}
            />
          );
          break;
        default:
          saveBtn = (
            <Button
              btnClasses={'action cta'}
              icon={'ion-plus'}
              name={'Save'}
              onClickEvent={() => {
                onSavePlace(currentPlace, user);
              }}
            />
          );

          visitedBtn = (
            <Button
              btnClasses={'action'}
              icon={'ion-checkmark-round'}
              name={'Check in'}
              onClickEvent={() => {
                onPlaceCheckIn(currentPlace, user);
              }}
            />
          );
          break;
      }
    }

    return (
      <ButtonRow>
        <ButtonItem>{ navigateBtn }</ButtonItem>
        <ButtonItem>{ visitedBtn }</ButtonItem>
        <ButtonItem>{ saveBtn }</ButtonItem>
      </ButtonRow>
    );
  }

  renderTagComponent() {
    const { currentPlace } = this.props;

    const place = (typeof currentPlace === 'object') ? currentPlace : currentPlace.toJS();

    // If not an exhibit return null
    if (place.type !== 'exhibit') return null;

    return (
      <div>
        <H4>Tagged as</H4>
        <TagsContainer>
          { this.renderTags() }
        </TagsContainer>
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

  render() {
    const { currentPlace } = this.props;

    // Check if the second letter or place.location is not a number
    // If it is, use location
    // Otherwise use exhibit code
    const room = (isNaN(currentPlace.location) && isNaN(currentPlace.location.charAt(1)))
      ? currentPlace.location
      : currentPlace.exhibitCode;
    const location = `${currentPlace.building}, ${room}`;

    const place = {
      location,
      link: null,
      place: currentPlace,
      name: currentPlace.name,
      zone: currentPlace.imagineRitArea,
      zoneClass: currentPlace.colorZone,
    };

    // For subType description
    let subTypeComponent = null;

    switch (currentPlace.subType) {
      case 'recommended':
        subTypeComponent = (<P className={'small'}>Recommended For You</P>);
        break;
      case 'saved':
        subTypeComponent = (<P className={'small'}>In Your Itinerary</P>);
        break;
      case 'visited':
        subTypeComponent = (<P className={'small'}>You have been here!</P>);
        break;
      default:
        break;
    }

    return (
      <DetailWrapper>
        <DetailContainer>
          { subTypeComponent }
          <Card place={place} />
          { this.renderActions() }
          <DetailInfoWrapper>
            { this.renderTagComponent() }
            { this.renderInfo() }
            { this.renderDetails() }
          </DetailInfoWrapper>
        </DetailContainer>
      </DetailWrapper>
    );
  }
}

Detail.propTypes = {
  userProps: T.object,
  onSavePlace: T.func.isRequired,
  onUnsavePlace: T.func.isRequired,
  currentPlace: T.object.isRequired,
  onPlaceCheckIn: T.func.isRequired,
  onPlaceCheckOut: T.func.isRequired,
  onNavigateToPlace: T.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userProps: makeSelectUser(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSavePlace: (p, u) => {
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
      const place = Object.assign({}, p, { previousSubType: p.subType, subType: 'saved' });

      // Dispatch
      dispatchSetUser(dispatch, user);
      dispatchChangeExhibit(dispatch, place);
      dispatchChangeCurrentPlace(dispatch, place);
    },
    onUnsavePlace: (p, u) => {
      // Create the string to remove from database
      const placeToRemove = `${p.colorZone}-${p.key}`;

      // Filter out placeToRemove from saved places
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
      const place = Object.assign({}, p, { previousSubType: p.subType, subType: newSubType });
      dispatchSetUser(dispatch, user);
      dispatchChangeExhibit(dispatch, place);
      dispatchChangeCurrentPlace(dispatch, place);
    },
    onPlaceCheckIn: (p, u) => {
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
      dispatchChangeCurrentPlace(dispatch, place);
    },
    onPlaceCheckOut: (p, u) => {
      // Create the string to remove from database
      const placeToRemove = `${p.colorZone}-${p.key}`;

      // Filter out placeToRemove from visited
      const visited = u.exhibits.visited.filter((places) => { // eslint-disable-line
        return places !== placeToRemove;
      });

      // Make a new exhibits user object without mutating old one
      const exhibits = Object.assign({}, { recommended: u.exhibits.recommended, saved: u.exhibits.saved, visited });

      // Make a new user object
      // Make sure we don't mutate old object
      const user = Object.assign({}, u, { exhibits });
      // Make a new place object
      // Make sure we don't mutate te old object
      // To do this we user Object.assing({}, ...)
      const place = Object.assign({}, p, { previousSubType: 'recommended', subType: p.previousSubType });
      dispatchSetUser(dispatch, user);
      dispatchChangeExhibit(dispatch, place);
      dispatchChangeCurrentPlace(dispatch, place);
    },
    onNavigateToPlace: (place) => {
      dispatchChangeCurrentPlace(dispatch, {});
      // Set place to navigate to
      dispatchNavigateToPlace(dispatch, place);
      // Redirect to Directions
      browserHistory.push({ pathname: '/directions' });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
