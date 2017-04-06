import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';

// Components
import Wrapper from 'components/FullWrapper';

import { makeSelectUser } from 'containers/App/selectors';

import { dispatchGetAuthenticatedUser } from 'containers/App/dispatches';

// Containers
import AccountCreation from './AccountCreation';
import Profile from './Profile';
import GeolocationSetup from './GeolocationSetup';
import InterestSelection from './InterestSelection';

// Redux
import { makeSelectOnboardingStage } from './selectors';

import { dispatchSetStage } from './dispatches';

export class Onboarding extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    const { onGetAuthenticatedUser } = this.props;
    // Check if the user is already logged in
    onGetAuthenticatedUser();
  }

  // Occurs after component updated
  componentDidUpdate() {
    const { stage, userProp, onSetStage } = this.props;
    const user = (userProp.location) ? userProp : userProp.toJS();
    let newStage = 0;

    if (user.email.length === 0 || user.uid.length === 0) {
      newStage = 0;
    } else if ((user.name.length === 0 || user.age.length === 0) || (stage === 1)) {
      newStage = 1;
    } else if ((user.location.lat === '' || user.location.lng === '') || (stage === 2)) {
      newStage = 2;
    } else if ((user.interests.length === 0) || (stage === 3)) {
      newStage = 3;
    } else {
      newStage = 4;
    }

    onSetStage(newStage);

    if (stage > 3) {
      browserHistory.push({
        pathname: '/',
      });
    }
  }

  render() {
    const { stage } = this.props;

    // Initialize stage we will render
    let stageToRender;

    // Using the stage number
    // Figure out what container to render
    switch (stage) {
      // Case 0: Account Creation
      case 0:
        stageToRender = (<AccountCreation />);
        break;
      // Case 2: Render Profile
      case 1:
        stageToRender = (<Profile />);
        break;
      // Case 3: Render GeolocationSetup
      case 2:
        stageToRender = (<GeolocationSetup />);
        break;
      // Case 4: Render InterestSelection
      case 3:
        stageToRender = (<InterestSelection />);
        break;
      // On default render AccountCreation
      default:
        // Render Account Creation
        stageToRender = (<div />);
        break;
    }

    return (
      <Wrapper className={'gradient-bg full-page'}>
        { stageToRender }
      </Wrapper>
    );
  }
}

// Set our PropTypes
Onboarding.propTypes = {
  userProp: T.object,
  stage: T.number.isRequired,
  onSetStage: T.func.isRequired,
  onGetAuthenticatedUser: T.func.isRequired,
};

// Map state to props
const mapStateToProps = createStructuredSelector({
  stage: makeSelectOnboardingStage(),
  userProp: makeSelectUser(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onGetAuthenticatedUser: () => dispatchGetAuthenticatedUser(dispatch),
    onSetStage: (stage) => dispatchSetStage(dispatch, stage),
  };
}

// Connect our Onboarding
export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);
