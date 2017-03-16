import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// Components
import SmallWrapper from 'components/SmallWrapper';
import TextField from 'components/TextField';
import Button from 'components/Button';

// Messages
import messages from './messages';

// Local Styles
import {
  Header,
  Body,
  Label,
  DescriptionList,
  DescriptionTitle,
  DescriptionDefinition,
} from './styles';

// Selectors
import {
  makeSelectUser,
  makeSelectOnboardingValidation,
} from './selectors';

// Dispatch Methods
import {
  dispatchChangeDisplayName,
  dispatchChangeEmail,
  dispatchSubmitAccountCreation,
} from './helpers';

// AccountCreation
export class AccountCreation extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    // Get the props we need
    const {
      user,
      validation,
      onChangeDisplayName,
      onChangeEmail,
      onSubmitAccountCreation,
    } = this.props;

    // Cache the username and email validation bool
    const accountCreationValidation = {
      username: validation.getIn(['accountCreation', 'username']),
      email: validation.getIn(['accountCreation', 'email']),
    };

    // Verify that the data is valid so we can enable to button
    const validData = (accountCreationValidation.username && accountCreationValidation.email);

    // For input classes
    let emailValidationClass;
    let usernameValidationClass;

    // Set a class for username based on whether it is valid or not
    switch (accountCreationValidation.username) {
      case null:
        usernameValidationClass = null;
        break;
      case false:
        usernameValidationClass = 'invalid';
        break;
      case true:
        usernameValidationClass = 'valid';
        break;
      default:
        usernameValidationClass = null;
        break;
    }

    // Set a class for email based on whether it is valid or not
    switch (accountCreationValidation.email) {
      case null:
        emailValidationClass = null;
        break;
      case false:
        emailValidationClass = 'invalid';
        break;
      case true:
        emailValidationClass = 'valid';
        break;
      default:
        emailValidationClass = null;
        break;
    }

    return (
      <SmallWrapper className="centered">
        <Header>
          <h1>{ messages.accountCreation.messages.title.defaultMessage }</h1>
          <p>{ messages.accountCreation.messages.intro.defaultMessage }</p>
        </Header>
        <Body>
          <h3>
            { messages.accountCreation.messages.subtitle.defaultMessage }
          </h3>
          <DescriptionList>
            <DescriptionTitle>
              <Label
                htmlFor="usernameField"
                id="usernameLabel"
                className={usernameValidationClass}
              >
                { messages.accountCreation.messages.nameLabel.defaultMessage }
              </Label>
            </DescriptionTitle>
            <DescriptionDefinition>
              <TextField
                name="username"
                id="usernameField"
                type="text"
                placeholderText="Jane"
                value={user.name}
                inputClasses={usernameValidationClass}
                onChangeEvent={onChangeDisplayName}
                isRequired
              />
            </DescriptionDefinition>
            <DescriptionTitle>
              <Label
                htmlFor="emailField"
                id="emailLabel"
                className={emailValidationClass}
              >
                { messages.accountCreation.messages.emailLabel.defaultMessage }
              </Label>
            </DescriptionTitle>
            <DescriptionDefinition>
              <TextField
                name="email"
                id="emailField"
                type="email"
                placeholderText="jane@rit.edu"
                title="Please enter a valid email."
                value={user.email}
                inputClasses={emailValidationClass}
                onChangeEvent={onChangeEmail}
                isRequired
              />
            </DescriptionDefinition>
          </DescriptionList>
        </Body>
        <Button
          btnClasses={'reversed full bordered'}
          name={messages.buttons.messages.next.defaultMessage}
          onClickEvent={(e) => { onSubmitAccountCreation(e, this.props.user); }}
          isDisabled={!validData}
        />
      </SmallWrapper>
    );
  }
}

// Set our PropTypes
AccountCreation.propTypes = {
  user: T.object,
  validation: T.object,
  onChangeDisplayName: T.func,
  onChangeEmail: T.func,
  onSubmitAccountCreation: T.func,
};

// Map dispatch functions to props so we can call them
export function mapDispatchToProps(dispatch) {
  return {
    onChangeDisplayName: (event) => dispatchChangeDisplayName(dispatch, event),
    onChangeEmail: (event) => dispatchChangeEmail(dispatch, event),
    onSubmitAccountCreation: (event, user) => dispatchSubmitAccountCreation(dispatch, event, user),
  };
}

// Map state to props
const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  validation: makeSelectOnboardingValidation(),
});

// Connect our AccountCreation
export default connect(mapStateToProps, mapDispatchToProps)(AccountCreation);
