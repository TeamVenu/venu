import React, { PropTypes as T } from 'react';
import Ionicon from 'react-ionicons';
import styled from 'styled-components';
import Google from 'media/icons/socialmedia/google.png';

const Btn = styled.button`
  padding: var(--padding);

  &.bold {
    font-weight: 700;
  }

  &.large {
    font-size: 1.5rem;
  }

  &.bordered {
    border: 3px solid currentColor;
  }

  &.rounded {
    border-radius: 2em;
  }

  &.facebook, &.google, &.anonymous {
    margin: auto;
    display: block;
    width: 95%;
    border-radius: 2em;
    border: 1px solid transparent;
  }

  &.facebook {
    background: var(--facebook-background);
    color: var(--background-color);
    border-color: var(--facebook-background);
  }

  &.google, &.anonymous {
    background: var(--white);
    color: var(--foreground-color);
    border-color: var(--foreground-color);
  }

  &.special {
    background: var(--warm-gradient);
    color: var(--background-color);
    border-color: none;

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

const Img = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin-top: -2px;
  margin-right: calc(var(--padding) / 2);
`;

export default class Button extends React.Component {
  static propTypes = {
    btnClasses: T.string,
    icon: T.string,
    name: T.string,
    type: T.string,
    image: T.string,
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
    const { name, icon, type, btnClasses, isDisabled, isIconAfter, image, onClickEvent } = this.props;

    const iconComponent = (icon) ? (
      <Ionicon className={'icon'} icon={`icon ${icon}`} />
    ) : null;

    let imageComponent;
    const clickEvent = (onClickEvent) ? this.handleClick : null;

    if (image) {
      if (image === 'google') {
        imageComponent = (<Img src={Google} alt={'Google Logo'} />);
      }
    }

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
        {imageComponent}
        <span>{name}</span>
      </Btn>
    );
  }
}
