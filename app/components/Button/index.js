import React, { PropTypes as T } from 'react';
import Ionicon from 'react-ionicons';
import styled from 'styled-components';

const Btn = styled.button`
  padding: 1em;

  &.bordered {
    border: 3px solid currentColor;
  }

  &.rounded {
    border-radius: 2em;
  }

  &.special {
    background: var(--red);
    color: var(--background-color);
    border-color: var(--red);;

    &.reversed {
      background: var(--background-color);
      color: var(--red);
      border-color: var(--background-color);

      &:disabled {
        border-color: var(--light-gray);
      }
    }

    &:disabled {
      background: var(--light-gray);
    }
  }

  &.full {
    display: block;
    width: 100%;
  }

  &.fixed {
    position: fixed;
    bottom: 0;
  }

  &:disabled {
    cursor: not-allowed;
    color: var(--light-gray);
  }
`;

export default class Button extends React.Component {
  static propTypes = {
    btnClasses: T.string,
    icon: T.string,
    name: T.string,
    type: T.string,
    onClickEvent: T.func,
    isDisabled: T.bool,
    isIconAfter: T.bool,
  }

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { onClickEvent } = this.props;

    if (onClickEvent) {
      onClickEvent();
    }
  }

  render() {
    const { name, icon, type, btnClasses, isDisabled, isIconAfter, onClickEvent } = this.props;

    const iconComponent = (icon) ? (
      <Ionicon className={'icon'} icon={`icon ${icon}`} />
    ) : null;

    const clickEvent = (onClickEvent) ? this.handleClick : null;

    if (isIconAfter) {
      return (
        <Btn type={type} className={btnClasses} onClick={clickEvent} disabled={isDisabled}>
          {name}
          {iconComponent}
        </Btn>
      );
    }

    return (
      <Btn type={type} className={btnClasses} onClick={clickEvent} disabled={isDisabled}>
        {iconComponent}
        {name}
      </Btn>
    );
  }
}
