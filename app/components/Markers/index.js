import React, { PropTypes as T, Component } from 'react';

import styled from 'styled-components';

const Pin = styled.section`
  position: absolute;
  width: 40;
  height: 40;
  left: calc(-1 * calc(40 / 2));
  top: calc(-1 * calc(40 / 2));
  border: 5px solid var(--primary-color);
  border-radius: 40;
  background: var(--light);
  text-align: center;
  color: var(--dark);
  font-weight: bold;
  padding: 4px;

  &:hover {
    background: var(--primary-color);
    color: var(--light);
  }
`;

export default class Marker extends Component {
  static propTypes = {
    // change later
    text: T.string
  }

  static defaultProps = {};

  render() {
    return (
      <Pin>
        {this.props.text}
      </Pin>
    );
  }
}