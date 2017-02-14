import React, { PropTypes as T } from 'react';

import ListView from './ListView';
import { Wrapper } from './styles';

export default class PlacesContainer extends React.Component {

  static propTypes = {
    places: T.array,
    facilities: T.array,
    onListItemClick: T.func,
  };

  static defaultProps = {
    title: 'Places',
  }

  onClick(place, map, google) {
    if (this.props.onListItemClick) {
      place.place = place; //eslint-disable-line
      this.props.onListItemClick(place, map, google);
    }
  }

  render() {
    return (
      <Wrapper>
        <ListView places={this.props.places} facilities={this.props.facilities} />
      </Wrapper>
    );
  }
}

