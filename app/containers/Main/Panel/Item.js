import React, { PropTypes as T } from 'react';

import Card from 'components/Card';

export default class Item extends React.Component {
  static propTypes = {
    place: T.object.isRequired,
  }

  render() {
    const { place } = this.props;

    if (!place) { return null; }

    // Link should be /place/type/zone/key
    let link = '';

    switch (place.type) {
      case 'exhibit':
        link = `/${place.type}/${place.colorZone}/${place.exhibitCode}/${place.key}`;
        break;
      case 'facilities':
        link = `/${place.type}/${place.colorZone}/${place.subType}/${place.key}`;
        break;
      default:
        link = null;
        break;
    }

    // Check if the second letter or place.location is not a number
    // If it is, use location
    // Otherwise use exhibit code
    const room = (isNaN(place.location) && isNaN(place.location.charAt(1)))
      ? place.location
      : place.exhibitCode;
    const location = `${place.building}, ${room}`;

    const cardInfo = {
      link,
      place,
      location,
      name: place.name,
      zone: place.imagineRitArea,
      zoneClass: place.colorZone,
    };

    return (
      <Card
        place={cardInfo}
      />
    );
  }
}
