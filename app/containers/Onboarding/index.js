import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// Components
import SmallWrapper from 'components/SmallWrapper';
import TextField from 'components/TextField';
import Button from 'components/Button';
import Notifications from 'components/Notifications';

// Local Styles
import {
  Header,
  Body,
  Label,
  DescriptionList,
  DescriptionTitle,
  DescriptionDefinition,
} from './styles';

// Redux
import {  makeSelectUser, makeSelectOnboardingValidation, makeSelectOnboardingErrorMessages } from './selectors';

// Helper Methods
import { onChangeDisplayName, onChangeEmail, onSubmitAccountCreation } from './helpers';

export class Onboarding extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    // Get the props we need
    const { 
      user, 
      validation, 
      errorMessages, 
      onChangeDisplayName, 
      onChangeEmail, 
      onSubmitAccountCreation 
    } = this.props;

    // Cache the username and email validation bool
    const accountCreationValidation = {
      username: validation.getIn(['accountCreation', 'username']),
      email: validation.getIn(['accountCreation', 'email']),
    };

    // Verify that the data is valid so we can enable to button
    const validData = (accountCreationValidation.username && accountCreationValidation.email) ? true : false;

    // For input classes
    let emailValidationClass,
        usernameValidationClass;
    
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
    }

    return (
      <SmallWrapper className='centered'>
        <Notifications type='error' messages={errorMessages.get('accountCreation')} visible={false} />
        <Header>
          <h1>Welcome to Venu!</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam rem distinctio fugit et, consequatur molestias laudantium placeat laboriosam dolorum a voluptatum autem ipsa quasi quo minus, debitis nihil quaerat officia.</p>
        </Header>
        <Body>
          <h3>Create an account</h3>
          <DescriptionList>
            <DescriptionTitle>
              <Label htmlFor='usernameField' id='usernameLabel' className={usernameValidationClass}>Enter your name:</Label>
            </DescriptionTitle>
            <DescriptionDefinition>
              <TextField 
                name='username'
                id='usernameField'
                isRequired={true}
                type='text'
                placeholderText='Jane'
                value={user.name}
                inputClasses={usernameValidationClass}
                onChangeEvent={onChangeDisplayName}
                isRequired={true}
              />
            </DescriptionDefinition>
            <DescriptionTitle>
              <Label htmlFor='emailField' id='emailLabel' className={emailValidationClass}>Enter a valid email:</Label>
            </DescriptionTitle>
            <DescriptionDefinition>
              <TextField
                name='email'
                id='emailField'
                type='email'
                placeholderText='jane@rit.edu'
                title='Please enter a valid email.'
                value={user.email}
                inputClasses={emailValidationClass}
                onChangeEvent={onChangeEmail}
                isRequired={true}
                />
            </DescriptionDefinition>
          </DescriptionList>
        </Body>
        <Button
          btnClasses='reversed full bordered'
          name='Next'
          onClickEvent={onSubmitAccountCreation}
          isDisabled={!validData}
          />
      </SmallWrapper>
    );
  }
}

// Set our PropTypes
Onboarding.propTypes = {
  user: T.object,
  validation: T.object,
};

// Map dispatch functions to props so we can call them
export function mapDispatchToProps(dispatch) {
  return {
    onChangeDisplayName: (event) => onChangeDisplayName(dispatch, event),
    onChangeEmail: (event) => onChangeEmail(dispatch, event),
    onSubmitAccountCreation: (event) => onSubmitAccountCreation(dispatch, event),
  };
}

// Map state to props
const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  validation: makeSelectOnboardingValidation(),
  errorMessages: makeSelectOnboardingErrorMessages(),
});

// Connect our app
export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);