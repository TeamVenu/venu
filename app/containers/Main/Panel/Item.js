import React, { PropTypes as T } from 'react';

import FlexListView from 'components/FlexListView';
import Tag from 'components/Tag';

import P from 'components/P';

import {
  Item as ItemContainer,
  ItemLink,
  ItemTitle,
  DetailSubHeader,
} from './styles';

export default class Item extends React.Component {
  static propTypes = {
    place: T.object.isRequired,
    onClickEvent: T.func,
  }

  constructor(props) {
    super(props);

    this.state = {
      hovered: false,
    };

    this.handleCardClick = this.handleCardClick.bind(this);
  }

  handleCardClick() {
    const { place, onClickEvent } = this.props;
    onClickEvent(place);
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
        <Tag key={index}>{tag}</Tag>
      );
    });
  }

  renderCard() {
    const { place } = this.props;

    if (!place) { return null; }

    // Check if the second letter or place.location is not a number
    // If it is, use location
    // Otherwise use exhibit code
    const locationBlurb = (isNaN(place.location) && isNaN(place.location.charAt(1))) ? place.location : place.exhibitCode;

    // If a place has a distance then show that distance. Else show alternate text
    // TODO: Alt text should have an action that allows user to enable Location
    const distanceComponent = (place.distance) ? (
      <P className={'small'}>Distance: {place.distance} mi</P>
    ) : null;

    // Tags
    const tagsComponent = (place.tags && place.tags.length > 0) ? (
      <FlexListView>{this.renderTags()}</FlexListView>
    ) : null;
    return (
      <ItemContainer
        className={`${place.type} ${place.subType} ${place.colorZone}`}
        onClick={this.handleCardClick}
      >
        <ItemLink to={`/place/${place.type}/${place.id}`}>
          <ItemTitle>
            {place.name}
          </ItemTitle>
          <DetailSubHeader>
            <P className={'small'}>
              <span>
                <strong>{locationBlurb}, </strong>
              </span>
              <span>{place.building}</span>
            </P>
            {distanceComponent}
          </DetailSubHeader>
          {tagsComponent}
        </ItemLink>
      </ItemContainer>
    );
  }

  render() {
    return (
      this.renderCard()
    );
  }
}