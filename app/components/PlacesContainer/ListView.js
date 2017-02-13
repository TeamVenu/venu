import React, { PropTypes as T } from 'react';

import Item from './Item';

import { ListView as List } from './styles';

export default class ListView extends React.Component { //eslint-disable-line
  // Specify which prop Type
  static propTypes = {
    places: T.array,
  }

  render() {
    return (
      <List>
        {this.props.places.map((place) => { //eslint-disable-line
          return (
            <Item
              place={place}
              // onClick={this.props.onClick}
              key={place.id}
            />
          );
        })}
      </List>
    );
  }
}

