import React, { PropTypes as T } from 'react';

import List from 'components/List';
import { Bar, Title } from './styles';

export default class Sidebar extends React.Component {

  static propTypes = {
    places: T.array,
    title: T.string,
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
        name: 'Gannet',
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
      <Bar>
        <Title>{this.props.title}</Title>
        <List places={this.props.places} />
      </Bar>
    );
  }
}

