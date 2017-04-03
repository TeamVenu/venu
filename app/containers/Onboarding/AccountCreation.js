import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// Components
import TextField from 'components/TextField';
import Button from 'components/Button';
import A from 'components/A';
import Notifications from 'components/Notifications';

// Global Selectors
import { makeSelectError } from 'containers/App/selectors';

// Global Helpers
import {
  dispatchSetErrorMessages,
  dispatchCreateUserAccount,
} from 'containers/App/dispatches';

// Messages
import messages from './messages';

// Local Styles
import {
  Container,
  Header,
  Body,
  Footer,
} from './styles';

// Selectors
import {
  makeSelectEmail,
  makeSelectPassword,
  makeSelectRePassword,
  makeSelectEmailValid,
  makeSelectPasswordValid,
  makeSelectOnboardingStage,
} from './selectors';

// Dispatch Methods
import {
  dispatchChangeUserEmail,
  dispatchChangeUserPassword,
  dispatchChangeUserRePassword,
} from './dispatches';

// AccountCreation
export class AccountCreation extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    // Get the props we need
    const {
      error,
      stage,
      email,
      password,
      rePassword,
      isEmailValid,
      isPasswordValid,
      onChangeEmail,
      onChangePassword,
      onChangeRePassword,
      onClearErrorMessages,
      onSubmitAccountCreation,
    } = this.props;

    // Verify that the data is valid so we can enable to button
    const validData = (isEmailValid && isPasswordValid);

    return (
      <Container>
        <Notifications
          type={'error'}
          message={error}
          onClickEvent={onClearErrorMessages}
        />
        <Header>
          <h3>
            { messages.accountCreation.subtitle.defaultMessage }
          </h3>
        </Header>
        <Body>
          <TextField
            name={'email'}
            id={'emailField'}
            type={'text'}
            value={email}
            isValid={isEmailValid}
            labelText={messages.accountCreation.emailLabel.defaultMessage}
            onChangeEvent={onChangeEmail}
            isRequired
          />
          <TextField
            name={'password'}
            id={'passwordField'}
            type={'password'}
            labelText={messages.accountCreation.passwordLabel.defaultMessage}
            isValid={isPasswordValid}
            value={password}
            onChangeEvent={(e) => {
              onChangePassword(e, rePassword);
            }}
            isRequired
          />
          <TextField
            name={'passwordCheck'}
            id={'passwordCheckField'}
            type={'password'}
            labelText={messages.accountCreation.passwordCheckLabel.defaultMessage}
            isValid={isPasswordValid}
            value={rePassword}
            onChangeEvent={(e) => {
              onChangeRePassword(e, password);
            }}
            isRequired
          />
        </Body>
        <Footer>
          <Button
            btnClasses={''}
            icon={'ion-ios-arrow-thin-right'}
            name={messages.buttons.next.defaultMessage}
            onClickEvent={() => {
              const credentials = {
                email,
                password,
              };

              onSubmitAccountCreation(credentials);
            }}
            isDisabled={!validData}
            isIconAfter
          />
          <A className={'btn full'} to={'/login'}>I already have an account</A>
        </Footer>
      </Container>
    );
  }
}

// Set our PropTypes
AccountCreation.propTypes = {
  stage: T.any.isRequired,
  error: T.string,
  email: T.string,
  password: T.string,
  rePassword: T.string,
  isEmailValid: T.bool,
  isPasswordValid: T.bool,
  onChangeEmail: T.func,
  onChangePassword: T.func,
  onChangeRePassword: T.func,
  onClearErrorMessages: T.func,
  onSubmitAccountCreation: T.func,
};

// Map dispatch functions to props so we can call them
export function mapDispatchToProps(dispatch) {
  return {
    onChangeEmail: (event) => dispatchChangeUserEmail(dispatch, event),
    onClearErrorMessages: () => dispatchSetErrorMessages(dispatch, null),
    onChangePassword: (event, password) => dispatchChangeUserPassword(dispatch, event, password),
    onChangeRePassword: (event, password) => dispatchChangeUserRePassword(dispatch, event, password),
    onSubmitAccountCreation: (user) => dispatchCreateUserAccount(dispatch, user),
  };
}

// Map state to props
const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  email: makeSelectEmail(),
  password: makeSelectPassword(),
  rePassword: makeSelectRePassword(),
  isEmailValid: makeSelectEmailValid(),
  isPasswordValid: makeSelectPasswordValid(),
  stage: makeSelectOnboardingStage(),
});

// Connect our AccountCreation
export default connect(mapStateToProps, mapDispatchToProps)(AccountCreation);

// <TextField
//   name={'name'}
//   id={'nameField'}
//   type={'text'}
//   labelText={messages.accountCreation.nameLabel.defaultMessage}
//   onChangeEvent={}
//   isRequired
// />
// <TextField
//   name={'age'}
//   id={'ageField'}
//   type={'number'}
//   labelText={messages.accountCreation.ageLabel.defaultMessage}
//   isRequired
// />
