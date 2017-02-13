import React, { PropTypes as T, Component } from 'react';

import { PinWrapper, Pin } from './styles';

export default class Marker extends Component {
  static propTypes = {
    // change later
    name: T.string,
  }

  static defaultProps = {};

  render() {
    return (
      <PinWrapper>
        <Pin />
      </PinWrapper>
    );
  }
}
