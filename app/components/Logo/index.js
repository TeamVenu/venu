import React from 'react';
import styled from 'styled-components';
import Icon from 'media/icons/pins/orangepin.png';

const Img = styled.img`
  background: var(--background-color);
  display: block;
  margin: 0 auto;
  padding: var(--padding);
  border-radius: 100%;
  width: 64px;
  height: 64px;
`;

export default class Logo extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Img alt={'VENU Logo'} title={'logo'} src={Icon} />
    );
  }
}
