import React, { PropTypes as T } from 'react';

import ListView from './ListView';
import { Wrapper } from './styles';

export default class PlacesContainer extends React.Component {

  static propTypes = {
    places: T.array,
    // title: T.string,
    onListItemClick: T.func,
  };

  static defaultProps = {
    title: 'Events',
    places: [
      {
        id: 0,
        name: 'James E. Booth',
      },
      {
        id: 1,
        name: 'Wallace Library',
      },
      {
        id: 2,
        name: 'Gosnell',
      },
      {
        id: 3,
        name: 'RIT',
      },
      {
        id: 4,
        name: 'James E. Booth',
      },
      {
        id: 5,
        name: 'Wallace Library',
      },
      {
        id: 6,
        name: 'Gosnell',
      },
      {
        id: 7,
        name: 'RIT',
      },
    ],
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
        <ListView places={this.props.places} />
      </Wrapper>
    );
  }
}

