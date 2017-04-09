import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';

// Global Selectors
import {
  makeSelectUser,
  makeSelectExhibits,
  makeSelectFacilities,
  makeSelectIsSignedIn,
  makeSelectCurrentPlace,
} from 'containers/App/selectors';

// Dispacthes
import { dispatchGetAuthenticatedUser } from 'containers/App/dispatches';

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
    const { onGetAuthenticatedUser } = this.props;
    // Check if user is logged in
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
    const { userProps, isSignedIn, location, allExhibits, allFacilities } = this.props;
    const user = (userProps.location) ? userProps : userProps.toJS();

    if (!isSignedIn || !isUserOnboardingComplete(user)) return null;

    const { pathname } = location;
    const pathArray = pathname.split('/').splice(1);
    const zone = pathArray[1];
    const exhibits = (allExhibits.artisticAlley) ? allExhibits : allExhibits.toJS();
    const facilities = (allFacilities.restroom) ? allFacilities : allFacilities.toJS();

    let place = null;

    switch (pathArray[0]) {
      case 'exhibit':
        place = exhibits[pathArray[1]][pathArray[3]];
        break;
      case 'facility':
        place = facilities[pathArray[2]][pathArray[3]];
        break;
      default:
        place = null;
        break;
    }

    if (!place) return null;

    return (
      <ViewWrapper className={zone}>
        <Header place={place} />
        <Map place={place} />
        <Detail currentPlace={place} />
      </ViewWrapper>
    );
  }
}

DetailView.propTypes = {
  location: T.object.isRequired,
  isSignedIn: T.bool.isRequired,
  userProps: T.object.isRequired,
  allExhibits: T.object.isRequired,
  allFacilities: T.object.isRequired,
  onGetAuthenticatedUser: T.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userProps: makeSelectUser(),
  allExhibits: makeSelectExhibits(),
  allFacilities: makeSelectFacilities(),
  isSignedIn: makeSelectIsSignedIn(),
  currentPlace: makeSelectCurrentPlace(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onGetAuthenticatedUser: () => dispatchGetAuthenticatedUser(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailView);
