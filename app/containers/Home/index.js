import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';

// Selector
import { makeSelectUser, makeSelectIsSignedIn } from 'containers/App/selectors';
import {
  dispatchGetAuthenticatedUser,
} from 'containers/App/dispatches';

import { isUserOnboardingComplete } from 'utils/helpers';

export class Home extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    children: React.PropTypes.node,
  };

  // componentWillMount() {
  //   const { isSignedIn } = this.props;
  //   // Check if the user is already logged in
  //   // console.log('HOME: AUTHENTICATING USER');
  //   // onGetAuthenticatedUser();
  // }

  componentWillMount() {
    const { isSignedIn, userProp } = this.props;
    const user = (userProp.location) ? userProp : userProp.toJS();

    // If not signed in redirect to sign in
    if (!isSignedIn) {
      browserHistory.push({
        pathname: '/login',
      });
    } else if (!isUserOnboardingComplete(user)) {
      browserHistory.push({
        pathname: '/onboarding',
      });
    }
  }

  renderChildren() {
    const { children, isSignedIn } = this.props;

    if (!isSignedIn) return null;

    if (React.Children.count(children) > 0) {
      return React.Children.map(children, (c) => { // eslint-disable-line
        return React.cloneElement(c, this.props, {
        });
      });
    }
    return null;
  }

  render() {
    return (
      <section>
        {this.renderChildren()}
      </section>
    );
  }
}

Home.propTypes = {
  userProp: T.object,
  isSignedIn: T.bool,
};

const mapStateToProps = createStructuredSelector({
  userProp: makeSelectUser(),
  isSignedIn: makeSelectIsSignedIn(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onGetAuthenticatedUser: () => dispatchGetAuthenticatedUser(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
