import React, { PropTypes as T } from 'react';

import ListView from './ListView';
import { Wrapper } from './styles';

export default class PlacesContainer extends React.Component {

  static propTypes = {
    places: T.array,
    facilities: T.array,
    clickOnPlaceCard: T.func,
  };

  static defaultProps = {
    title: 'Places',
  }

  render() {
    return (
      <Wrapper>
        <ListView places={this.props.places} facilities={this.props.facilities} clickOnPlaceCard={this.props.clickOnPlaceCard} />
      </Wrapper>
    );
  }
}

