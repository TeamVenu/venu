import React, { PropTypes as T } from 'react';
import ErrorIcon from 'media/icons/error.png';
import CheckIcon from 'media/icons/success.png';

import P from 'components/P';
import Icon from 'components/Icon';
import Button from 'components/Button';

import { ShadowBG, Wrapper, IconWrapper, TextWrapper } from './styles';

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

    const text = (type === 'success') ? 'Go Back' : 'Dismiss';

    const iconComponent = (type === 'success') ? (
      <Icon src={CheckIcon} alt={'Success Icon'} title={'Success'} />
    ) : (
      <Icon src={ErrorIcon} alt={'Error Icon'} title={'Failed'} />
    );

    return (
      <ShadowBG>
        <Wrapper>
          <IconWrapper>
            { iconComponent }
          </IconWrapper>
          <TextWrapper>
            <P>
              {message}
            </P>
            <Button
              btnClasses={'bold'}
              name={text}
              onClickEvent={this.handleClick}
            />
          </TextWrapper>
        </Wrapper>
      </ShadowBG>
    );
  }
}
