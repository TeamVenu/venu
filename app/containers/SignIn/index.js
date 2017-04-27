import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';
import Ionicon from 'react-ionicons';
import ImagineLogo from 'media/images/imagine-logo-color.gif';

// Components
import Wrapper from 'components/FullWrapper';

// Components
import Logo from 'components/Logo';
import H1 from 'components/H1';
import H3 from 'components/H3';

import P from 'components/P';
import Button from 'components/Button';

import {
  makeSelectError,
  makeSelectUserId,
  makeSelectLoading,
  makeSelectIsSignedIn,
  makeSelectIsAccountCreated,
} from 'containers/App/selectors';

import {
  dispatchGetAuthenticatedUser,
  dispatchSignInUserWithGoogle,
  dispatchSignInUserAnonymously,
  dispatchSignInUserWithFacebook,
  dispatchGetAuthenticatedUserFromProvider,
} from 'containers/App/dispatches';

import {
  Container,
  HeaderContainer,
  Header,
  Body,
  Footer,
  Img,
} from './styles';

// Messages
import messages from './messages';


export class SignIn extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    const { onGetAuthenticatedUserRedirect } = this.props;
    onGetAuthenticatedUserRedirect();
  }

  componentDidMount() {
    const { onGetAuthenticatedUser } = this.props;
    onGetAuthenticatedUser();
  }

  // Occurs after component updated
  componentDidUpdate() {
    const { isSignedIn, isAccountCreated } = this.props;

    if (isSignedIn && isAccountCreated) {
      browserHistory.push('/');
    }
  }

  render() {
    const {
      onSignInWithGoogle,
      onSignInAnonymously,
      onSignInWithFacebook,
      isLoading,
    } = this.props;

    // If loading show correct message
    const bodyComponent = (isLoading) ? (
      <Body>
        <li>
          <H3>
            <Ionicon icon={'icon ion-load-d'} rotate />
            {messages.signIn.loading.defaultMessage}
          </H3>
        </li>
      </Body>
    ) : (
      <Body>
        <li>
          <Button
            btnClasses={'facebook'}
            icon={'ion-social-facebook'}
            name={messages.signIn.facebook.defaultMessage}
            onClickEvent={onSignInWithFacebook}
          />
        </li>
        <li>
          <Button
            btnClasses={'google'}
            image={'google'}
            name={messages.signIn.google.defaultMessage}
            onClickEvent={onSignInWithGoogle}
          />
        </li>
        <li>
          <Button
            btnClasses={'anonymous'}
            name={messages.signIn.anonymous.defaultMessage}
            onClickEvent={onSignInAnonymously}
          />
        </li>
      </Body>
    );

    return (
      <Wrapper>
        <Container>
          <HeaderContainer>
            <Header>
              <Logo />
              <H1>{ messages.header.defaultMessage }</H1>
              <P>{ messages.intro.defaultMessage }</P>
            </Header>
          </HeaderContainer>
          {bodyComponent}
          <Footer>
            <Img
              src={ImagineLogo}
              alt={'Imagine RIT Logo'}
              title={'Imagine RIT Logo'}
            />
          </Footer>
        </Container>
      </Wrapper>
    );
  }
}

// Set our PropTypes
SignIn.propTypes = {
  isLoading: T.bool,
  isAccountCreated: T.bool,
  isSignedIn: T.bool,
  onSignInWithGoogle: T.func.isRequired,
  onSignInAnonymously: T.func.isRequired,
  onSignInWithFacebook: T.func.isRequired,
  onGetAuthenticatedUser: T.func.isRequired,
  onGetAuthenticatedUserRedirect: T.func.isRequired,
};

// Map state to props
const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  userId: makeSelectUserId(),
  isLoading: makeSelectLoading(),
  isSignedIn: makeSelectIsSignedIn(),
  isAccountCreated: makeSelectIsAccountCreated(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onGetAuthenticatedUser: () => dispatchGetAuthenticatedUser(dispatch),
    onSignInWithGoogle: () => dispatchSignInUserWithGoogle(dispatch),
    onSignInAnonymously: () => dispatchSignInUserAnonymously(dispatch),
    onSignInWithFacebook: () => dispatchSignInUserWithFacebook(dispatch),
    onGetAuthenticatedUserRedirect: () => dispatchGetAuthenticatedUserFromProvider(dispatch),
  };
}

// Connect our Onboarding
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
