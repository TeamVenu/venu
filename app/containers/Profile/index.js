/*
 * Profile
 */

import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';

// Components
import H2 from 'components/H2';
import Button from 'components/Button';
import TabBar from 'components/TabBar';
import Container from 'components/Header';
import TabBarList from 'components/TabBarList';

// Containers

// Selectors
import {
  makeSelectUser,
  makeSelectIsSignedIn,
} from 'containers/App/selectors';

// Dispacthes
import {
  dispatchSignOutUser,
  dispatchGetAuthenticatedUser,
} from 'containers/App/dispatches';

// Helpers
import {
  isUserOnboardingComplete,
} from 'utils/helpers';

// Local

export class Profile extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
    const { userProps, isSignedIn, onSignOut } = this.props;
    const user = (userProps.location) ? userProps : userProps.toJS();

    if (!isSignedIn || !isUserOnboardingComplete(user)) return null;

    return (
      <div>
        <Container>
          <TabBar>
            <TabBarList className={'header'}>
              <li />
              <li>
                <H2 className={'title'}>Profile</H2>
              </li>
              <li />
            </TabBarList>
          </TabBar>
        </Container>
        <Button
          btnClasses={'full rounded bordered'}
          name={'Sign Out'}
          onClickEvent={onSignOut}
        />
      </div>
    );
  }
}

Profile.propTypes = {
  isSignedIn: T.bool,
  onSignOut: T.func.isRequired,
  userProps: T.object.isRequired,
  onGetAuthenticatedUser: T.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userProps: makeSelectUser(),
  isSignedIn: makeSelectIsSignedIn(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSignOut: () => dispatchSignOutUser(dispatch),
    onGetAuthenticatedUser: () => dispatchGetAuthenticatedUser(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
