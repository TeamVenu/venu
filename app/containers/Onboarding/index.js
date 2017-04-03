import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';

// Components
import Wrapper from 'components/FullWrapper';

import { makeSelectUser } from 'containers/App/selectors';

import { isUserOnboardingComplete } from 'utils/helpers';

// Containers
import AccountCreation from './AccountCreation';
import GeolocationSetup from './GeolocationSetup';
import InterestSelection from './InterestSelection';

// Redux
import { makeSelectOnboardingStage } from './selectors';


export class Onboarding extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  // Occurs after component updated
  componentDidUpdate() {
    const { userProp } = this.props;

    const user = (userProp.uid) ? userProp : userProp.toJS();

    if (isUserOnboardingComplete(user)) {
      browserHistory.push({
        pathname: '/',
      });
    }
  }

  render() {
    // TODO: on case 3 start our app
    const { userProp } = this.props;

    const user = (userProp.uid) ? userProp : userProp.toJS();
    let stage = 0;
    console.log(user);

    if (user.email.length === 0 || user.uid.length === 0) {
      stage = 0;
    } else if (user.name.length === 0 || user.age.length === 0) {
      stage = 1;
    } else if (user.location.lat === '' || user.location.lng === '') {
      stage = 2;
    } else if (user.interests.length === 0) {
      stage = 3;
    } else {
      stage = 0;
    }

    // Initialize stage we will render
    let stageToRender;

    // Using the stage number
    // Figure out what container to render
    switch (stage) {
      // If case 0 we want to render AccountCreation
      case 0:
        // Render Account Creation
        stageToRender = (<AccountCreation />);
        break;
      // Case 1: Render GeolocationSetup
      case 1:
        stageToRender = (<GeolocationSetup />);
        break;
      // Case 2: Render InterestSelection
      case 2:
        stageToRender = (<InterestSelection />);
        break;
      case 3:
        // Empty div, we're leaving Onboarding
        // TODO: Make this display a loading screen
        stageToRender = (<div />);
        break;
      // On default render AccountCreation
      default:
        // Render Account Creation
        stageToRender = (<AccountCreation />);
        break;
    }

    return (
      <Wrapper className={'gradient-bg'}>
        { stageToRender }
      </Wrapper>
    );
  }
}

// Set our PropTypes
Onboarding.propTypes = {
  stage: T.any,
  userProp: T.object,
};

// Map state to props
const mapStateToProps = createStructuredSelector({
  stage: makeSelectOnboardingStage(),
  userProp: makeSelectUser(),
});

// Connect our Onboarding
export default connect(mapStateToProps)(Onboarding);
