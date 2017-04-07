import React, { PropTypes as T } from 'react';

import Card from 'components/Card';

export default class Item extends React.Component {
  static propTypes = {
    place: T.object.isRequired,
    onClickEvent: T.func,
  }

  constructor(props) {
    super(props);

    this.handleCardClick = this.handleCardClick.bind(this);
  }

  handleCardClick() {
    const { place, onClickEvent } = this.props;
    onClickEvent(place);
  }

  render() {
    const { place } = this.props;

    if (!place) { return null; }

    const link = `/place/${place.type}/${place.id}`;
    // Check if the second letter or place.location is not a number
    // If it is, use location
    // Otherwise use exhibit code
    const room = (isNaN(place.location) && isNaN(place.location.charAt(1)))
      ? place.location
      : place.exhibitCode;
    const location = `${place.building}, ${room}`;
    const distance = `${place.distance} mi`;
    // If we have tags, get the first three, else return null
    const tags = (place.tags && place.tags.length > 0)
      ? place.tags.slice(0, 3)
      : null;

    const cardInfo = {
      link,
      tags,
      distance,
      location,
      name: place.name,
      zone: place.imagineRitArea,
      zoneClass: place.colorZone,
    };

    return (
      <Card
        place={cardInfo}
        onClickEvent={this.handleCardClick}
      />
    );
  }
}
