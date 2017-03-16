import React, { PropTypes as T } from 'react';
import styled from 'styled-components';
import Ionicon from 'react-ionicons';

const Input = styled.input`
  display: none;

  &:checked + label {
    color: var(--blue);

    .icon {
      display: inline;
    }
  }
`;

const Label = styled.label`
  position: relative;
  display: block;
  padding: var(--padding);

  .icon {
    position: absolute;
    right: 0;
    display: none;
  }
`;

export default class Radio extends React.Component {
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
      <div>
        <Input
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
          <Ionicon icon={'icon ion-checkmark-round'} />
        </Label>
      </div>
    );
  }
}
