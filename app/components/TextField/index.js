import React, { PropTypes as T } from 'react';
import Ionicon from 'react-ionicons';
import styled from 'styled-components';

const Input = styled.input`
  display: block;
  width: 100%;
  padding: var(--padding);
  background: var(--foreground-color);
  color: var(--background-color);
  border: 3px solid var(--foreground-color);

  &:focus {
    outline: 0;
  }

  &.valid {
    border-color: var(--success-color-accent);
  }

  &.invalid {
    border-color: var(--error-color-accent);
  }

`;

export default class TextField extends React.Component {
  static propTypes = {
    id: T.string,
    isDisabled: T.bool,
    isRequired: T.bool,
    isValid: T.bool,
    name: T.string,
    onChangeEvent: T.func,
    placeholderText: T.string,
    title: T.string,
    type: T.string,
  };

  constructor(props) {
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(e) {
    const { onChangeEvent } = this.props;

    if (onChangeEvent) {
      onChangeEvent(e);
    }
  }

  render() {
    const { 
      id,
      isDisabled,
      isRequired,
      name,
      placeholderText,
      type,
      value,
    } = this.props;

    return (
      <Input
        id={id}
        name={name}
        placeholder={placeholderText}
        type={type}
        value={value}
        required={isRequired}
        disabled={isDisabled}
        onChange={this.handleOnChange}
      />
    );
  }
}