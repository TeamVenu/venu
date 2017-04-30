import React from 'react';
import Img from 'components/Icon';
import Pin from 'media/icons/pins/orangepin.png';

export default class Logo extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Img padding alt={'VENU Logo'} title={'logo'} src={Pin} />
    );
  }
}
