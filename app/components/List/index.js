import React, { PropTypes as T } from 'react';

import Item from './Item';

import { ListView } from './styles';

export default class List extends React.Component { //eslint-disable-line
  static propTypes = {
    places: T.array,
  }

  render() {
    return (
      <ListView>
        {this.props.places.map((place) => { //eslint-disable-line
          return (
            <Item
              place={place}
              // onClick={this.props.onClick}
              key={place.id}
            />
          );
        })}
      </ListView>
    );
  }
}

