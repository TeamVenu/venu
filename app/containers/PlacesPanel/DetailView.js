import React, { PropTypes as T } from 'react';
import Ionicon from 'react-ionicons';
import Button from 'components/Button';
import {
  DetailWrapper, DetailHeader, DetailSubHeader,
  DetailExitButton, DetailTitle, DetailSectionTitle,
  DetailInfo, FlexListView, TagListItem, DetailCTAButton,
} from './styles';

export default class DetailView extends React.Component { // eslint-disable-line
  static propTypes = {
    place: T.object.isRequired,
    clearPlaceInfo: T.func.isRequired,
    navigateToPlace: T.func.isRequired,
    likeExhibit: T.func,
    unLikeExhibit: T.func,
    setExhibitToDefault: T.func.isRequired,
    setExhibitToRecommended: T.func.isRequired,
    setExhibitToBookmarked: T.func.isRequired,
    setExhibitToVisited: T.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.renderPlaceDetail = this.renderPlaceDetail.bind(this);
    this.navigateToPlace = this.navigateToPlace.bind(this);
    this.likeExhibit = this.likeExhibit.bind(this);
    this.unLikeExhibit = this.unLikeExhibit.bind(this);
    this.setExhibitToDefault = this.setExhibitToDefault.bind(this);
    this.setExhibitToRecommended = this.setExhibitToRecommended.bind(this);
    this.setExhibitToBookmarked = this.setExhibitToBookmarked.bind(this);
    this.setExhibitToVisited = this.setExhibitToVisited.bind(this);
  }

  setExhibitToDefault() {
    const { place, setExhibitToDefault } = this.props;
    setExhibitToDefault(place);
  }

  setExhibitToRecommended() {
    const { place, setExhibitToRecommended } = this.props;
    setExhibitToRecommended(place);
  }

  setExhibitToBookmarked() {
    const { place, setExhibitToBookmarked } = this.props;
    setExhibitToBookmarked(place);
  }

  setExhibitToVisited() {
    const { place, setExhibitToVisited } = this.props;
    setExhibitToVisited(place);
  }

  likeExhibit() {
    const { place, likeExhibit } = this.props;
    likeExhibit(place);
  }

  unLikeExhibit() {
    const { place, unLikeExhibit } = this.props;
    unLikeExhibit(place);
  }

  navigateToPlace() {
    const { place, navigateToPlace } = this.props;
    navigateToPlace(place);
  }

  handleClick() {
    const { clearPlaceInfo } = this.props;
    if (!clearPlaceInfo) return;

    clearPlaceInfo();
  }

  renderSecondaryButtons(Actions) {
    let index = -1;
    let btn = null;

    const NavigateButtonSecondary = (<Button name={'Navigate'} icon={'ion-navigate'} onClickEvent={this.navigateToPlace} />);
    const CheckInButtonSecondary = (<Button name={'Check-in'} icon={'ion-checkmark-round'} onClickEvent={this.setExhibitToVisited} />);
    // const AddToItineraryButtonSecondary = (<Button name={'Add to Itinerary'} icon={'ion-plus'} onClickEvent={this.addExhibitToItinerary} />);
    const LikeExhibitButtonSecondary = (<Button name={'Like'} icon={'ion-thumbsup'} onClickEvent={this.likeExhibit} />);
    const RemoveLikeExhibitButtonSecondary = (<Button name={'Remove Like'} icon={'ion-thumbsdown'} onClickEvent={this.unLikeExhibit} />);
    const RemoveFromItinerarySecondary = (<Button name={'Remove from Itinerary'} icon={'ion-calendar'} onClickEvent={this.setExhibitToDefault} />);
    const RemoveCheckInButtonSecondary = (<Button name={'Remove Check-In'} icon={'ion-close-round'} onClickEvent={this.setExhibitToDefault} />);

    return Actions.map((action) => { // eslint-disable-line
      switch (action) {
        case 'navigate':
          btn = NavigateButtonSecondary;
          break;
        case 'check-in':
          btn = CheckInButtonSecondary;
          break;
        case 'like-exhibit':
          btn = LikeExhibitButtonSecondary;
          break;
        case 'remove-itinerary':
          btn = RemoveFromItinerarySecondary;
          break;
        case 'remove-check-in':
          btn = RemoveCheckInButtonSecondary;
          break;
        case 'remove-like':
          btn = RemoveLikeExhibitButtonSecondary;
          break;
        default:
          btn = null;
          break;
      }

      // Increment index
      index += 1;

      // Return Button
      return (
        <li key={index}>
          {btn}
        </li>
      );
    });
  }

  renderTags() {
    // Get the tags of a place
    const { tags } = this.props.place;

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
        <TagListItem key={index}>{tag}</TagListItem>
      );
    });
  }

  renderPlaceDetail() {
    const { place } = this.props;

    if (!place) return null;

    // Check if the second letter or place.location is not a number
    // If it is, use location
    // Otherwise use exhibit code
    const locationBlurb = (isNaN(place.location) && isNaN(place.location.charAt(1))) ? place.location : place.exhibitCode;

    // Subtype Blurb
    // Tells us whether place is in Itinerary or Recommended
    // Placeholder these are some of the options for Primary Button
    const NavigateButtonPrimary = (<DetailCTAButton onClick={this.navigateToPlace}><Ionicon icon={'icon ion-navigate'} /> Navitage</DetailCTAButton>);
    const CheckInButtonPrimary = (<DetailCTAButton onClick={this.setExhibitToVisited}><Ionicon icon={'icon ion-checkmark-round'} /> Check-in</DetailCTAButton>);
    const AddToItineraryButtonPrimary = (<DetailCTAButton onClick={this.setExhibitToBookmarked}><Ionicon icon={'icon ion-plus'} /> Add to Itinerary</DetailCTAButton>);
    const LikeExhibitButtonPrimary = (<DetailCTAButton onClick={this.likeExhibit}><Ionicon icon={'icon ion-thumbsup'} /> Like</DetailCTAButton>);

    let subTypeBlurb = null;
    let PrimaryButton = null;
    const SecondaryButtons = [];

    switch (place.subType) {
      case 'default':
        PrimaryButton = AddToItineraryButtonPrimary;
        SecondaryButtons.push('navigate');
        SecondaryButtons.push('check-in');
        SecondaryButtons.push('like-exhibit');
        break;
      case 'recommended':
        subTypeBlurb = 'Recommended For You';
        PrimaryButton = AddToItineraryButtonPrimary;
        SecondaryButtons.push('navigate');
        SecondaryButtons.push('check-in');
        SecondaryButtons.push('like-exhibit');
        break;
      case 'bookmarked':
        subTypeBlurb = 'In Your Itinerary';
        PrimaryButton = CheckInButtonPrimary;
        SecondaryButtons.push('navigate');
        SecondaryButtons.push('like-exhibit');
        SecondaryButtons.push('remove-itinerary');
        break;
      case 'visited':
        subTypeBlurb = 'You\'ve Already Been Here';
        PrimaryButton = LikeExhibitButtonPrimary;
        SecondaryButtons.push('remove-check-in');
        break;
      case 'restroom':
        PrimaryButton = NavigateButtonPrimary;
        break;
      default:
        PrimaryButton = (place.lat && place.lng) ? NavigateButtonPrimary : null;
        break;
    }

    // If the place was a color zone, add that color zone as a class
    const wrapperClasses = (place.colorZone) ? place.colorZone : null;

    // If a place has a distance then show that distance. Else show alternate text
    // TODO: Alt text should have an action that allows user to enable Location
    const distanceComponent = (place.distance > '0') ? (
      <DetailInfo><Ionicon icon={'icon ion-map'} /> Distance: {place.distance}km</DetailInfo>
    ) : (
      <DetailInfo><Ionicon icon={'icon ion-map'} /> <strong>Distance unknown</strong>. Please enable your location.</DetailInfo>
    );

    // If place has hours running then we add the Item
    const hoursRunningComponent = (place.hoursRunning) ? (
      <DetailInfo><Ionicon icon={'icon ion-ios-time-outline'} /> {place.hoursRunning} </DetailInfo>
    ) : null;

    // If the place has an ageRange display it
    const agesComponent = (place.ageRange) ? (
      <DetailInfo><Ionicon icon={'icon ion-ios-people'} /> Ages: {place.ageRange}</DetailInfo>
    ) : null;

    const genderComponent = (place.subType === 'restroom') ? (
      <DetailInfo><Ionicon icon={'icon ion-person'} /> {place.category}</DetailInfo>
    ) : null;

    // Tags
    const tagsComponent = (place.tags && place.tags.length > 0) ? (
      <div>
        <DetailSectionTitle>Tags</DetailSectionTitle>
        <FlexListView>{this.renderTags()}</FlexListView>
      </div>
    ) : null;

    const SecondaryButtonsComponent = (SecondaryButtons.length > 0) ? (
      <div>
        <DetailSectionTitle>Actions</DetailSectionTitle>
        <FlexListView>
          {this.renderSecondaryButtons(SecondaryButtons)}
        </FlexListView>
      </div>
    ) : null;

    // TODO:
    // This is a placeholder until we get more text. Should not be in final version
    const descriptionComponent = (place.description.length > 0) ? (
      <div>
        <DetailSectionTitle>Description</DetailSectionTitle>
        <p>{place.description}</p>
      </div>
    ) : (
      <div>
        <DetailSectionTitle>Description</DetailSectionTitle>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Dolores, repellendus, suscipit! Rem velit dolorem
          molestias exercitationem numquam iure aperiam praesentium
          non repudiandae labore minima beatae quam ipsum vero, quia, et!
        </p>
      </div>
    );

    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Return components
    return (
      <DetailWrapper className={wrapperClasses}>
        <DetailHeader>
          <DetailInfo>
            <Ionicon icon={'icon ion-location'} />
            <span><strong>{locationBlurb}, </strong></span>
            <span>{place.building}, </span>
            <span>{place.imagineRitArea}</span>
          </DetailInfo>
          <DetailExitButton className="icon ion-close" onClick={this.handleClick}></DetailExitButton>
        </DetailHeader>
        <DetailSubHeader>
          {distanceComponent}
          {agesComponent}
          {genderComponent}
          {hoursRunningComponent}
        </DetailSubHeader>
        <DetailInfo>{subTypeBlurb}</DetailInfo>
        <DetailTitle>{place.name}</DetailTitle>
        {descriptionComponent}
        {SecondaryButtonsComponent}
        {tagsComponent}
        {PrimaryButton}
      </DetailWrapper>
    );
  }

  render() {
    // Get our place from the props
    const { place } = this.props;

    // If no place return null
    if (!place) return null;

    return (
      <div>
        {this.renderPlaceDetail()}
      </div>
    );
  }
}
