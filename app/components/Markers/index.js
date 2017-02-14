import React, { PropTypes as T, Component } from 'react';

import { PinWrapper, Pin } from './styles';

export default class Marker extends Component {
  static propTypes = {
    // change later
    type: T.string,
  }

  static defaultProps = {};

  renderPin() {
    const { type } = this.props;
    if (type === 'event') {
      return (<Pin event />);
    }
    return (<Pin />);
  }

  render() {
    return (
      <PinWrapper>
        { this.renderPin() }
      </PinWrapper>
    );
  }


}
