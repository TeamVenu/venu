import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';

// Selector
import { makeSelectUser, makeSelectIsSignedIn } from 'containers/App/selectors';
import {
  dispatchGetAuthenticatedUser,
} from 'containers/App/dispatches';

import { dispatchSetStage } from 'containers/Onboarding/dispatches';

import { isUserOnboardingComplete } from 'utils/helpers';

export class Home extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    children: React.PropTypes.node,
  };

  componentWillMount() {
    const { isSignedIn, userProp, onStartOnboarding } = this.props;
    const user = (userProp.location) ? userProp : userProp.toJS();

    // If not signed in redirect to sign in
    if (!isSignedIn) {
      browserHistory.push({
        pathname: '/login',
      });
    } else if (!isUserOnboardingComplete(user)) {
      // Start onboarding
      onStartOnboarding(0);

      // Redirect to onboarding
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
  onStartOnboarding: T.func,
};

const mapStateToProps = createStructuredSelector({
  userProp: makeSelectUser(),
  isSignedIn: makeSelectIsSignedIn(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onStartOnboarding: (stage) => dispatchSetStage(dispatch, stage),
    onGetAuthenticatedUser: () => dispatchGetAuthenticatedUser(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
