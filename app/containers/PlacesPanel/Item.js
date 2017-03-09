import React, { PropTypes as T } from 'react';

import { Item as ItemContainer, ItemTitle, DetailSubHeader, DetailInfo, FlexListView, TagListItem } from './styles';

export default class Item extends React.Component {
  static propTypes = {
    place: T.object.isRequired,
    clickOnPlaceCard: T.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      hovered: false,
    };

    this.handleCardClick = this.handleCardClick.bind(this);
  }

  handleCardClick() {
    const { place } = this.props;
    this.props.clickOnPlaceCard(place);
  }

  renderTags() {
    // Get the tags of a place
    const { tags } = this.props.place;

    // Set a max number of tags to show
    const MAX_TAGS = 3;

    // If no tags return null
    if (!tags) return null;

    // Start index at negative one
    let index = -1;

    return tags.map((tag) => { // eslint-disable-line
      // If tag is empty string return null
      if (tag.length <= 0) return null;

      // Increment index
      index += 1;

      if (index >= MAX_TAGS) {
        return null;
      }

      // Return tag
      return (
        <TagListItem key={index}>{tag}</TagListItem>
      );
    });
  }

  renderCard() {
    const { place } = this.props;

    if (!place) { return null; }

    const placeClass = place.type + ' ' + place.subType + ' ' + place.colorZone; //eslint-disable-line

    // Check if the second letter or place.location is not a number
    // If it is, use location
    // Otherwise use exhibit code
    const locationBlurb = (isNaN(place.location) && isNaN(place.location.charAt(1))) ? place.location : place.exhibitCode;

    // If a place has a distance then show that distance. Else show alternate text
    // TODO: Alt text should have an action that allows user to enable Location
    const distanceComponent = (place.distance) ? (
      <DetailInfo>Distance: {place.distance} mi</DetailInfo>
    ) : null;

    // Tags
    const tagsComponent = (place.tags && place.tags.length > 0) ? (
      <FlexListView>{this.renderTags()}</FlexListView>
    ) : null;

    return (
      <ItemContainer className={`${place.type} ${place.subType} ${place.colorZone}`} onClick={this.handleCardClick}>
        <ItemTitle>{place.name}</ItemTitle>
        <DetailSubHeader>
          <DetailInfo>
            <span><strong>{locationBlurb}, </strong></span>
            <span>{place.building}</span>
          </DetailInfo>
          {distanceComponent}
        </DetailSubHeader>
        {tagsComponent}
      </ItemContainer>
    );
  }

  render() {
    return (
      this.renderCard()
    );
  }
}
