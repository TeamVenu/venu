import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';

// Global Selectors
import {
  makeSelectUser,
  makeSelectIsSignedIn,
  makeSelectCurrentPlace,
} from 'containers/App/selectors';

// Dispacthes
import {
  dispatchGetAuthenticatedUser,
} from 'containers/App/dispatches';

// Helpers
import {
  isUserOnboardingComplete,
} from 'utils/helpers';

// Local Components
import Header from './Header';
import Map from './Map';
import Detail from './Detail';

import { ViewWrapper } from './styles';

export class DetailView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    const { place, onGetAuthenticatedUser } = this.props;

    // Check if user is logged in
    onGetAuthenticatedUser();

    // If no place redirect back to main
    if (place === {} || place.size === 0) {
      // Redirect to main
      browserHistory.push({
        pathname: '/',
      });
    }
  }

  componentDidUpdate() {
    const { userProps, isSignedIn } = this.props;
    const user = (userProps.location) ? userProps : userProps.toJS();

    if (!isSignedIn || !isUserOnboardingComplete(user)) {
      browserHistory.push('/login');
    }
  }

  render() {
    const { place, userProps, isSignedIn } = this.props;
    const user = (userProps.location) ? userProps : userProps.toJS();

    if (!isSignedIn
    || !isUserOnboardingComplete(user)
    || place === {}
    || place.size === 0) return null;

    return (
      <ViewWrapper className={place.colorZone}>
        <Header />
        <Map />
        <Detail />
      </ViewWrapper>
    );
  }
}

DetailView.propTypes = {
  userProps: T.object.isRequired,
  place: T.object.isRequired,
  isSignedIn: T.bool.isRequired,
  onGetAuthenticatedUser: T.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userProps: makeSelectUser(),
  isSignedIn: makeSelectIsSignedIn(),
  place: makeSelectCurrentPlace(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onGetAuthenticatedUser: () => dispatchGetAuthenticatedUser(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailView);
