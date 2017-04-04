import React from 'react';

import {
  LogoWrapper,
  LogoOuterWhite,
  LogoGradientOpaque,
  LogoInnerGradient,
} from './styles';

export default class Logo extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <LogoWrapper>
        <LogoOuterWhite>
          <LogoGradientOpaque>
            <LogoInnerGradient />
          </LogoGradientOpaque>
        </LogoOuterWhite>
      </LogoWrapper>
    );
  }
}
