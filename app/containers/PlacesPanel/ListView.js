import React, { PropTypes as T } from 'react';

import Item from './Item';

import { ListView as List, Title } from './styles';

export default class ListView extends React.Component { //eslint-disable-line
  // Specify which prop Type
  static propTypes = {
    places: T.array,
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

  render() {
    return (
      <List>
        <Title>Recommended For You</Title>
        {this.renderPlaces()}
      </List>
    );
  }
}

