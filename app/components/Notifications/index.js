import React, { PropTypes as T } from 'react';
import Ionicon from 'react-ionicons';

import P from 'components/P';
import Button from 'components/Button';

import { Wrapper, IconWrapper } from './styles';
export default class Notification extends React.Component {
  static propTypes = {
    type: T.string.isRequired,
    message: T.string,
    onClickEvent: T.func,
  };

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { onClickEvent } = this.props;
    onClickEvent();
  }

  render() {
    const { message, type } = this.props;

    if (!message) return null;

    let icon = '';

    switch (type) {
      case 'error':
        icon = 'ion-close-round';
        break;
      case 'warning':
        icon = 'ion-alert';
        break;
      case 'success':
        icon = 'ion-checkmark-round';
        break;
      default:
        icon = '';
        break;
    }
    return (
      <Wrapper className={type}>
        <IconWrapper>
          <Ionicon icon={icon} />
        </IconWrapper>
        <P>
          {message}
        </P>
        <Button
          btnClasses={'bold'}
          name={'Dismiss'}
          onClickEvent={this.handleClick}
        />
      </Wrapper>
    );
  }
}
