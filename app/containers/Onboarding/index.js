import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// Containers
import AccountCreation from './AccountCreation';

// Redux
import { makeSelectOnboardingStage } from './selectors';

export class Onboarding extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
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
  stage: T.number,
};

// Map state to props
const mapStateToProps = createStructuredSelector({
  stage: makeSelectOnboardingStage(),
});

// Connect our app
export default connect(mapStateToProps)(Onboarding);
