import React, { PropTypes as T } from 'react';
import styled from 'styled-components';

const Btn = styled.button`
  color: var(--background-color);
  padding: 1em;

  &:hover {
    // background: var(--grey);
  }

  &:focus {
    outline: 0;
  }
`;

export default class Button extends React.Component { //eslint-disable-line
  static propTypes = {
    onClickEvent: T.func,
    name: T.string,
    icon: T.string,
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

  renderButton() {
    const { name } = this.props;
    const { icon } = this.props;
    const { onClickEvent } = this.props;

    const iconComponent = (icon) ? (
      <i className={`icon ${icon}`}></i>
    ) : null;

    const clickEvent = (onClickEvent) ? this.handleClick : null;

    return (
      <Btn onClick={clickEvent}>
        {iconComponent}
        {name}
      </Btn>
    );
  }

  render() {
    return (
      <div>
        {this.renderButton()}
      </div>
    );
  }
}
