import React, { PropTypes as T } from 'react';
import Ionicon from 'react-ionicons';

import {
  Wrapper,
  List,
  Item,
  Label,
  Input,
} from './styles';

export default class TextField extends React.Component {
  static propTypes = {
    id: T.string,
    inputClasses: T.string,
    isDisabled: T.bool,
    isRequired: T.bool,
    name: T.string,
    onChangeEvent: T.func,
    placeholderText: T.string,
    title: T.string,
    isValid: T.bool,
    type: T.string,
    labelText: T.string,
    requirements: T.array,
    value: T.string,
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

  renderRequirements() {
    const { requirements } = this.props;

    if (!requirements || requirements.length === 0) return null;

    return requirements.map((requirement) => { // eslint-disable-line
      return (
        <Item key={requirement.id}>
          {requirement.msg}
        </Item>
      );
    });
  }

  render() {
    const {
      id,
      inputClasses,
      isDisabled,
      isRequired,
      name,
      title,
      type,
      value,
      labelText,
      isValid,
    } = this.props;

    const validInput = (isValid) ? 'valid' : 'invalid';
    return (
      <Wrapper className={validInput}>
        <Input
          className={inputClasses}
          id={id}
          name={name}
          type={type}
          title={title}
          value={value}
          required={isRequired}
          disabled={isDisabled}
          onChange={this.handleOnChange}
        />
        <Label
          htmlFor={`${id}`}
          id={`${name}Label`}
          className={inputClasses}
        >
          {labelText}
        </Label>
        <Ionicon icon={'icon ion-checkmark-round'} />
        <List>
          { this.renderRequirements() }
        </List>
      </Wrapper>
    );
  }
}
