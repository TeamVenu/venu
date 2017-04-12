/*
 * ChangeEmail
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
  dispatchChangeUserAuthEmail,
  dispatchGetAuthenticatedUser,
} from 'containers/App/dispatches';

// Helpers
import { isUserOnboardingComplete } from 'utils/helpers';

import messages from 'containers/Profile/messages';

// Selectors
import {
  makeSelectEmail,
  makeSelectEmailValid,
} from 'containers/Profile/selectors';

// Dispatch Methods
import {
  dispatchChangeUserEmail,
} from 'containers/Profile/dispatches';

export class ChangeEmail extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    const { userProps, onChangeEmail, onGetAuthenticatedUser } = this.props;
    const user = (userProps.location) ? userProps : userProps.toJS();
    onGetAuthenticatedUser();

    const e = {
      target: {
        value: user.email,
      },
    };

    onChangeEmail(e);
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
      email,
      userProps,
      isSignedIn,
      isEmailValid,
      onChangeEmail,
      onClearErrorMessages,
      onClearSuccessMessages,
      onSubmitChangeEmail,
    } = this.props;

    const user = (userProps.location) ? userProps : userProps.toJS();
    const { goBack } = browserHistory;

    if (!isSignedIn || !isUserOnboardingComplete(user)) return null;

    return (
      <FullWrapper className={'gradient-bg'} bottomPadding>
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
                <H2 className={'title'}>{ messages.settings.changeEmail.header.defaultMessage }</H2>
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
              name={'email'}
              id={'emailField'}
              type={'text'}
              value={email}
              isValid={isEmailValid}
              labelText={messages.settings.changeEmail.emailLabel.defaultMessage}
              onChangeEvent={onChangeEmail}
              isRequired
            />
          </Body>
          <Footer>
            <ButtonRow>
              <ButtonItem>
                <Button
                  name={messages.settings.changeEmail.button.defaultMessage}
                  isDisabled={!isEmailValid}
                  onClickEvent={() => {
                    onSubmitChangeEmail(user, email);
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

ChangeEmail.propTypes = {
  error: T.string,
  success: T.string,
  isSignedIn: T.bool,
  email: T.string.isRequired,
  onClearErrorMessages: T.func,
  onClearSuccessMessages: T.func,
  userProps: T.object.isRequired,
  isEmailValid: T.bool,
  onChangeEmail: T.func.isRequired,
  onSubmitChangeEmail: T.func.isRequired,
  onGetAuthenticatedUser: T.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  email: makeSelectEmail(),
  userProps: makeSelectUser(),
  success: makeSelectSuccess(),
  isSignedIn: makeSelectIsSignedIn(),
  isEmailValid: makeSelectEmailValid(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeEmail: (event) => dispatchChangeUserEmail(dispatch, event),
    onGetAuthenticatedUser: () => dispatchGetAuthenticatedUser(dispatch),
    onClearErrorMessages: () => dispatchSetErrorMessages(dispatch, null),
    onClearSuccessMessages: () => dispatchSetSuccessMessages(dispatch, null),
    onSubmitChangeEmail: (user, email) => dispatchChangeUserAuthEmail(dispatch, user, email),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeEmail);
