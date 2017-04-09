import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// Components
import A from 'components/A';
import H3 from 'components/H3';
import Button from 'components/Button';
import TextField from 'components/TextField';
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
  ButtonRow,
  ButtonItem,
} from './styles';

// Selectors
import {
  makeSelectEmail,
  makeSelectPassword,
  makeSelectRePassword,
  makeSelectEmailValid,
  makeSelectPasswordValid,
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
    const passwordRequirements = ['Must be at least 6 characters long', 'Must match'];

    return (
      <Container>
        <Notifications
          type={'error'}
          message={error}
          onClickEvent={onClearErrorMessages}
        />
        <Header>
          <H3>
            { messages.accountCreation.subtitle.defaultMessage }
          </H3>
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
            requirements={passwordRequirements}
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
            requirements={passwordRequirements}
            onChangeEvent={(e) => {
              onChangeRePassword(e, password);
            }}
            isRequired
          />
        </Body>
        <Footer>
          <ButtonRow>
            <ButtonItem>
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
            </ButtonItem>
          </ButtonRow>
          <A className={'btn full'} to={'/login'}>I already have an account</A>
        </Footer>
      </Container>
    );
  }
}

// Set our PropTypes
AccountCreation.propTypes = {
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

// Map state to props
const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  email: makeSelectEmail(),
  password: makeSelectPassword(),
  rePassword: makeSelectRePassword(),
  isEmailValid: makeSelectEmailValid(),
  isPasswordValid: makeSelectPasswordValid(),
});

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

// Connect our AccountCreation
export default connect(mapStateToProps, mapDispatchToProps)(AccountCreation);
