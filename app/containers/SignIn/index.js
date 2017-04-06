import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';

// Components
import Wrapper from 'components/FullWrapper';

// Components
import Logo from 'components/Logo';
import H1 from 'components/H1';
import P from 'components/P';
import A from 'components/A';
import TextField from 'components/TextField';
import Button from 'components/Button';
import Notifications from 'components/Notifications';

import { makeSelectUser, makeSelectUserId, makeSelectError } from 'containers/App/selectors';
import { authenticateUser, dispatchSetErrorMessages } from 'containers/App/dispatches';

// Utils
import { isUserOnboardingComplete } from 'utils/helpers';

// Redux
import {
  makeSelectEmail,
  makeSelectPassword,
  makeSelectEmailValidation,
  makeSelectPasswordValidation,
} from './selectors';

import {
  dispatchChangeEmail,
  dispatchChangePassword,
} from './dispatches';

import {
  Container,
  Header,
  Body,
  Footer,
} from './styles';

// Messages
import messages from './messages';


export class SignIn extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const { user } = this.props;

    if (user.uid && isUserOnboardingComplete(user)) {
      browserHistory.push('/');
    }
  }

  // Occurs after component updated
  componentDidUpdate() {
    const { user } = this.props;

    if (user.uid && isUserOnboardingComplete(user)) {
      browserHistory.push('/');
    }
  }

  render() {
    const {
      error,
      email,
      password,
      isEmailValid,
      isPasswordValid,
      onChangeEmail,
      onChangePassword,
      onClearErrorMessages,
      onSubmitForm,
    } = this.props;
    const isDataValid = (isEmailValid && isPasswordValid);

    return (
      <Wrapper className={'map-bg full-page'}>
        <Wrapper className={'gradient-bg opaque'}>
          <Notifications
            type={'error'}
            message={error}
            onClickEvent={onClearErrorMessages}
          />
          <Container>
            <Header>
              <Logo />
              <H1>{ messages.header.defaultMessage }</H1>
              <P>{ messages.intro.defaultMessage }</P>
            </Header>
            <Body>
              <TextField
                name={'email'}
                id={'emailField'}
                type={'text'}
                value={email}
                labelText={'Email'}
                onChangeEvent={onChangeEmail}
                isValid={isEmailValid}
                isRequired
              />
              <TextField
                name={'password'}
                id={'passwordField'}
                type={'password'}
                value={password}
                labelText={'Password'}
                isValid={isPasswordValid}
                onChangeEvent={onChangePassword}
                isRequired
              />
              <A>{ messages.signIn.forgotPassword.defaultMessage }</A>
            </Body>
            <Footer>
              <li>
                <Button
                  btnClasses={'bordered special reversed rounded full'}
                  name={messages.buttons.signIn.defaultMessage}
                  onClickEvent={() => {
                    // Create an object with email and password
                    const userCredentials = {
                      email,
                      password,
                    };

                    // Submit form
                    onSubmitForm(userCredentials);
                  }}
                  isDisabled={!isDataValid}
                />
              </li>
              <li>
                <A to={'/onboarding'} className={' btn bordered rounded full'}>
                  {messages.buttons.createAccount.defaultMessage}
                </A>
              </li>
            </Footer>
          </Container>
        </Wrapper>
      </Wrapper>
    );
  }
}

// Set our PropTypes
SignIn.propTypes = {
  user: T.object,
  error: T.string,
  email: T.string.isRequired,
  password: T.string.isRequired,
  isEmailValid: T.bool,
  isPasswordValid: T.bool,
  onSubmitForm: T.func.isRequired,
  onChangeEmail: T.func.isRequired,
  onChangePassword: T.func.isRequired,
  onClearErrorMessages: T.func.isRequired,
};

// Map state to props
const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  userId: makeSelectUserId(),
  email: makeSelectEmail(),
  password: makeSelectPassword(),
  error: makeSelectError(),
  isEmailValid: makeSelectEmailValidation(),
  isPasswordValid: makeSelectPasswordValidation(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onClearErrorMessages: () => dispatchSetErrorMessages(dispatch, null),
    onChangeEmail: (event) => dispatchChangeEmail(dispatch, event),
    onChangePassword: (event) => dispatchChangePassword(dispatch, event),
    onSubmitForm: (credentials) => authenticateUser(dispatch, credentials),
  };
}

// Connect our Onboarding
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
