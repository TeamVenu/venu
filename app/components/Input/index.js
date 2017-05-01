import React, { PropTypes as T } from 'react';
import styled from 'styled-components';

const HiddenInput = styled.input`
  display: none;
  &:checked + label {
    background: var(--background-color);
    color: var(--primary-accent-color);
    border-color: var(--background-color);
  }
`;

const Label = styled.label`
  position: relative;
  display: ${(props) => (props.full) ? 'block' : 'inherit'};
  padding: calc(var(--padding) - 7px) calc(var(--padding) * 2);
  color: var(--background-color);
  border: 2px solid currentColor;
  border-radius: 2em;
  text-align: center;
  white-space: nowrap;
`;

export default class Input extends React.Component {
  static propTypes = {
    id: T.string.isRequired,
    name: T.string.isRequired,
    value: T.any.isRequired,
    text: T.string.isRequired,
    type: T.string.isRequired,
    full: T.bool,
    isRequired: T.bool,
    onChangeEvent: T.func,
    isSelected: T.bool,
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
    const { name, id, text, value, type, full, isSelected, isRequired } = this.props;

    return (
      <span>
        <HiddenInput
          id={id}
          type={type}
          name={name}
          value={value}
          required={isRequired}
          checked={isSelected}
          onChange={this.handleOnChange}
        />
        <Label
          full={full}
          id={`${id}Label`}
          htmlFor={id}
        >
          {text}
        </Label>
      </span>
    );
  }
}
