import React, { PropTypes as T } from 'react';
import { getExhibitsArray,
  getFacilitiesArray,
  filterExhibitsBy,
} from 'utils/helpers';

import Item from './Item';

import { ListView as List } from './styles';

export default class ListView extends React.Component { //eslint-disable-line
  // Specify which prop Type
  static propTypes = {
    exhibits: T.object.isRequired,
    facilities: T.object.isRequired,
    mapMode: T.string.isRequired,
    clickOnPlaceCard: T.func,
  }

  renderPlaces() {
    // Get the props
    const { exhibits, facilities, mapMode } = this.props;

    if (!exhibits || !facilities || !mapMode) { return null; }

    // Initialize places
    let places;

    // For Itinerary
    const property = 'subType'; // Filter with subType
    const value = 'bookmarked'; // Value bookmarked

    // Verify mapMode
    switch (mapMode) {
      // If mode is Itinerary
      case 'Itinerary':
        // We want to just show bookmarked places
        places = filterExhibitsBy(exhibits, property, value);
        break;
      // If mode is Facilities
      case 'Facilities':
        // We want to just show facilities
        places = getFacilitiesArray(facilities);
        break;
      // Otherwise mode is Discover
      default:
        // We want to show all exhibits
        places = getExhibitsArray(exhibits, facilities);
        break;
    }

    return places.map((place) => { //eslint-disable-line
      return (
        <Item
          key={place.id}
          place={place}
          clickOnPlaceCard={this.props.clickOnPlaceCard}
        />
      );
    });
  }

  render() {
    return (
      <List>
        {this.renderPlaces()}
      </List>
    );
  }
}

