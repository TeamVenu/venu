import React, { PropTypes as T } from 'react';
import Ionicon from 'react-ionicons';
import styled from 'styled-components';

const Btn = styled.button`
  // color: var(--background-color);
  padding: 1em;
  text-transform: uppercase;

  &.reversed {
    color: var(--background-color);
  }

  &.bordered {
    border: 3px solid currentColor;
  }

  &.cta {
    background: var(--foreground-color);
    color: var(--background-color);

    &.bordered {
      border-color: var(--foreground-color);
    }

    &.reversed {
      background: var(--foreround-color);
      color: var(--background-color);

      &.bordered {
        border-color: var(--background-color);
      }
    }
  }

  &.full {
    display: block;
    width: 100%;
  }

  &:hover {
    // background: var(--grey);
  }

  &:focus {
    outline: 0;
  }

  &:disabled {
    cursor: not-allowed;
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
    const { name, icon, type, btnClasses, isDisabled, onClickEvent } = this.props;

    const iconComponent = (icon) ? (
      <Ionicon className={'icon'} icon={`icon ${icon}`} />
    ) : null;

    const clickEvent = (onClickEvent) ? this.handleClick : null;

    return (
      <Btn type={type} className={btnClasses} onClick={clickEvent} disabled={isDisabled}>
        {iconComponent}
        {name}
      </Btn>
    );
  }
}
