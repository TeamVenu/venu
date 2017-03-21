import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';

// Containers
import AccountCreation from './AccountCreation';
import GeolocationSetup from './GeolocationSetup';
import InterestSelection from './InterestSelection';

// Redux
import { makeSelectOnboardingStage } from './selectors';

export class Onboarding extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  // Occurs after component updated
  componentDidUpdate() {
    const { stage } = this.props;

    if (stage > 2) {
      browserHistory.push({
        pathname: '/',
      });
    }
  }

  render() {
    // TODO: on case 3 start our app

    // Get the stage prop
    const { stage } = this.props;

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
      <div>
        { stageToRender }
      </div>
    );
  }
}

// Set our PropTypes
Onboarding.propTypes = {
  stage: T.any,
};

// Map state to props
const mapStateToProps = createStructuredSelector({
  stage: makeSelectOnboardingStage(),
});

// Connect our Onboarding
export default connect(mapStateToProps)(Onboarding);
