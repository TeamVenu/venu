import React, { PropTypes as T } from 'react';

import Item from './Item';

import { ListView as List } from './styles';

export default class ListView extends React.Component { //eslint-disable-line
  // Specify which prop Type
  static propTypes = {
    places: T.array,
    clickOnPlaceCard: T.func,
  }

  // renderEventMarkers() {
  //   if (!this.props.places) { return null; }
  //   return this.props.places.map((place) => { //eslint-disable-line
  //     return (
  //       <Item
  //         place={place}
  //         clickOnPlaceCard={this.props.clickOnPlaceCard}
  //         key={place.id}
  //       />
  //     );
  //   });
  // }

  // renderFacilityMarker() {
  //   if (!this.props.facilities) { return null; }
  //   return this.props.facilities.map((place) => { //eslint-disable-line
  //     return (
  //       <Item
  //         place={place}
  //         clickOnPlaceCard={this.props.clickOnPlaceCard}
  //         key={place.id}
  //       />
  //     );
  //   });
  // }

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
        {this.renderPlaces()}
      </List>
    );
  }
}

