import React, { PropTypes as T } from 'react';

import Item from './Item';

import { ListView as List } from './styles';

export default class ListView extends React.Component { //eslint-disable-line
  // Specify which prop Type
  static propTypes = {
    places: T.array,
    facilities: T.array,
  }

  renderEventMarkers() {
    if (!this.props.places) { return null; }
    return this.props.places.map((place) => { //eslint-disable-line
      return (
        <Item
          place={place}
          // onClick={this.props.onClick
          key={place.id}
          type={'event'}
        />
      );
    });
  }

  renderFacilityMarker() {
    if (!this.props.facilities) { return null; }
    return this.props.facilities.map((place) => { //eslint-disable-line
      return (
        <Item
          place={place}
          // onClick={this.props.onClick}
          key={place.id}
          type={'facility'}
        />
      );
    });
  }

  render() {
    return (
      <List>
        {this.renderEventMarkers()}
        {this.renderFacilityMarker()}
      </List>
    );
  }
}

