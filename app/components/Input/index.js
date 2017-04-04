import React, { PropTypes as T } from 'react';
import styled from 'styled-components';

const HiddenInput = styled.input`
  display: none;
  &:checked + label {
    background: var(--background-color);
    color: var(--foreground-color);
  }
`;

const Label = styled.label`
  position: relative;
  padding: var(--padding) calc(var(--padding) * 2);
  background: var(--dark);
  border-radius: 2em;
  min-width: 60px;
`;

export default class Input extends React.Component {
  static propTypes = {
    id: T.string.isRequired,
    name: T.string.isRequired,
    value: T.any.isRequired,
    text: T.string.isRequired,
    type: T.string.isRequired,
    isRequired: T.bool,
    onChangeEvent: T.func,
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
    const { name, id, text, value, type, isRequired } = this.props;

    return (
      <span>
        <HiddenInput
          id={id}
          type={type}
          name={name}
          value={value}
          required={isRequired}
          onChange={this.handleOnChange}
        />
        <Label
          id={`${id}Label`}
          htmlFor={id}
        >
          {text}
        </Label>
      </span>
    );
  }
}
