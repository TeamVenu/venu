/*
 * ChangePassword
 */
import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';

// Components
import H2 from 'components/H2';
import TabBar from 'components/TabBar';
import Navigation from 'components/Header';
import TabBarList from 'components/TabBarList';
import FullWrapper from 'components/FullWrapper';

// Components
import Button from 'components/Button';
import TextField from 'components/TextField';
import Notifications from 'components/Notifications';
import {
  Container,
  Body,
  Footer,
  ButtonRow,
  ButtonItem,
} from 'components/FullPage';

// Selectors
import {
  makeSelectUser,
  makeSelectError,
  makeSelectSuccess,
  makeSelectIsSignedIn,
} from 'containers/App/selectors';

// Dispacthes
import {
  dispatchSetErrorMessages,
  dispatchSetSuccessMessages,
  dispatchChangeUserAuthPassword,
  dispatchGetAuthenticatedUser,
} from 'containers/App/dispatches';

// Helpers
import { isUserOnboardingComplete } from 'utils/helpers';

import messages from 'containers/Profile/messages';

// Selectors
import {
  makeSelectPassword,
  makeSelectRePassword,
  makeSelectPasswordValid,
} from 'containers/Profile/selectors';

// Dispatch Methods
import {
  dispatchChangeUserPassword,
  dispatchChangeUserRePassword,
} from 'containers/Profile/dispatches';

export class ChangePassword extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    const { onGetAuthenticatedUser } = this.props;
    onGetAuthenticatedUser();
  }

  componentDidUpdate() {
    const { userProps, isSignedIn } = this.props;
    const user = (userProps.location) ? userProps : userProps.toJS();

    if (!isSignedIn || !isUserOnboardingComplete(user)) {
      browserHistory.push('/login');
    }
  }

  render() {
    const {
      error,
      success,
      password,
      rePassword,
      userProps,
      isSignedIn,
      isPasswordValid,
      onChangePassword,
      onChangeRePassword,
      onClearErrorMessages,
      onClearSuccessMessages,
      onSubmitChangePassword,
    } = this.props;

    const user = (userProps.location) ? userProps : userProps.toJS();
    const { goBack } = browserHistory;
    const passwordRequirements = ['Must be at least 6 characters long', 'Must match'];

    if (!isSignedIn || !isUserOnboardingComplete(user)) return null;

    return (
      <FullWrapper className={'gradient-bg'}>
        <Navigation>
          <TabBar>
            <TabBarList className={'header'}>
              <li>
                <Button
                  btnClasses={'large'}
                  icon={'ion-ios-arrow-back'}
                  onClickEvent={goBack}
                />
              </li>
              <li>
                <H2 className={'title'}>{ messages.settings.changePassword.header.defaultMessage }</H2>
              </li>
              <li />
            </TabBarList>
          </TabBar>
        </Navigation>
        <Notifications
          type={'error'}
          message={error}
          onClickEvent={onClearErrorMessages}
        />
        <Notifications
          type={'success'}
          message={success}
          onClickEvent={() => {
            onClearSuccessMessages();
            goBack();
          }}
        />
        <Container>
          <Body>
            <TextField
              name={'password'}
              id={'passwordField'}
              type={'password'}
              value={password}
              isValid={isPasswordValid}
              labelText={messages.settings.changePassword.passwordLabel.defaultMessage}
              onChangeEvent={(e) => {
                onChangePassword(e, rePassword);
              }}
              isRequired
            />
            <TextField
              name={'rePassword'}
              id={'rePasswordField'}
              type={'password'}
              value={rePassword}
              isValid={isPasswordValid}
              labelText={messages.settings.changePassword.passwordCheckLabel.defaultMessage}
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
                  name={messages.settings.changePassword.button.defaultMessage}
                  isDisabled={!isPasswordValid}
                  onClickEvent={() => {
                    onSubmitChangePassword(password);
                  }}
                />
              </ButtonItem>
            </ButtonRow>
          </Footer>
        </Container>
      </FullWrapper>
    );
  }
}

ChangePassword.propTypes = {
  error: T.string,
  success: T.string,
  isSignedIn: T.bool,
  password: T.string,
  rePassword: T.string,
  onClearErrorMessages: T.func,
  onClearSuccessMessages: T.func,
  userProps: T.object.isRequired,
  isPasswordValid: T.bool,
  onChangePassword: T.func.isRequired,
  onChangeRePassword: T.func.isRequired,
  onSubmitChangePassword: T.func.isRequired,
  onGetAuthenticatedUser: T.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  password: makeSelectPassword(),
  rePassword: makeSelectRePassword(),
  userProps: makeSelectUser(),
  success: makeSelectSuccess(),
  isSignedIn: makeSelectIsSignedIn(),
  isPasswordValid: makeSelectPasswordValid(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangePassword: (event, password) => dispatchChangeUserPassword(dispatch, event, password),
    onChangeRePassword: (event, password) => dispatchChangeUserRePassword(dispatch, event, password),
    onGetAuthenticatedUser: () => dispatchGetAuthenticatedUser(dispatch),
    onClearErrorMessages: () => dispatchSetErrorMessages(dispatch, null),
    onClearSuccessMessages: () => dispatchSetSuccessMessages(dispatch, null),
    onSubmitChangePassword: (password) => dispatchChangeUserAuthPassword(dispatch, password),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
