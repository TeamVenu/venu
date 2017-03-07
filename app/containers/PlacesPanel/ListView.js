import React, { PropTypes as T } from 'react';

import Item from './Item';

import { ListView as List, Title } from './styles';

export default class ListView extends React.Component { //eslint-disable-line
  // Specify which prop Type
  static propTypes = {
    places: T.array,
    mapMode: T.string,
    clickOnPlaceCard: T.func,
  }

  renderPlaces() {
    const { places } = this.props;

    if (!places) { return null; }
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

  renderTitle() {
    const { mapMode } = this.props;
    let titleString = '';

    switch (mapMode) {
      case 'Discover':
        titleString = 'Recommended For You';
        break;
      case 'Itinerary':
        titleString = 'In Your Itinerary';
        break;
      case 'Facilities':
        titleString = 'Facilities In Your Area';
        break;
      default:
        titleString = null;
        break;
    }

    return (
      <Title>{titleString}</Title>
    );
  }

  render() {
    return (
      <List>
        {this.renderTitle()}
        {this.renderPlaces()}
      </List>
    );
  }
}

