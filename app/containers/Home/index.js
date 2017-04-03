import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';

// Selector
import { makeSelectUser, makeSelectIsSignedIn } from 'containers/App/selectors';
import { makeSelectOnboardingStage } from 'containers/Onboarding/selectors';
import { dispatchGetAuthenticatedUser } from 'containers/App/dispatches';
import { isUserOnboardingComplete } from 'utils/helpers';

export class Home extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    children: React.PropTypes.node,
  };

  componentWillMount() {
    const { onGetAuthenticatedUser } = this.props;
    // Check if the user is already logged in
    onGetAuthenticatedUser();
  }

  componentDidUpdate() {
    const { isSignedIn, userProp } = this.props;
    const user = (userProp.name) ? userProp : userProp.toJS();

    // If not signed in redirect to sign in
    if (!isSignedIn && !isUserOnboardingComplete(user)) {
      browserHistory.push({
        pathname: '/login',
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
  onboardingStage: T.any,
  onGetAuthenticatedUser: T.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userProp: makeSelectUser(),
  isSignedIn: makeSelectIsSignedIn(),
  onboardingStage: makeSelectOnboardingStage(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onGetAuthenticatedUser: () => dispatchGetAuthenticatedUser(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
